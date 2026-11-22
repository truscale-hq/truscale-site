import { analyze } from './lib/deal.js';

const lang = document.documentElement.lang === 'es' ? 'es' : 'en';
const locale = lang === 'es' ? 'es-US' : 'en-US';
const usd = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const pct = new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 });

const T = {
  en: {
    GO: 'GO',
    CAUTION: 'CAUTION',
    'NO-GO': 'NO-GO',
    noArv: () => 'Enter the after repair value to run the deal.',
    loss: (r) => `Loses ${usd.format(r.loss)} at this price.`,
    underHalfTarget: (r) => `Margin of ${pct.format(r.margin)} is less than half your ${pct.format(r.target)} target.`,
    underTarget: (r) => `Margin of ${pct.format(r.margin)} is under your ${pct.format(r.target)} target. To hit it, pay no more than ${usd.format(r.maxTarget)}.`,
    over70: (r) => `Margin meets your target, but the price is over the 70% rule max offer of ${usd.format(r.max70)}.`,
    worstCaseLoss: (r) => `Works at ${r.months} months, but loses ${usd.format(-r.worstProfit)} if the job runs to 14 months.`,
    meetsTarget: (r) => `Meets your ${pct.format(r.target)} margin target with ${usd.format(r.profit)} profit.`,
    na: 'Not used for new builds',
  },
  es: {
    GO: 'VA',
    CAUTION: 'CUIDADO',
    'NO-GO': 'NO VA',
    noArv: () => 'Escriba el valor después de reparar para calcular el negocio.',
    loss: (r) => `Pierde ${usd.format(r.loss)} a este precio.`,
    underHalfTarget: (r) => `El margen de ${pct.format(r.margin)} es menos de la mitad de su meta de ${pct.format(r.target)}.`,
    underTarget: (r) => `El margen de ${pct.format(r.margin)} está abajo de su meta de ${pct.format(r.target)}. Para llegar, no pague más de ${usd.format(r.maxTarget)}.`,
    over70: (r) => `El margen cumple su meta, pero el precio pasa la oferta máxima de la regla del 70%, que es ${usd.format(r.max70)}.`,
    worstCaseLoss: (r) => `Funciona a ${r.months} meses, pero pierde ${usd.format(-r.worstProfit)} si la obra se va a 14 meses.`,
    meetsTarget: (r) => `Cumple su meta de margen de ${pct.format(r.target)} con ${usd.format(r.profit)} de ganancia.`,
    na: 'No aplica en obra nueva',
  },
}[lang];

const form = document.getElementById('deal-form');
const $ = (id) => document.getElementById(id);

function read() {
  const fd = new FormData(form);
  const o = {};
  for (const [k, v] of fd.entries()) o[k] = v;
  return o;
}

function render() {
  const r = analyze(read());
  const v = $('verdict');
  v.className = 'verdict ' + { GO: 'go', CAUTION: 'caution', 'NO-GO': 'nogo' }[r.verdict];
  $('verdict-label').textContent = T[r.verdict];
  $('verdict-reason').textContent = T[r.reason.code](r.reason);
  $('out-profit').textContent = usd.format(r.profit);
  $('out-margin').textContent = pct.format(r.margin);
  $('out-max70').textContent = r.inputs.dealType === 'flip' ? usd.format(r.max70) : T.na;
  $('out-max70').style.fontSize = r.inputs.dealType === 'flip' ? '' : '1rem';
  $('out-maxtarget').textContent = usd.format(r.maxTarget);
  $('b-purchase').textContent = usd.format(r.inputs.purchase);
  $('b-rehab').textContent = usd.format(r.inputs.rehab);
  $('b-closing').textContent = usd.format(r.costs.buyClosing);
  $('b-interest').textContent = usd.format(r.costs.interest);
  $('b-holding').textContent = usd.format(r.costs.holding);
  $('b-selling').textContent = usd.format(r.costs.selling);
  $('b-total').textContent = usd.format(r.costs.total);
  $('b-worst').textContent = usd.format(r.worstProfit);
}

// Format money fields with thousands separators when the user leaves them.
for (const el of form.querySelectorAll('.prefix input')) {
  el.addEventListener('blur', () => {
    const n = parseFloat(el.value.replace(/[$,\s]/g, ''));
    if (Number.isFinite(n)) el.value = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n);
  });
}
form.addEventListener('input', render);
form.addEventListener('change', render);
form.addEventListener('submit', (e) => e.preventDefault());
render();
