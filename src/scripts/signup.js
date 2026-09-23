const form = document.querySelector('.signup');

if (form) {
  const input = form.querySelector('input[type="email"]');
  const status = form.querySelector('.signup-status');
  const button = form.querySelector('button');

  input.addEventListener('input', () => {
    if (input.getAttribute('aria-invalid') === 'true' && input.checkValidity()) {
      input.removeAttribute('aria-invalid');
      status.textContent = '';
    }
  });

  form.addEventListener('submit', (event) => {
    const value = input.value.trim();
    input.value = value;
    if (!value || !input.checkValidity()) {
      event.preventDefault();
      input.setAttribute('aria-invalid', 'true');
      status.textContent = value
        ? "That email doesn't look right. Check it and try again."
        : 'Add your email to get the letter.';
      input.focus();
      return;
    }
    input.removeAttribute('aria-invalid');

    if (!form.dataset.endpoint) {
      event.preventDefault();
      status.textContent = "Signups open soon. This form isn't connected to a mailing list yet.";
      return;
    }

    button.disabled = true;
    status.textContent = 'Sending…';
  });
}
