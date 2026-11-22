// Shared behavior: mobile menu and the beta and contact forms.

const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('site-nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.focus();
    }
  });
}

// Forms post JSON to the endpoint set in site.config.json (written into
// data-endpoint at build time). With no endpoint, nothing is sent or stored:
// the visitor sees the confirmation and developers get a console warning.
for (const form of document.querySelectorAll('form[data-endpoint]')) {
  const done = document.getElementById(form.dataset.done);
  const err = form.querySelector('.form-error');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (err) err.textContent = '';
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    // Honeypot: real people never fill this field.
    if (data.website) {
      showDone();
      return;
    }
    delete data.website;
    data.language = document.documentElement.lang;
    data.form = form.dataset.form;
    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      console.warn(`[dev] No endpoint is set for the "${form.dataset.form}" form in site.config.json. Nothing was sent or stored.`);
      showDone();
      return;
    }
    const btn = form.querySelector('[type=submit]');
    if (btn) btn.disabled = true;
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      showDone();
    } catch (ex) {
      if (err) err.textContent = form.dataset.errorText || 'Something went wrong. Try again.';
      if (btn) btn.disabled = false;
    }
  });
  function showDone() {
    form.hidden = true;
    if (done) {
      done.hidden = false;
      done.setAttribute('tabindex', '-1');
      done.focus();
    }
  }
}
