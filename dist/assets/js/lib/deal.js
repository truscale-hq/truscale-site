// Flip and build deal math. Pure functions, no DOM. Used by the Deal
// Calculator page and by the unit tests.
//
// Model: interest-only financing on a share of purchase plus rehab or build
// cost, simple monthly interest for the hold, purchase closing costs as a share
// of purchase price, selling costs as a share of ARV.

export const HOLD_MONTHS = [6, 9, 12, 14];
export const WORST_CASE_MONTHS = 14;

export const DEFAULTS = {
  dealType: 'flip', // 'flip' or 'build'
  purchase: 200000,
  rehab: 60000,
  arv: 340000,
  months: 6,
  ratePct: 11,
  financedPct: 85,
  buyClosingPct: 2,
  sellingPct: 8,
  holdingPerMonth: 1000,
  targetMarginPct: 15,
};

function num(v, fallback = 0) {
  const n = typeof v === 'string' ? parseFloat(v.replace(/[$,\s]/g, '')) : Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export function normalize(input) {
  const d = { ...DEFAULTS, ...input };
  return {
    dealType: d.dealType === 'build' ? 'build' : 'flip',
    purchase: Math.max(0, num(d.purchase)),
    rehab: Math.max(0, num(d.rehab)),
    arv: Math.max(0, num(d.arv)),
    months: Math.max(0, num(d.months, 6)),
    rate: Math.max(0, num(d.ratePct)) / 100,
    financed: Math.min(100, Math.max(0, num(d.financedPct))) / 100,
    buyClosing: Math.max(0, num(d.buyClosingPct)) / 100,
    selling: Math.max(0, num(d.sellingPct)) / 100,
    holdingPerMonth: Math.max(0, num(d.holdingPerMonth)),
    target: Math.max(0, num(d.targetMarginPct)) / 100,
  };
}

// Cost lines for a given purchase price and hold length.
export function costs(n, purchase = n.purchase, months = n.months) {
  const loan = (purchase + n.rehab) * n.financed;
  const interest = loan * (n.rate / 12) * months;
  const buyClosing = purchase * n.buyClosing;
  const holding = n.holdingPerMonth * months;
  const selling = n.arv * n.selling;
  const total = purchase + n.rehab + buyClosing + interest + holding + selling;
  return { loan, interest, buyClosing, holding, selling, total };
}

export function profitAt(n, purchase = n.purchase, months = n.months) {
  return n.arv - costs(n, purchase, months).total;
}

// Purchase price that leaves exactly target margin (profit / ARV).
// Profit is linear in purchase price, so this solves directly.
export function maxOfferAtTarget(n, months = n.months) {
  const k = n.arv * (1 - n.selling) - n.rehab - n.rehab * n.financed * (n.rate / 12) * months - n.holdingPerMonth * months;
  const perDollar = 1 + n.buyClosing + n.financed * (n.rate / 12) * months;
  return Math.max(0, (k - n.target * n.arv) / perDollar);
}

// The 70% rule of thumb: ARV x 70% minus repairs.
export function maxOffer70(n) {
  return Math.max(0, n.arv * 0.7 - n.rehab);
}

export function analyze(input) {
  const n = normalize(input);
  const c = costs(n);
  const profit = n.arv - c.total;
  const margin = n.arv > 0 ? profit / n.arv : 0;
  const worstProfit = profitAt(n, n.purchase, WORST_CASE_MONTHS);
  const max70 = maxOffer70(n);
  const maxTarget = maxOfferAtTarget(n);

  let verdict;
  let reason;
  if (n.arv <= 0) {
    verdict = 'NO-GO';
    reason = { code: 'noArv' };
  } else if (profit <= 0) {
    verdict = 'NO-GO';
    reason = { code: 'loss', loss: -profit };
  } else if (margin < n.target / 2) {
    verdict = 'NO-GO';
    reason = { code: 'underHalfTarget', margin, target: n.target };
  } else if (margin < n.target) {
    verdict = 'CAUTION';
    reason = { code: 'underTarget', margin, target: n.target, maxTarget };
  } else if (n.dealType === 'flip' && n.purchase > max70) {
    verdict = 'CAUTION';
    reason = { code: 'over70', max70 };
  } else if (n.months < WORST_CASE_MONTHS && worstProfit <= 0) {
    verdict = 'CAUTION';
    reason = { code: 'worstCaseLoss', months: n.months, worstProfit };
  } else {
    verdict = 'GO';
    reason = { code: 'meetsTarget', target: n.target, profit };
  }

  return {
    inputs: n,
    costs: c,
    profit,
    margin,
    max70,
    maxTarget,
    worstMonths: WORST_CASE_MONTHS,
    worstProfit,
    verdict,
    reason,
  };
}
