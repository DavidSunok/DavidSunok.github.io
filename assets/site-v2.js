// Motion is progressive enhancement: the diagram stays useful without JavaScript.
(() => {
  const figure = document.getElementById('research-figure');
  const toggle = document.getElementById('motion-toggle');
  if (!figure || !toggle) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  const update = () => {
    figure.classList.toggle('motion-enabled', !reducedMotion.matches);
    figure.classList.toggle('is-paused', paused);
    toggle.hidden = reducedMotion.matches;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.querySelector('.motion-label').textContent = paused ? 'Resume motion' : 'Pause motion';
    toggle.querySelector('.motion-symbol').textContent = paused ? '▷' : 'Ⅱ';
  };
  toggle.addEventListener('click', () => { paused = !paused; update(); });
  reducedMotion.addEventListener('change', update);
  update();
})();
