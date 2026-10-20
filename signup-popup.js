(function () {
  const key = 'stem-stone-signup-dismissed-until';
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  let overlay, dialog, priorFocus;
  function saveDays(days) { try { localStorage.setItem(key, String(Date.now() + days * 86400000)); } catch (_) {} }
  function closePopup() {
    if (!overlay) return;
    overlay.hidden = true;
    document.body.classList.remove('signup-open');
    if (priorFocus && priorFocus.isConnected) priorFocus.focus();
  }
  function dismiss() { saveDays(30); closePopup(); }
  function openPopup() {
    if (!overlay) return;
    priorFocus = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add('signup-open');
    dialog.focus();
  }
  // Footer and journal links always open the form, even after a prior dismissal.
  document.addEventListener('click', function (event) {
    const trigger = event.target.closest('[data-open-signup]');
    if (trigger) { event.preventDefault(); openPopup(); }
  });
  document.addEventListener('keydown', function (event) {
    if (!overlay || overlay.hidden) return;
    if (event.key === 'Escape') { dismiss(); return; }
    if (event.key !== 'Tab') return;
    const elements = [...dialog.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]):not([type="hidden"])')].filter(el => el.getClientRects().length);
    if (!elements.length) { event.preventDefault(); return; }
    if (event.shiftKey && document.activeElement === elements[0]) { event.preventDefault(); elements.at(-1).focus(); }
    if (!event.shiftKey && document.activeElement === elements.at(-1)) { event.preventDefault(); elements[0].focus(); }
  });
  fetch('signup-popup.html').then(response => {
    if (!response.ok) throw new Error('Signup form template unavailable');
    return response.text();
  }).then(markup => {
    document.body.insertAdjacentHTML('beforeend', markup);
    overlay = document.getElementById('orchard-signup');
    dialog = overlay.querySelector('.signup-dialog');
    document.getElementById('signup-close').addEventListener('click', dismiss);
    document.getElementById('signup-dismiss').addEventListener('click', dismiss);
    overlay.addEventListener('click', event => { if (event.target === overlay) dismiss(); });
    const success = document.getElementById('success-message');
    if (success) new MutationObserver(() => {
      if (getComputedStyle(success).display !== 'none') {
        saveDays(365);
        // Leave confirmation visible inside the dismissible popup.
        document.getElementById('sib-container').hidden = true;
        document.getElementById('signup-dismiss').hidden = true;
      }
    }).observe(success, { attributes: true, attributeFilter: ['style','class'] });
    // Brevo's script must load AFTER the form has been inserted.
    const script = document.createElement('script');
    script.src = 'https://sibforms.com/forms/end-form/build/main.js';
    script.defer = true;
    document.body.appendChild(script);
    let expiry = 0;
    try { expiry = Number(localStorage.getItem(key)) || 0; } catch (_) {}
    if (document.body.dataset.page === 'home' && Date.now() >= expiry) openPopup();
  }).catch(error => console.error('Could not load orchard signup:', error));
})();
