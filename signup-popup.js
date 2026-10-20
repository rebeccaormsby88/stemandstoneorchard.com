(function () {
  const overlay = document.getElementById('orchard-signup');
  const dialog = overlay?.querySelector('.signup-dialog');
  if (!overlay || !dialog) return;
  const key = 'stem-stone-signup-dismissed-until';
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  let priorFocus = null;
  function dismiss() {
    try { localStorage.setItem(key, String(Date.now() + thirtyDays)); } catch (_) {}
    overlay.hidden = true;
    document.body.classList.remove('signup-open');
    priorFocus?.focus();
  }
  function open() {
    priorFocus = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add('signup-open');
    dialog.focus();
  }
  document.getElementById('signup-close').addEventListener('click', dismiss);
  document.getElementById('signup-dismiss').addEventListener('click', dismiss);
  overlay.addEventListener('click', e => { if (e.target === overlay) dismiss(); });
  document.addEventListener('keydown', e => {
    if (overlay.hidden) return;
    if (e.key === 'Escape') { dismiss(); return; }
    if (e.key !== 'Tab') return;
    const els = Array.from(dialog.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]):not([type="hidden"])')).filter(el => el.getClientRects().length);
    if (!els.length) { e.preventDefault(); return; }
    if (e.shiftKey && document.activeElement === els[0]) { e.preventDefault(); els.at(-1).focus(); }
    else if (!e.shiftKey && document.activeElement === els.at(-1)) { e.preventDefault(); els[0].focus(); }
  });
  const success = document.getElementById('success-message');
  if (success) new MutationObserver(() => {
    if (getComputedStyle(success).display !== 'none') {
      try { localStorage.setItem(key, String(Date.now() + 365 * 24 * 60 * 60 * 1000)); } catch (_) {}
    }
  }).observe(success, { attributes: true, attributeFilter: ['style', 'class'] });
  let expiry = 0;
  try { expiry = Number(localStorage.getItem(key)) || 0; } catch (_) {}
  if (Date.now() >= expiry) window.addEventListener('load', open, { once: true });
})();
