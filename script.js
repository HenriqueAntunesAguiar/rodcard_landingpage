const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    mainNav.classList.toggle('is-open', !isOpen);
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menu');
      mainNav.classList.remove('is-open');
    });
  });
}

const quoteForm = document.querySelector('#quote-form');
if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;

    const fields = new FormData(quoteForm);
    const message = [
      'Olá, RodCar! Gostaria de solicitar um atendimento.',
      '',
      `Nome: ${fields.get('nome')}`,
      `Veículo: ${fields.get('veiculo')}`,
      `Serviço: ${fields.get('servico')}`,
      fields.get('mensagem') ? `Mensagem: ${fields.get('mensagem')}` : '',
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/551932765122?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll('.service-card, .about-panel, .quote-form, .location-copy, .map-card');
if ('IntersectionObserver' in window && revealTargets.length) {
  document.documentElement.classList.add('reveal-ready');
  revealTargets.forEach((target) => target.classList.add('reveal'));
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.14 });
  revealTargets.forEach((target) => observer.observe(target));
}
