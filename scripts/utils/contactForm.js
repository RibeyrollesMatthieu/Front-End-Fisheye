function displayModal() {
  const main = document.querySelector('main');
  const modal = document.getElementById('contact_modal');
  const body = document.body;
  const close = document.querySelector('#modal-close-button');

  modal.style.display = 'block';
  main.setAttribute('aria-hidden', true);
  modal.setAttribute('aria-hidden', false);
  body.classList.add('no-scroll');
  close.focus();
}

function closeModal() {
  const main = document.querySelector('main');
  const modal = document.getElementById('contact_modal');
  const body = document.body;
  const open = document.querySelector('#modal-open-button');

  modal.style.display = 'none';
  main.setAttribute('aria-hidden', false);
  modal.setAttribute('aria-hidden', true);
  body.classList.remove('no-scroll');
  open.focus();
}

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;

  const modal = document.getElementById('contact_modal');

  if (modal.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});

/* contact submit handle */

const handleContactSubmit = (e) => {
  e.preventDefault();

  const data = new FormData(e.target);

  for (let entry of data.entries()) {
    console.log(`${entry[0]}: ${entry[1]}`);
  }
};

document.querySelector('#contact-form').addEventListener('submit', handleContactSubmit);
