const pageHead = (h1, lede) => `
<section class="page-head on-dark">
  <div class="wrap">
    <h1>${h1}</h1>
    ${lede ? `<p class="lede">${lede}</p>` : ''}
  </div>
</section>`;

export const pricing = {
  slug: 'pricing',
  title: { en: 'Pricing', es: 'Precios' },
  description: {
    en: 'Founding member beta: free during the private beta, a locked low price for life for beta members, and one free month for every paying referral. Plans announced at launch.',
    es: 'Beta para miembros fundadores: gratis durante la beta privada, precio bajo fijo de por vida para miembros de la beta y un mes gratis por cada recomendado que pague. Planes al lanzamiento.',
  },
  body: ({ L, B }) => `
${pageHead(L('Pricing', 'Precios'), L('Plans are announced at launch. Until then, founding members use it free.', 'Los planes se anuncian al lanzamiento. Mientras tanto, los miembros fundadores lo usan gratis.'))}
<section class="section">
  <div class="wrap split">
    <div class="price-card">
      <div class="top on-dark">
        <h2>${L('Founding member beta', 'Beta para miembros fundadores')}</h2>
        <p class="amount">${L('Free', 'Gratis')}</p>
        <p style="color:var(--on-dark-2);margin:0">${L('During the private beta', 'Durante la beta privada')}</p>
      </div>
      <div class="body">
        <ul class="ticks" style="margin-top:0">
          <li><strong>${L('Free during the beta.', 'Gratis durante la beta.')}</strong> ${L('About 60 to 90 days.', 'Unos 60 a 90 días.')}</li>
          <li><strong>${L('A locked low price for life.', 'Un precio bajo fijo de por vida.')}</strong> ${L('Beta members keep a founding price.', 'Los miembros de la beta conservan un precio de fundador.')}</li>
          <li><strong>${L('One free month per paying referral.', 'Un mes gratis por cada recomendado que pague.')}</strong> ${L('Refer another builder; when they become a paying customer, you get a month free.', 'Recomiende a otro constructor; cuando se vuelva cliente de pago, usted recibe un mes gratis.')}</li>
        </ul>
        <div class="btn-row"><a class="btn btn-primary" href="beta.html">${L('Apply for the beta', 'Solicitar la beta')}</a></div>
      </div>
    </div>
    <div>
      <h2>${L('Plans announced at launch', 'Planes al lanzamiento')}</h2>
      <p class="lede">${L(`${B} plans and prices will be published at launch. Founding members keep a lower price for life.`, `Los planes y precios de ${B} se publican al lanzamiento. Los miembros fundadores conservan un precio más bajo de por vida.`)}</p>
      <div class="faq">
        <details>
          <summary>${L('What does the beta cost?', '¿Cuánto cuesta la beta?')}</summary>
          <p>${L('Nothing. The app is free for founding members during the private beta.', 'Nada. La app es gratis para los miembros fundadores durante la beta privada.')}</p>
        </details>
        <details>
          <summary>${L('What price will I pay after the beta?', '¿Qué precio pagaré después de la beta?')}</summary>
          <p>${L('Beta members lock in a low founding price for life. The amount is announced with the plans at launch.', 'Los miembros de la beta fijan un precio bajo de fundador de por vida. El monto se anuncia con los planes al lanzamiento.')}</p>
        </details>
        <details>
          <summary>${L('How do referral months work?', '¿Cómo funcionan los meses por recomendados?')}</summary>
          <p>${L('For every builder you refer who becomes a paying customer, you get one month free.', 'Por cada constructor que recomiende y se vuelva cliente de pago, usted recibe un mes gratis.')}</p>
        </details>
      </div>
    </div>
  </div>
</section>`,
};

const ROLES = (L) => [
  ['builder', L('Home builder', 'Constructor de casas')],
  ['remodeler', L('Remodeler', 'Remodelador')],
  ['investor', L('Flipper or investor', 'Inversionista o flipper')],
  ['developer', L('Developer', 'Desarrollador')],
  ['other', L('Other', 'Otro')],
];

export const beta = {
  slug: 'beta',
  title: { en: 'Apply for the private beta', es: 'Solicitar la beta privada' },
  description: {
    en: 'Apply for the founding member private beta: invite-only, 10 to 15 users in Dallas-Fort Worth, about 60 to 90 days, free during the beta.',
    es: 'Solicite la beta privada para miembros fundadores: solo por invitación, 10 a 15 usuarios en Dallas-Fort Worth, unos 60 a 90 días, gratis durante la beta.',
  },
  body: ({ L, config }) => `
${pageHead(L('Apply for the private beta', 'Solicite la beta privada'), L('Tell us about your work. We review every application and reply by email.', 'Cuéntenos de su trabajo. Revisamos cada solicitud y contestamos por correo.'))}
<section class="section">
  <div class="wrap split">
    <div>
      <h2>${L('How the beta works', 'Cómo funciona la beta')}</h2>
      <ul class="facts" style="border-top-color:var(--line)">
        <li style="color:var(--ink-2);border-bottom-color:var(--line)">${L('Access', 'Acceso')}<b style="color:var(--ink)">${L('Invite only', 'Solo por invitación')}</b></li>
        <li style="color:var(--ink-2);border-bottom-color:var(--line)">${L('Group size', 'Tamaño del grupo')}<b style="color:var(--ink)">${L('10 to 15 users in DFW', '10 a 15 usuarios en DFW')}</b></li>
        <li style="color:var(--ink-2);border-bottom-color:var(--line)">${L('Length', 'Duración')}<b style="color:var(--ink)">${L('About 60 to 90 days', 'Unos 60 a 90 días')}</b></li>
        <li style="color:var(--ink-2);border-bottom-color:var(--line)">${L('Cost', 'Costo')}<b style="color:var(--ink)">${L('Free during the beta', 'Gratis durante la beta')}</b></li>
        <li style="color:var(--ink-2);border-bottom-color:var(--line)">${L('Paperwork', 'Papeleo')}<b style="color:var(--ink)">${L('A short beta agreement', 'Un acuerdo corto de beta')}</b></li>
      </ul>
      <p style="margin-top:22px">${L('The group is small on purpose. You bring a real project, use the app on it, and tell us what works and what does not. In return you use it free during the beta and keep a founding price for life.', 'El grupo es chico a propósito. Usted trae un proyecto real, usa la app en él y nos dice qué funciona y qué no. A cambio la usa gratis durante la beta y conserva un precio de fundador de por vida.')}</p>
      <p class="privacy-line"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1l6 2.5v4c0 3.6-2.6 6.4-6 7.5-3.4-1.1-6-3.9-6-7.5v-4L8 1z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>${L('We never share or sell your information.', 'Nunca compartimos ni vendemos su información.')}</p>
    </div>
    <div>
      <form class="panel" id="beta-form" data-form="beta" data-endpoint="${config.betaEndpoint || ''}" data-done="beta-done" data-error-text="${L('We could not send your application. Check your connection and try again.', 'No pudimos mandar su solicitud. Revise su conexión e intente otra vez.')}">
        <h2>${L('Your application', 'Su solicitud')}</h2>
        <div class="form-grid">
          <div class="field"><label for="b-name">${L('Name', 'Nombre')} <span class="req" aria-hidden="true">*</span></label><input id="b-name" name="name" type="text" autocomplete="name" required></div>
          <div class="field"><label for="b-company">${L('Company', 'Empresa')} <span class="req" aria-hidden="true">*</span></label><input id="b-company" name="company" type="text" autocomplete="organization" required></div>
          <div class="field"><label for="b-role">${L('Role', 'Giro')} <span class="req" aria-hidden="true">*</span></label>
            <select id="b-role" name="role" required>
              <option value="">${L('Choose one', 'Escoja uno')}</option>
              ${ROLES(L).map(([v, t]) => `<option value="${v}">${t}</option>`).join('')}
            </select></div>
          <div class="field"><label for="b-city">${L('City', 'Ciudad')} <span class="req" aria-hidden="true">*</span></label><input id="b-city" name="city" type="text" autocomplete="address-level2" required></div>
          <div class="field"><label for="b-email">${L('Email', 'Correo electrónico')} <span class="req" aria-hidden="true">*</span></label><input id="b-email" name="email" type="email" autocomplete="email" required></div>
          <div class="field"><label for="b-phone">${L('Phone (optional)', 'Teléfono (opcional)')}</label><input id="b-phone" name="phone" type="tel" autocomplete="tel"></div>
          <div class="field full"><label for="b-volume">${L('Homes or projects per year', 'Casas o proyectos por año')} <span class="req" aria-hidden="true">*</span></label>
            <select id="b-volume" name="volume" required>
              <option value="">${L('Choose one', 'Escoja uno')}</option>
              <option value="1-5">1 ${L('to', 'a')} 5</option>
              <option value="6-20">6 ${L('to', 'a')} 20</option>
              <option value="21-50">21 ${L('to', 'a')} 50</option>
              <option value="51+">${L('More than 50', 'Más de 50')}</option>
            </select></div>
          <div class="field full"><label for="b-first">${L('What do you want to use first?', '¿Qué quiere usar primero?')} <span class="req" aria-hidden="true">*</span></label>
            <textarea id="b-first" name="firstUse" required placeholder="${L('For example: takeoffs from plan sets, or running numbers on flips', 'Por ejemplo: cuantificación desde planos, o hacer números de flips')}"></textarea></div>
          <div class="hp" aria-hidden="true"><label for="b-website">Website</label><input id="b-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
          <div class="full">
            <p class="small muted" style="margin:0 0 14px">${L('Fields marked * are required. We use this only to review your application and contact you about the beta.', 'Los campos con * son obligatorios. Solo usamos esto para revisar su solicitud y contactarlo sobre la beta.')}</p>
            <button class="btn btn-primary" type="submit">${L('Send application', 'Mandar solicitud')}</button>
            <p class="form-error" role="alert"></p>
          </div>
        </div>
      </form>
      <div class="form-done" id="beta-done" hidden>
        <h2>${L('Application sent', 'Solicitud enviada')}</h2>
        <p>${L('Thanks. We review every application and reply by email.', 'Gracias. Revisamos cada solicitud y contestamos por correo.')}</p>
        <p style="margin:0"><a href="tools.html">${L('Try the free tools while you wait', 'Pruebe las herramientas gratis mientras tanto')}</a></p>
      </div>
    </div>
  </div>
</section>`,
};

export const about = {
  slug: 'about',
  title: { en: 'About', es: 'Nosotros' },
  description: {
    en: 'Construction software built in Dallas-Fort Worth by people who work on new homes every week.',
    es: 'Software de construcción hecho en Dallas-Fort Worth por gente que trabaja en casas nuevas cada semana.',
  },
  body: ({ L, B }) => `
${pageHead(L('Built by people who work on new homes every week.', 'Hecho por gente que trabaja en casas nuevas cada semana.'))}
<section class="section">
  <div class="wrap split">
    <div>
      <h2>${L('Where it comes from', 'De dónde viene')}</h2>
    </div>
    <div class="prose">
      <p class="lede" style="color:var(--ink)">${L(`${B} started inside a Dallas-Fort Worth construction trade business that works on new homes for builders every week. We kept seeing the same problems on every lot: takeoffs counted by hand, measurements that did not match the plans, purchase orders released before the permit, and deals that only worked if nothing ran late.`, `${B} nació dentro de una empresa de oficios de la construcción en Dallas-Fort Worth que trabaja en casas nuevas para constructores cada semana. Veíamos los mismos problemas en cada lote: cuantificaciones contadas a mano, medidas que no cuadraban con los planos, órdenes de compra liberadas antes del permiso y negocios que solo funcionaban si nada se atrasaba.`)}</p>
      <p>${L('So we built the tool we wanted: one record per project that starts at the plan set and ends at closeout, with the checks a careful project manager would make built in.', 'Así que hicimos la herramienta que queríamos: un expediente por proyecto que empieza en el juego de planos y termina en el cierre, con las revisiones que haría un gerente de proyecto cuidadoso ya incluidas.')}</p>
      <h2>${L('How we work', 'Cómo trabajamos')}</h2>
      <ul>
        <li>${L('Software suggests, people decide. AI reads the plans; an estimator verifies the numbers.', 'El software sugiere, la gente decide. La IA lee los planos; un estimador verifica los números.')}</li>
        <li>${L('Structural results are preliminary. A Texas licensed PE designs and seals the structure.', 'Los resultados estructurales son preliminares. Un ingeniero con licencia en Texas diseña y sella la estructura.')}</li>
        <li>${L('English and Spanish are equal. The crew and the office see the same job in their own language.', 'Inglés y español valen lo mismo. La cuadrilla y la oficina ven la misma obra en su idioma.')}</li>
        <li>${L('We never share or sell your information.', 'Nunca compartimos ni vendemos su información.')}</li>
      </ul>
      <h2>${L('Where we are', 'Dónde estamos')}</h2>
      <p>${L('Dallas-Fort Worth, Texas. We are starting with a private beta for builders, remodelers, investors and developers in North Texas.', 'Dallas-Fort Worth, Texas. Empezamos con una beta privada para constructores, remodeladores, inversionistas y desarrolladores del norte de Texas.')}</p>
      <div class="btn-row"><a class="btn btn-primary" href="beta.html">${L('Apply for the beta', 'Solicitar la beta')}</a><a class="btn btn-secondary" href="contact.html">${L('Contact us', 'Contáctenos')}</a></div>
    </div>
  </div>
</section>`,
};

export const contact = {
  slug: 'contact',
  title: { en: 'Contact', es: 'Contacto' },
  description: { en: 'Questions about the product or the private beta.', es: 'Preguntas sobre el producto o la beta privada.' },
  body: ({ L, config, esc }) => `
${pageHead(L('Contact', 'Contacto'), L('Questions about the product or the beta. We answer in English or Spanish.', 'Preguntas sobre el producto o la beta. Contestamos en inglés o en español.'))}
<section class="section">
  <div class="wrap split">
    <div>
      <h2>${L('Reach us', 'Comuníquese')}</h2>
      ${config.contactEmail ? `<p><a href="mailto:${esc(config.contactEmail)}">${esc(config.contactEmail)}</a></p>` : ''}
      ${config.contactPhone ? `<p><a href="tel:${esc(config.contactPhone.replace(/[^+\d]/g, ''))}">${esc(config.contactPhone)}</a></p>` : ''}
      <p>${L('Dallas-Fort Worth, Texas', 'Dallas-Fort Worth, Texas')}</p>
      <p class="muted">${L('Want to join the private beta? Use the <a href="beta.html">beta application</a> instead, so we have what we need to review it.', '¿Quiere entrar a la beta privada? Use mejor la <a href="beta.html">solicitud de la beta</a>, así tenemos lo necesario para revisarla.')}</p>
      <p class="privacy-line">${L('We never share or sell your information.', 'Nunca compartimos ni vendemos su información.')}</p>
    </div>
    <div>
      <form class="panel" id="contact-form" data-form="contact" data-endpoint="${config.contactEndpoint || ''}" data-done="contact-done" data-error-text="${L('We could not send your message. Check your connection and try again.', 'No pudimos mandar su mensaje. Revise su conexión e intente otra vez.')}">
        <div class="form-grid">
          <div class="field"><label for="c-name">${L('Name', 'Nombre')} <span class="req" aria-hidden="true">*</span></label><input id="c-name" name="name" type="text" autocomplete="name" required></div>
          <div class="field"><label for="c-email">${L('Email', 'Correo electrónico')} <span class="req" aria-hidden="true">*</span></label><input id="c-email" name="email" type="email" autocomplete="email" required></div>
          <div class="field full"><label for="c-msg">${L('Message', 'Mensaje')} <span class="req" aria-hidden="true">*</span></label><textarea id="c-msg" name="message" required></textarea></div>
          <div class="hp" aria-hidden="true"><label for="c-website">Website</label><input id="c-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
          <div class="full"><button class="btn btn-primary" type="submit">${L('Send message', 'Mandar mensaje')}</button><p class="form-error" role="alert"></p></div>
        </div>
      </form>
      <div class="form-done" id="contact-done" hidden>
        <h2>${L('Message sent', 'Mensaje enviado')}</h2>
        <p style="margin:0">${L('Thanks. We will reply by email.', 'Gracias. Le contestamos por correo.')}</p>
      </div>
    </div>
  </div>
</section>`,
};

const legal = (slug, en, es, sectionsEn, sectionsEs) => ({
  slug,
  title: { en, es },
  noindex: true,
  description: { en: `${en}. Draft, attorney review required.`, es: `${es}. Borrador, requiere revisión de un abogado.` },
  body: ({ L, B }) => `
${pageHead(L(en, es))}
<section class="section">
  <div class="wrap">
    <p class="legal-draft" role="note">${L('Draft, attorney review required. This page is a placeholder and is not in effect.', 'Borrador, requiere revisión de un abogado. Esta página es provisional y no está vigente.')}</p>
    <div class="prose">
      ${(L(sectionsEn, sectionsEs))(B)}
    </div>
  </div>
</section>`,
});

export const privacy = legal(
  'privacy',
  'Privacy policy',
  'Política de privacidad',
  (B) => `
<p>${B} respects your privacy. This draft outlines the topics the final policy will cover.</p>
<h2>What we collect</h2>
<ul><li>Information you send in the beta application or contact form: name, company, role, city, email, optional phone, project volume and what you want to use first.</li><li>Project data you put into the app during the beta.</li></ul>
<h2>How we use it</h2>
<ul><li>To review beta applications and contact you about the beta.</li><li>To run and improve the product.</li></ul>
<h2>What we do not do</h2>
<ul><li>We never share or sell your information.</li></ul>
<h2>Free tools</h2>
<p>The free calculators run in your browser. What you type in them is not sent to us.</p>
<h2>Still to be written</h2>
<ul><li>Service providers, data retention, security, your rights, Texas and other state requirements, children, changes to this policy, contact details.</li></ul>`,
  (B) => `
<p>${B} respeta su privacidad. Este borrador resume los temas que cubrirá la política final.</p>
<h2>Qué recopilamos</h2>
<ul><li>La información que manda en la solicitud de la beta o el formulario de contacto: nombre, empresa, giro, ciudad, correo, teléfono opcional, volumen de proyectos y qué quiere usar primero.</li><li>Los datos de proyectos que captura en la app durante la beta.</li></ul>
<h2>Cómo la usamos</h2>
<ul><li>Para revisar solicitudes de la beta y contactarlo sobre la beta.</li><li>Para operar y mejorar el producto.</li></ul>
<h2>Lo que no hacemos</h2>
<ul><li>Nunca compartimos ni vendemos su información.</li></ul>
<h2>Herramientas gratis</h2>
<p>Las calculadoras gratis funcionan en su navegador. Lo que escribe en ellas no se nos manda.</p>
<h2>Pendiente de redactar</h2>
<ul><li>Proveedores de servicios, conservación de datos, seguridad, sus derechos, requisitos de Texas y otros estados, menores, cambios a esta política, datos de contacto.</li></ul>`,
);

export const terms = legal(
  'terms',
  'Terms of use',
  'Términos de uso',
  (B) => `
<p>This draft outlines the topics the final terms for ${B} will cover.</p>
<h2>Free tools</h2>
<ul><li>The calculators give estimates for screening and quick reference only. They are not financial, legal or engineering advice.</li><li>The span check is not a design. A Texas licensed professional engineer must design and seal any structure.</li></ul>
<h2>Private beta</h2>
<ul><li>Beta access is by invitation and is covered by a separate beta agreement.</li><li>Beta software may change and may have errors. Verify results before you rely on them.</li></ul>
<h2>Still to be written</h2>
<ul><li>Accounts, acceptable use, your content, our content, fees after launch, warranties, limitation of liability, governing law (Texas), changes, contact details.</li></ul>`,
  (B) => `
<p>Este borrador resume los temas que cubrirán los términos finales de ${B}.</p>
<h2>Herramientas gratis</h2>
<ul><li>Las calculadoras dan estimados solo para filtrar y como referencia rápida. No son asesoría financiera, legal ni de ingeniería.</li><li>La revisión de claros no es un diseño. Un ingeniero profesional con licencia en Texas debe diseñar y sellar cualquier estructura.</li></ul>
<h2>Beta privada</h2>
<ul><li>El acceso a la beta es por invitación y se rige por un acuerdo de beta aparte.</li><li>El software en beta puede cambiar y tener errores. Verifique los resultados antes de usarlos.</li></ul>
<h2>Pendiente de redactar</h2>
<ul><li>Cuentas, uso aceptable, su contenido, nuestro contenido, tarifas después del lanzamiento, garantías, limitación de responsabilidad, ley aplicable (Texas), cambios, datos de contacto.</li></ul>`,
);

export const notFound = {
  slug: '404',
  noindex: true,
  title: { en: 'Page not found', es: 'Página no encontrada' },
  description: { en: 'Page not found.', es: 'Página no encontrada.' },
  body: ({ L }) => `
${pageHead(L('That page is not here.', 'Esa página no está aquí.'), L('Check the address, or go to one of these.', 'Revise la dirección, o vaya a una de estas.'))}
<section class="section">
  <div class="wrap">
    <div class="btn-row" style="margin-top:0"><a class="btn btn-primary" href="index.html">${L('Home', 'Inicio')}</a><a class="btn btn-secondary" href="features.html">${L('Features', 'Funciones')}</a><a class="btn btn-secondary" href="tools.html">${L('Free tools', 'Herramientas gratis')}</a></div>
  </div>
</section>`,
};
