'use strict';

// Reference behaviours, rebuilt around the portfolio's native links and disclosures.
(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const control = document.querySelector('.motion-toggle');
  const cursor = document.querySelector('.image-cursor');
  const active = new Set();
  const prepared = new WeakMap();
  const revealed = new WeakSet();
  const signature = document.querySelector('.signature');
  const headings = [...document.querySelectorAll('.specialty h2,.section-heading h2,.project h3:not([data-react-heading]),.lab-heading h3,.lab-card h4,.approach h3,.about h2,.experience-panel h3,.background-content h3,.contact h2')];
  const stopped = () => document.hidden || reduced.matches || root.classList.contains('motion-paused');

  function corners(element) {
    element.classList.add('reference-framed');
    const frame = document.createElement('span');
    frame.className = 'reference-corners';
    frame.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 4; i++) frame.append(document.createElement('i'));
    element.append(frame);
  }
  const frames = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) { corners(entry.target); frames.unobserve(entry.target); }
  }, {rootMargin: '200px'});
  document.querySelectorAll('.button,.reel-step').forEach(element=>frames.observe(element));
  function prepareImage(link) {
    const image = link.querySelector('img');
    if (!image) return;
    const media = image.closest('picture') || image;
    const surface = document.createElement('span');
    surface.className = 'media-surface';
    media.before(surface);
    surface.append(media);
    corners(link);
    link.addEventListener('pointerenter', () => {
      if (!fine.matches || stopped()) return;
      cursor.classList.add('is-visible');
    });
    link.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
  }
  const mediaObserver = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) { prepareImage(entry.target); mediaObserver.unobserve(entry.target); }
  }, {rootMargin: '300px'});
  document.querySelectorAll('.media-link').forEach(link=>mediaObserver.observe(link));
  let pending = false, pointer = {x: -200, y: -200};
  addEventListener('pointermove', event => {
    if (!fine.matches || stopped() || !cursor.classList.contains('is-visible')) return;
    pointer = {x: Math.min(innerWidth - 80, event.clientX + 18), y: Math.min(innerHeight - 80, event.clientY + 18)};
    if (!pending) {
      pending = true;
      requestAnimationFrame(() => { pending = false; cursor.style.transform = `translate3d(${pointer.x}px,${pointer.y}px,0)`; });
    }
  }, {passive: true});
  addEventListener('scroll', () => cursor.classList.remove('is-visible'), {passive: true});
  addEventListener('blur', () => cursor.classList.remove('is-visible'));

  function prepare(heading) {
    if (prepared.get(heading) === heading.textContent && heading.querySelector('.motion-word')) return;
    prepared.set(heading, heading.textContent);
    revealed.delete(heading);
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const fragment = document.createDocumentFragment();
      for (const part of node.textContent.split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) fragment.append(document.createTextNode(part));
        else { const mask = document.createElement('span'); mask.className = 'motion-mask'; const word = document.createElement('span'); word.className = 'motion-word'; word.textContent = part; mask.append(word); fragment.append(mask); }
      }
      node.replaceWith(fragment);
    }
  }
  function reveal(heading) {
    if (stopped() || revealed.has(heading)) return;
    if (heading === signature) {
      revealed.add(heading);
      const animation = heading.animate([{opacity:.25,transform:'translateY(60px)'},{opacity:1,transform:'translateY(0)'}], {duration:1200,easing:'cubic-bezier(.16,1,.3,1)'});
      active.add(animation);
      animation.finished.then(() => active.delete(animation)).catch(() => active.delete(animation));
      return;
    }
    prepare(heading);
    revealed.add(heading);
    heading.querySelectorAll('.motion-word').forEach((word, index) => {
      const animation = word.animate([{transform: 'translateY(105%)'}, {transform: 'translateY(0)'}], {duration: 720, delay: Math.min(index * 35, 420), easing: 'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
      active.add(animation);
      animation.finished.then(() => active.delete(animation)).catch(() => active.delete(animation));
    });
  }
  const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) reveal(entry.target); }, {threshold: .2});
  // Word masks can change line wrapping. Prepare card titles before measuring
  // their sticky geometry, rather than changing their height during a handoff.
  headings.forEach(heading => {
    if(heading.closest('.creator-project'))prepare(heading);
    observer.observe(heading);
  });
  if (signature) observer.observe(signature);

  function syncPause() {
    root.classList.toggle('motion-paused', reduced.matches || control.getAttribute('aria-pressed') === 'true');
    root.classList.toggle('effects-suspended', document.hidden);
    if (stopped()) { for (const animation of active) animation.cancel(); active.clear(); cursor.classList.remove('is-visible'); }
  }
  // Keep the same pause preference available when WebGL cannot initialise.
  function fallbackControl() {
    if (!control.hidden || control.dataset.scenePending === 'true') return;
    control.hidden = false;
    let paused = false;
    try { paused = localStorage.getItem('portfolio-motion-paused') === 'true'; } catch {}
    const label = () => {
      const fr = root.lang === 'fr';
      control.setAttribute('aria-pressed', String(paused || reduced.matches));
      control.classList.toggle('is-paused', paused || reduced.matches);
      control.disabled = reduced.matches;
      control.setAttribute('aria-label', reduced.matches ? (fr ? 'Animation désactivée : mouvement réduit' : 'Animation disabled: reduced motion') : paused ? (fr ? 'Reprendre les animations' : 'Resume animations') : (fr ? 'Mettre les animations en pause' : 'Pause animations'));
    };
    control.addEventListener('click', () => { paused = !paused; try { localStorage.setItem('portfolio-motion-paused', String(paused)); } catch {} label(); });
    new MutationObserver(label).observe(root, {attributes: true, attributeFilter: ['lang']});
    reduced.addEventListener('change', label);
    label();
  }
  fallbackControl();
  document.addEventListener('hero-scene-ready', fallbackControl, {once: true});
  document.addEventListener('visibilitychange', syncPause);
  new MutationObserver(syncPause).observe(control, {attributes: true, attributeFilter: ['aria-pressed']});
  reduced.addEventListener('change', syncPause);
  new MutationObserver(() => {
    for (const animation of active) animation.cancel();
    active.clear();
    for (const heading of headings) {
      revealed.delete(heading);
      if(heading.closest('.creator-project'))prepare(heading);
      const r = heading.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) reveal(heading);
    }
  }).observe(root, {attributes: true, attributeFilter: ['lang']});
  root.classList.add('effects-ready');
  syncPause();
  // The scroll chapter changes height when enhanced motion starts. Restore the
  // requested deep link after layout, and focus it so sticky cards cannot cover it.
  if(location.hash)requestAnimationFrame(()=>{
    let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
    const target=document.getElementById(id);
    if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});target.scrollIntoView({behavior:'instant',block:'start'});}
  });
})();
