const head = (L, crumb, h1, lede) => `
<section class="page-head on-dark">
  <div class="wrap">
    ${crumb ? `<p class="crumbs"><a href="tools.html">${L('Free tools', 'Herramientas gratis')}</a></p>` : ''}
    <h1>${h1}</h1>
    <p class="lede">${lede}</p>
  </div>
</section>`;

const noscript = (L) => `<noscript><p class="warn">${L('This tool needs JavaScript turned on in your browser.', 'Esta herramienta necesita JavaScript activado en su navegador.')}</p></noscript>`;

const money = (id, label, value, hint = '') => `
<div class="field">
  <label for="${id}">${label}</label>
  <div class="prefix"><span aria-hidden="true">$</span><input id="${id}" name="${id}" type="text" inputmode="decimal" autocomplete="off" value="${value}"${hint ? ` aria-describedby="${id}-hint"` : ''}></div>
  ${hint ? `<span class="hint" id="${id}-hint">${hint}</span>` : ''}
</div>`;

const pct = (id, label, value, hint = '') => `
<div class="field">
  <label for="${id}">${label}</label>
  <div class="suffix"><input id="${id}" name="${id}" type="text" inputmode="decimal" autocomplete="off" value="${value}"${hint ? ` aria-describedby="${id}-hint"` : ''}><span aria-hidden="true">%</span></div>
  ${hint ? `<span class="hint" id="${id}-hint">${hint}</span>` : ''}
</div>`;

export const toolsIndex = {
  slug: 'tools',
  title: { en: 'Free tools', es: 'Herramientas gratis' },
  description: {
    en: 'Free calculators for builders and investors: flip and build deal calculator, house facing and sun direction, joist and rafter span quick check.',
    es: 'Calculadoras gratis para constructores e inversionistas: negocios de flips y obra nueva, orientación de la casa y el sol, claros de viguetas y vigas de techo.',
  },
  body: ({ L }) => `
${head(L, false, L('Free tools', 'Herramientas gratis'), L('Quick answers for the questions that come up on every lot. They run in your browser. Nothing you type is sent anywhere.', 'Respuestas rápidas para las preguntas de cada lote. Funcionan en su navegador. Nada de lo que escribe se manda a ningún lado.'))}
<section class="section">
  <div class="wrap">
    <div class="tool-links">
      <a href="deal-calculator.html"><h2 class="h3" style="font-size:var(--s2)">${L('Flip and build deal calculator', 'Calculadora de flips y obra nueva')}</h2><p>${L('Purchase, rehab or build cost, ARV, hold time and financing. Get profit, margin, max offer and a GO, CAUTION or NO-GO with the reason.', 'Compra, costo de remodelación u obra, ARV, tiempo y financiamiento. Obtenga ganancia, margen, oferta máxima y un VA, CUIDADO o NO VA con la razón.')}</p></a>
      <a href="house-facing.html"><h2 style="font-size:var(--s2)">${L('Which way does my house face?', '¿Hacia dónde da mi casa?')}</h2><p>${L('Type a bearing, turn a dial or use your phone compass. Get the facing, the backyard direction and a Texas sun note.', 'Escriba los grados, gire el dial o use la brújula del teléfono. Obtenga la orientación, hacia dónde da el patio y una nota del sol en Texas.')}</p></a>
      <a href="span-check.html"><h2 style="font-size:var(--s2)">${L('Joist and rafter span check', 'Claros de viguetas y vigas de techo')}</h2><p>${L('Bending, shear and deflection for 2x lumber at common spacings and loads. Quick reference, not a design.', 'Flexión, cortante y deflexión para madera 2x con separaciones y cargas comunes. Referencia rápida, no un diseño.')}</p></a>
    </div>
  </div>
</section>`,
};

export const dealCalculator = {
  slug: 'deal-calculator',
  nav: 'tools',
  title: { en: 'Flip and build deal calculator', es: 'Calculadora de flips y obra nueva' },
  description: {
    en: 'Free flip and new build deal calculator: profit, margin, max offer by the 70% rule and at your target margin, and a GO, CAUTION or NO-GO with the reason.',
    es: 'Calculadora gratis para flips y obra nueva: ganancia, margen, oferta máxima por la regla del 70% y con su margen meta, y un VA, CUIDADO o NO VA con la razón.',
  },
  scripts: ['tool-deal.js'],
  body: ({ L }) => `
${head(L, true, L('Flip and build deal calculator', 'Calculadora de flips y obra nueva'), L('Put in the numbers you have. The result updates as you type.', 'Ponga los números que tiene. El resultado se actualiza mientras escribe.'))}
<section class="section-tight">
  <div class="wrap">
    ${noscript(L)}
    <div class="tool">
      <form class="panel" id="deal-form" novalidate>
        <h2>${L('The deal', 'El negocio')}</h2>
        <div class="fields">
          <fieldset class="field full">
            <legend>${L('Deal type', 'Tipo de negocio')}</legend>
            <div class="seg">
              <label><input type="radio" name="dealType" value="flip" checked><span>${L('Flip or remodel', 'Flip o remodelación')}</span></label>
              <label><input type="radio" name="dealType" value="build"><span>${L('New build', 'Obra nueva')}</span></label>
            </div>
          </fieldset>
          ${money('purchase', L('Purchase or lot price', 'Precio de compra o del lote'), '200,000')}
          ${money('rehab', L('Rehab or build cost', 'Costo de remodelación u obra'), '60,000')}
          ${money('arv', L('After repair value (ARV)', 'Valor después de reparar (ARV)'), '340,000', L('What it sells for when done.', 'En cuánto se vende ya terminada.'))}
          ${money('holdingPerMonth', L('Holding costs per month', 'Gastos mensuales de mantener'), '1,000', L('Taxes, insurance, utilities.', 'Impuestos, seguro, servicios.'))}
          <fieldset class="field full">
            <legend>${L('Months to sell', 'Meses hasta vender')}</legend>
            <div class="seg">
              ${[6, 9, 12, 14].map((m) => `<label><input type="radio" name="months" value="${m}"${m === 6 ? ' checked' : ''}><span>${m}</span></label>`).join('')}
            </div>
          </fieldset>
          ${pct('ratePct', L('Interest rate, yearly', 'Tasa de interés anual'), '11')}
          ${pct('financedPct', L('Share financed', 'Porcentaje financiado'), '85', L('Of purchase plus rehab or build.', 'De la compra más la obra.'))}
          ${pct('buyClosingPct', L('Closing costs to buy', 'Gastos de cierre al comprar'), '2')}
          ${pct('sellingPct', L('Selling costs', 'Gastos de venta'), '8', L('Commission and closing.', 'Comisión y cierre.'))}
          ${pct('targetMarginPct', L('Target margin', 'Margen meta'), '15', L('Profit as a share of ARV.', 'Ganancia como porcentaje del ARV.'))}
        </div>
      </form>
      <div class="results" aria-live="polite">
        <div class="panel">
          <h2>${L('Result', 'Resultado')}</h2>
          <div class="verdict" id="verdict"><b id="verdict-label">&nbsp;</b><p id="verdict-reason"></p></div>
          <div class="figures">
            <div><span>${L('Profit', 'Ganancia')}</span><b id="out-profit">&nbsp;</b></div>
            <div><span>${L('Margin on ARV', 'Margen sobre ARV')}</span><b id="out-margin">&nbsp;</b></div>
            <div><span>${L('Max offer, 70% rule', 'Oferta máxima, regla del 70%')}</span><b id="out-max70">&nbsp;</b></div>
            <div><span>${L('Max offer at target margin', 'Oferta máxima con margen meta')}</span><b id="out-maxtarget">&nbsp;</b></div>
          </div>
          <table class="breakdown">
            <caption class="visually-hidden">${L('Cost breakdown', 'Desglose de costos')}</caption>
            <tbody>
              <tr><td>${L('Purchase', 'Compra')}</td><td id="b-purchase"></td></tr>
              <tr><td>${L('Rehab or build', 'Remodelación u obra')}</td><td id="b-rehab"></td></tr>
              <tr><td>${L('Closing to buy', 'Cierre de compra')}</td><td id="b-closing"></td></tr>
              <tr><td>${L('Interest', 'Intereses')}</td><td id="b-interest"></td></tr>
              <tr><td>${L('Holding', 'Gastos de mantener')}</td><td id="b-holding"></td></tr>
              <tr><td>${L('Selling', 'Venta')}</td><td id="b-selling"></td></tr>
              <tr class="total"><td>${L('Total cost', 'Costo total')}</td><td id="b-total"></td></tr>
              <tr><td id="b-worst-label">${L('Profit if it runs to 14 months', 'Ganancia si se va a 14 meses')}</td><td id="b-worst"></td></tr>
            </tbody>
          </table>
          <p class="disclaimer">${L('Interest is figured as interest-only on the financed share for the whole hold. The 70% rule is a flip rule of thumb and is not applied to new builds. This is an estimate for screening, not financial advice.', 'El interés se calcula como solo interés sobre la parte financiada durante todo el tiempo. La regla del 70% es una regla práctica para flips y no se aplica a obra nueva. Es un estimado para filtrar negocios, no asesoría financiera.')}</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
};

export const houseFacing = {
  slug: 'house-facing',
  nav: 'tools',
  title: { en: 'Which way does my house face?', es: '¿Hacia dónde da mi casa?' },
  description: {
    en: 'Find which way a house faces with your phone compass, a dial or a bearing. Get the 8-point facing, the backyard direction and a short Texas sun note.',
    es: 'Sepa hacia dónde da una casa con la brújula del teléfono, un dial o los grados. Obtenga la orientación, hacia dónde da el patio y una nota corta del sol en Texas.',
  },
  scripts: ['tool-facing.js'],
  body: ({ L }) => `
${head(L, true, L('Which way does my house face?', '¿Hacia dónde da mi casa?'), L('A house faces the way you look when you stand in the front door and look out to the street.', 'Una casa da hacia donde usted mira cuando se para en la puerta principal y ve hacia la calle.'))}
<section class="section-tight">
  <div class="wrap">
    ${noscript(L)}
    <div class="tool">
      <div class="panel">
        <h2>${L('Set the direction', 'Marque la dirección')}</h2>
        <div class="dial-wrap">
          <svg class="dial" id="dial" viewBox="0 0 320 320" role="slider" tabindex="0" aria-label="${L('Front door facing, in degrees', 'Orientación de la puerta principal, en grados')}" aria-valuemin="0" aria-valuemax="359" aria-valuenow="180" aria-valuetext="180">
            <circle cx="160" cy="160" r="150" fill="#FFFFFF" stroke="#1B1D1F" stroke-width="2"/>
            <g id="dial-ticks"></g>
            <g id="dial-needle">
              <line x1="160" y1="160" x2="160" y2="40" stroke="#1B1D1F" stroke-width="4" stroke-linecap="round"/>
              <polygon points="160,26 150,48 170,48" fill="#F2C21B" stroke="#1B1D1F" stroke-width="2" stroke-linejoin="round"/>
              <line x1="160" y1="160" x2="160" y2="250" stroke="#9AA0A6" stroke-width="3" stroke-dasharray="6 6"/>
            </g>
            <g id="dial-labels" font-family="Inter Tight, Inter, sans-serif" font-weight="800" font-size="20" fill="#1B1D1F" text-anchor="middle" stroke="#FFFFFF" stroke-width="6" stroke-linejoin="round" paint-order="stroke"></g>
            <circle cx="160" cy="160" r="9" fill="#1B1D1F"/>
          </svg>
        </div>
        <p class="small muted" style="text-align:center">${L('Drag the dial, or focus it and use the arrow keys. The yellow arrow is the front door.', 'Arrastre el dial, o selecciónelo y use las flechas del teclado. La flecha amarilla es la puerta principal.')}</p>
        <div class="fields" style="margin-top:18px">
          <div class="field">
            <label for="bearing">${L('Bearing in degrees', 'Grados')}</label>
            <input id="bearing" type="number" min="0" max="359" step="1" inputmode="numeric" value="180" aria-describedby="bearing-hint">
            <span class="hint" id="bearing-hint">${L('0 is north, 90 east, 180 south, 270 west.', '0 es norte, 90 este, 180 sur, 270 oeste.')}</span>
          </div>
          <div class="field">
            <span class="label" style="font-size:.875rem;font-weight:600">${L('Phone compass', 'Brújula del teléfono')}</span>
            <button class="btn btn-secondary" type="button" id="use-compass">${L('Use my phone compass', 'Usar la brújula')}</button>
            <span class="hint">${L('Stand in the doorway, hold the phone flat and point the top of it at the street.', 'Párese en la puerta, sostenga el teléfono plano y apunte la parte de arriba hacia la calle.')}</span>
          </div>
        </div>
        <p class="status" id="compass-status" role="status"></p>
      </div>
      <div class="results" aria-live="polite">
        <div class="panel">
          <h2>${L('Result', 'Resultado')}</h2>
          <div class="facing-out">
            <div><span>${L('House faces', 'La casa da al')}</span><b id="out-front">&nbsp;</b></div>
            <div><span>${L('Backyard faces', 'El patio da al')}</span><b id="out-back">&nbsp;</b></div>
          </div>
          <h3 style="margin-top:22px;font-size:var(--s1)">${L('Sun in Texas', 'El sol en Texas')}</h3>
          <p id="out-note"></p>
          <p class="disclaimer">${L('Texas lies between about 26 and 36 degrees north, so the midday sun is in the southern sky all year. Phone compasses read magnetic north, which is a few degrees off true north in Texas, and can be thrown off by nearby steel or a phone case with magnets.', 'Texas está entre unos 26 y 36 grados norte, así que al mediodía el sol está en el cielo del sur todo el año. La brújula del teléfono marca el norte magnético, que en Texas difiere unos grados del norte verdadero, y se puede desviar cerca de acero o con fundas con imanes.')}</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
};

export const spanCheck = {
  slug: 'span-check',
  nav: 'tools',
  title: { en: 'Joist and rafter span quick check', es: 'Revisión rápida de claros de viguetas y vigas de techo' },
  description: {
    en: 'Quick reference span check for floor joists and rafters: bending, shear and deflection from first principles. Not a design. A Texas licensed PE must design the structure.',
    es: 'Revisión rápida de claros para viguetas de piso y vigas de techo: flexión, cortante y deflexión. No es un diseño. Un ingeniero con licencia en Texas debe diseñar la estructura.',
  },
  scripts: ['tool-span.js'],
  body: ({ L }) => `
${head(L, true, L('Joist and rafter span quick check', 'Claros de viguetas y vigas de techo'), L('Pick the lumber, spacing and load. See the longest simple span and which check governs.', 'Escoja la madera, la separación y la carga. Vea el claro simple más largo y cuál revisión manda.'))}
<section class="section-tight">
  <div class="wrap">
    <p class="warn" role="note">${L('Quick reference, not a design. A Texas licensed PE must design the structure.', 'Referencia rápida, no un diseño. Un ingeniero profesional con licencia en Texas debe diseñar la estructura.')}</p>
    ${noscript(L)}
    <div class="tool">
      <form class="panel" id="span-form" novalidate>
        <h2>${L('Member and load', 'Pieza y carga')}</h2>
        <div class="fields">
          <div class="field full">
            <label for="species">${L('Species and grade', 'Especie y grado')}</label>
            <select id="species" name="species">
              <option value="sp-2" selected>${L('Southern Pine No. 2', 'Pino del sur No. 2')}</option>
              <option value="dfl-1">Douglas Fir-Larch No. 1</option>
              <option value="dfl-2">Douglas Fir-Larch No. 2</option>
            </select>
          </div>
          <div class="field">
            <label for="size">${L('Size', 'Medida')}</label>
            <select id="size" name="size">
              <option value="2x6">2x6</option>
              <option value="2x8" selected>2x8</option>
              <option value="2x10">2x10</option>
              <option value="2x12">2x12</option>
            </select>
          </div>
          <div class="field">
            <label for="span">${L('Your span (optional)', 'Su claro (opcional)')}</label>
            <input id="span" name="span" type="text" inputmode="decimal" placeholder="13'-0&quot;" aria-describedby="span-hint">
            <span class="hint" id="span-hint">${L('Feet and inches, like 13\'-6". Rafters: horizontal span.', 'Pies y pulgadas, como 13\'-6". Vigas de techo: claro horizontal.')}</span>
          </div>
          <fieldset class="field full">
            <legend>${L('Spacing, on center', 'Separación, a centros')}</legend>
            <div class="seg">
              ${[12, 16, 19.2, 24].map((s) => `<label><input type="radio" name="spacing" value="${s}"${s === 16 ? ' checked' : ''}><span>${s} in</span></label>`).join('')}
            </div>
          </fieldset>
          <div class="field full">
            <label for="preset">${L('Load', 'Carga')}</label>
            <select id="preset" name="preset">
              <optgroup label="${L('Floor joists, deflection L/360', 'Viguetas de piso, deflexión L/360')}">
                <option value="floor-40" selected>${L('Living areas: 40 psf live, 10 psf dead', 'Áreas de estar: 40 psf viva, 10 psf muerta')}</option>
                <option value="floor-30">${L('Sleeping rooms: 30 psf live, 10 psf dead', 'Recámaras: 30 psf viva, 10 psf muerta')}</option>
                <option value="floor-40-tile">${L('Tile or heavy finish: 40 psf live, 20 psf dead', 'Loseta o acabado pesado: 40 psf viva, 20 psf muerta')}</option>
              </optgroup>
              <optgroup label="${L('Rafters, deflection L/240', 'Vigas de techo, deflexión L/240')}">
                <option value="roof-20-10">${L('Roof: 20 psf live, 10 psf dead', 'Techo: 20 psf viva, 10 psf muerta')}</option>
                <option value="roof-20-15">${L('Heavier roofing: 20 psf live, 15 psf dead', 'Techo más pesado: 20 psf viva, 15 psf muerta')}</option>
              </optgroup>
            </select>
          </div>
        </div>
      </form>
      <div class="results" aria-live="polite">
        <div class="panel">
          <h2>${L('Longest simple span', 'Claro simple más largo')}</h2>
          <p class="bigspan" id="out-span">&nbsp;</p>
          <p id="out-governs" class="muted"></p>
          <p id="out-check" style="font-weight:600"></p>
          <table class="checks">
            <caption class="visually-hidden">${L('Span by check', 'Claro por revisión')}</caption>
            <thead><tr><th scope="col">${L('Check', 'Revisión')}</th><th scope="col">${L('Max span', 'Claro máximo')}</th><th scope="col" id="th-ratio">${L('Your span', 'Su claro')}</th></tr></thead>
            <tbody id="checks-body"></tbody>
          </table>
          <h3 style="margin-top:22px;font-size:var(--s1)">${L('Values used', 'Valores usados')}</h3>
          <p class="small muted" id="out-values"></p>
          <p class="disclaimer">${L('Simply supported, uniform load, repetitive member factor 1.15, dry service, normal temperature. Deflection uses live load only. Rafter spans are horizontal projection with no ceiling attached. Design values are from the NDS Supplement (Southern Pine Table 4B, 2013 and later values; Douglas Fir-Larch Table 4A with size factor). Does not check bearing, notches, holes, point loads, snow drift, wind uplift or lateral support.', 'Apoyo simple, carga uniforme, factor de piezas repetidas 1.15, uso en seco, temperatura normal. La deflexión usa solo carga viva. Los claros de vigas de techo son en proyección horizontal sin plafón colgado. Los valores de diseño son del Suplemento NDS (Pino del sur Tabla 4B, valores de 2013 en adelante; Douglas Fir-Larch Tabla 4A con factor de tamaño). No revisa apoyo, muescas, perforaciones, cargas puntuales, acumulación de nieve, levantamiento por viento ni soporte lateral.')}</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
};
