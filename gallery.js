'use strict';

// Native modal semantics retain focus trapping and Escape handling in the browser.
(() => {
  const dialog = document.getElementById('media-lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const links = [...document.querySelectorAll('.media-link')];
  const image = dialog.querySelector('.lightbox-image');
  const caption = dialog.querySelector('.lightbox-caption');
  const count = dialog.querySelector('.lightbox-count');
  const original = dialog.querySelector('.lightbox-original');
  const status = dialog.querySelector('.lightbox-status');
  const imageWrap = dialog.querySelector('.lightbox-image-wrap');
  let loadingState = 'idle';
  let position = 0;
  let opener = null;
  let backdropStart = false;
  let galleryLinks = links;

  function updateLabels() {
    const fr = document.documentElement.lang === 'fr';
    const labels = {
      '.lightbox-close': fr ? 'Fermer la galerie' : 'Close image gallery',
      '[data-direction="previous"]': fr ? 'Image précédente' : 'Previous image',
      '[data-direction="next"]': fr ? 'Image suivante' : 'Next image'
    };
    for (const [selector, label] of Object.entries(labels)) dialog.querySelector(selector).setAttribute('aria-label', label);
    status.textContent = loadingState === 'loading' ? (fr ? 'Chargement de l’image…' : 'Loading image…') : loadingState === 'error' ? (fr ? 'Image indisponible. Essayez le lien vers l’original.' : 'Image unavailable. Try the original-file link.') : '';
    if (dialog.open) updateCaption();
  }
  new MutationObserver(updateLabels).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  updateLabels();

  function updateCaption() {
    const link = galleryLinks[position];
    caption.textContent = link.closest('figure').querySelector('figcaption')?.textContent || link.querySelector('img').alt;
  }
  function imageSettled(failed = false) {
    loadingState = failed ? 'error' : 'idle';
    imageWrap.setAttribute('aria-busy', 'false');
    dialog.classList.toggle('image-loading', false);
    updateLabels();
  }
  image.addEventListener('load', () => imageSettled());
  image.addEventListener('error', () => imageSettled(true));
  function show(index) {
    position = (index + galleryLinks.length) % galleryLinks.length;
    const link = galleryLinks[position];
    const source = link.querySelector('img');
    loadingState = 'loading';
    imageWrap.setAttribute('aria-busy', 'true');
    dialog.classList.add('image-loading');
    // Prefer the currently displayed mobile capture when inspecting it on a phone.
    image.src = link.dataset.fullSrc || source.currentSrc || source.src;
    image.alt = source.alt;
    updateCaption();
    count.textContent = `${position + 1} / ${galleryLinks.length}`;
    original.href = image.src;
    updateLabels();
    if (image.complete) imageSettled(!image.naturalWidth);
  }

  links.forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.setAttribute('aria-controls', dialog.id);
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      galleryLinks = links.filter(item => item.dataset.gallery === link.dataset.gallery);
      show(galleryLinks.indexOf(link));
      dialog.showModal();
      document.documentElement.classList.add('gallery-open');
      dialog.querySelector('.lightbox-close').focus();
    });
  });

  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.querySelectorAll('.lightbox-step').forEach(button => {
    button.addEventListener('click', () => show(position + (button.dataset.direction === 'next' ? 1 : -1)));
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      show(position + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('pointerdown', event => { backdropStart = event.target === dialog; });
  dialog.addEventListener('click', event => {
    if (backdropStart && event.target === dialog) dialog.close();
    backdropStart = false;
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('gallery-open');
    opener?.focus({ preventScroll: true });
  });
})();
