import test from 'node:test';
import assert from 'node:assert/strict';
import { analyze, normalize, profitAt, maxOfferAtTarget } from '../src/assets/js/lib/deal.js';

const base = {
  dealType: 'flip',
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

const near = (a, b, tol = 0.01) => assert.ok(Math.abs(a - b) <= tol, `${a} vs ${b}`);

test('cost lines by hand', () => {
  const r = analyze(base);
  // Loan 260,000 x 85% = 221,000. Interest 221,000 x 11% / 12 x 6 = 12,155.
  near(r.costs.loan, 221000);
  near(r.costs.interest, 12155);
  near(r.costs.buyClosing, 4000);
  near(r.costs.holding, 6000);
  near(r.costs.selling, 27200);
  near(r.costs.total, 309355);
  near(r.profit, 30645);
  near(r.margin, 30645 / 340000, 1e-9);
});

test('70% rule max offer is ARV x 0.70 minus repairs', () => {
  near(analyze(base).max70, 178000);
});

test('max offer at target margin leaves exactly the target profit', () => {
  const r = analyze(base);
  near(r.maxTarget, 180918.6, 0.1);
  const n = normalize(base);
  near(profitAt(n, r.maxTarget), 0.15 * 340000, 1e-6);
});

test('CAUTION when margin is under target but above half of it', () => {
  const r = analyze(base);
  assert.equal(r.verdict, 'CAUTION');
  assert.equal(r.reason.code, 'underTarget');
});

test('GO when margin meets target and price is under the 70% rule', () => {
  const r = analyze({ ...base, purchase: 150000 });
  near(r.profit, 83982.5);
  assert.equal(r.verdict, 'GO');
  assert.equal(r.reason.code, 'meetsTarget');
});

test('NO-GO when the deal loses money', () => {
  const r = analyze({ ...base, purchase: 280000 });
  assert.ok(r.profit < 0);
  assert.equal(r.verdict, 'NO-GO');
  assert.equal(r.reason.code, 'loss');
});

test('NO-GO when margin is under half the target', () => {
  const r = analyze({ ...base, purchase: 215000 });
  assert.ok(r.profit > 0 && r.margin < 0.075, `margin ${r.margin}`);
  assert.equal(r.verdict, 'NO-GO');
  assert.equal(r.reason.code, 'underHalfTarget');
});

test('CAUTION on a flip priced over the 70% rule even with margin at target', () => {
  // Low rehab, so margin clears 15% while the price is over ARV x 70% - rehab.
  const r = analyze({ ...base, purchase: 230000, rehab: 10000, sellingPct: 6, ratePct: 8, holdingPerMonth: 0 });
  near(r.max70, 228000); assert.ok(r.margin >= 0.15, `margin ${r.margin}`);
  assert.equal(r.verdict, 'CAUTION');
  assert.equal(r.reason.code, 'over70');
});

test('new builds skip the 70% rule', () => {
  const r = analyze({ ...base, dealType: 'build', purchase: 230000, rehab: 10000, sellingPct: 6, ratePct: 8, holdingPerMonth: 0 });
  assert.equal(r.verdict, 'GO');
});

test('longer holds cost more interest and holding', () => {
  const n = normalize(base);
  assert.ok(profitAt(n, n.purchase, 14) < profitAt(n, n.purchase, 6));
  const r = analyze(base);
  near(r.worstProfit, profitAt(n, n.purchase, 14));
});

test('CAUTION when the 14 month worst case loses money', () => {
  // Thin deal at 6 months with heavy carrying costs.
  const r = analyze({ ...base, dealType: 'build', purchase: 100000, rehab: 150000, holdingPerMonth: 4000, ratePct: 10, targetMarginPct: 7 });
  near(r.profit, 26175);
  assert.ok(r.margin >= 0.07, `margin ${r.margin}`);
  assert.ok(r.worstProfit <= 0, `worst ${r.worstProfit}`);
  assert.equal(r.verdict, 'CAUTION');
  assert.equal(r.reason.code, 'worstCaseLoss');
});

test('input cleanup: strings with $ and commas, bad values', () => {
  const r = analyze({ ...base, purchase: '$200,000', arv: '340,000' });
  near(r.profit, 30645);
  assert.equal(analyze({ ...base, arv: 0 }).verdict, 'NO-GO');
  near(maxOfferAtTarget(normalize({ ...base, arv: 1000 })), 0);
});
