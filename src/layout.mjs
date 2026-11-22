// Page shell: head, header, footer. Every string has English and Spanish.

export const NAV = [
  { slug: 'features', en: 'Features', es: 'Funciones' },
  { slug: 'tools', en: 'Free tools', es: 'Herramientas gratis' },
  { slug: 'pricing', en: 'Pricing', es: 'Precios' },
  { slug: 'about', en: 'About', es: 'Nosotros' },
];

export function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function layout(ctx, page, body) {
  const { lang, B, root, L, config } = ctx;
  const title = page.title ? `${L(page.title.en, page.title.es)} | ${B}` : `${B} | ${L('Plans, takeoffs, deals and jobs for builders', 'Planos, cuantificación, negocios y obras para constructores')}`;
  const desc = L(page.description.en, page.description.es);
  const site = config.siteUrl.replace(/\/$/, '');
  const file = page.slug === 'index' ? 'index.html' : `${page.slug}.html`;
  const enUrl = `${site}/${file === 'index.html' ? '' : file}`;
  const esUrl = `${site}/es/${file === 'index.html' ? '' : file}`;
  const canonical = lang === 'es' ? esUrl : enUrl;
  const otherHref = lang === 'es' ? `../${file}` : `es/${file}`;
  const current = page.nav || page.slug;

  const navLinks = NAV.map((n) => `<a href="${n.slug}.html"${current === n.slug ? ' aria-current="page"' : ''}>${L(n.en, n.es)}</a>`).join('');

  const draft = config.draftNameBanner
    ? `<div class="draft-banner" role="note">${L('Draft name, pending trademark check', 'Nombre provisional, pendiente de revisión de marca')}</div>`
    : '';

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="en" href="${enUrl}">
<link rel="alternate" hreflang="es" href="${esUrl}">
<link rel="alternate" hreflang="x-default" href="${enUrl}">
<meta name="theme-color" content="#1B1D1F">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(B)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site}/img/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${lang === 'es' ? 'es_US' : 'en_US'}">
<meta property="og:locale:alternate" content="${lang === 'es' ? 'en_US' : 'es_US'}">
<meta name="twitter:card" content="summary_large_image">
${page.noindex ? '<meta name="robots" content="noindex">\n' : ''}<link rel="icon" href="${root}favicon.svg" type="image/svg+xml">
<link rel="preload" href="${root}assets/fonts/inter-tight-latin-800-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${root}assets/fonts/inter-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${root}assets/css/site.css">
</head>
<body>
<a class="skip" href="#main">${L('Skip to content', 'Ir al contenido')}</a>
${draft}
<header class="site-header">
  <div class="wrap">
    <a class="wordmark" href="index.html" aria-label="${esc(B)}, ${L('home', 'inicio')}">${esc(B)}</a>
    <nav class="nav" id="site-nav" aria-label="${L('Main', 'Principal')}">
      ${navLinks}
      <a class="nav-cta" href="beta.html">${L('Apply for the beta', 'Solicitar la beta')}</a>
    </nav>
    <div class="header-actions">
      <div class="lang-toggle" role="group" aria-label="${L('Language', 'Idioma')}">
        ${lang === 'en' ? `<span aria-current="true" lang="en">EN</span><a href="${otherHref}" hreflang="es" lang="es" aria-label="Español">ES</a>` : `<a href="${otherHref}" hreflang="en" lang="en" aria-label="English">EN</a><span aria-current="true" lang="es">ES</span>`}
      </div>
      <a class="btn btn-primary btn-sm" href="beta.html">${L('Apply for the beta', 'Solicitar la beta')}</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav">${L('Menu', 'Menú')}</button>
    </div>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <a class="wordmark" href="index.html">${esc(B)}</a>
        <p>${L('Software for home builders, remodelers, flippers and developers. Built in Dallas-Fort Worth.', 'Software para constructores de casas, remodeladores, inversionistas y desarrolladores. Hecho en Dallas-Fort Worth.')}</p>
      </div>
      <div>
        <h2>${L('Product', 'Producto')}</h2>
        <ul>
          <li><a href="features.html">${L('Features', 'Funciones')}</a></li>
          <li><a href="pricing.html">${L('Pricing', 'Precios')}</a></li>
          <li><a href="beta.html">${L('Private beta', 'Beta privada')}</a></li>
        </ul>
      </div>
      <div>
        <h2>${L('Free tools', 'Herramientas gratis')}</h2>
        <ul>
          <li><a href="deal-calculator.html">${L('Deal calculator', 'Calculadora de negocios')}</a></li>
          <li><a href="house-facing.html">${L('Which way does my house face?', '¿Hacia dónde da mi casa?')}</a></li>
          <li><a href="span-check.html">${L('Joist and rafter span check', 'Claros de viguetas y vigas de techo')}</a></li>
        </ul>
      </div>
      <div>
        <h2>${L('Company', 'Empresa')}</h2>
        <ul>
          <li><a href="about.html">${L('About', 'Nosotros')}</a></li>
          <li><a href="contact.html">${L('Contact', 'Contacto')}</a></li>
          <li><a href="privacy.html">${L('Privacy', 'Privacidad')}</a></li>
          <li><a href="terms.html">${L('Terms', 'Términos')}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${new Date().getFullYear()} ${esc(B)}. Dallas-Fort Worth, Texas.</span>
      <span>${L('We never share or sell your information.', 'Nunca compartimos ni vendemos su información.')}</span>
    </div>
  </div>
</footer>
<script type="module" src="${root}assets/js/site.js"></script>
${(page.scripts || []).map((s) => `<script type="module" src="${root}assets/js/${s}"></script>`).join('\n')}
</body>
</html>
`;
}
