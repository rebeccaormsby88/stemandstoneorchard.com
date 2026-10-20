document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('orchard-contact-form');
  const result = document.getElementById('contact-result');
  if (!form || !result) return;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const button = form.querySelector('[type="submit"]');
    button.disabled = true;
    button.textContent = 'Sending…';
    result.hidden = true;
    try {
      const response = await fetch(form.action, {
        method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('Formspree did not accept the message');
      form.hidden = true;
      result.innerHTML = '<h2>Thank you for reaching out!</h2><p>Your message has been sent to Stem &amp; Stone Orchard. We’ll be in touch soon.</p>';
      result.hidden = false;
      result.focus();
    } catch (_) {
      result.textContent = 'Sorry, your message could not be sent. Please try again, or email hello@stemandstoneorchard.com.';
      result.hidden = false;
    } finally { button.disabled = false; button.textContent = 'Send message'; }
  });
});
