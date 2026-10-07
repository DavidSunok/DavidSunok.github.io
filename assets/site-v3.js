// Project demos are an explicit choice. Posters work without JavaScript.
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const demos = [...document.querySelectorAll('[data-video-toggle]')].map(button => {
    const video = document.getElementById(button.getAttribute('aria-controls'));
    if (!video) return null;
    video.muted = true;
    video.autoplay = false;
    button.hidden = false;
    const update = () => {
      const playing = !video.paused;
      button.setAttribute('aria-pressed', String(playing));
      button.querySelector('.video-label').textContent = playing ? 'Pause demo' : 'Play demo';
      button.querySelector('[aria-hidden]').textContent = playing ? 'Ⅱ' : '▶';
    };
    button.addEventListener('click', async () => {
      if (!video.paused) { video.pause(); return; }
      video.muted = true;
      try { await video.play(); } catch { video.pause(); update(); }
    });
    video.addEventListener('play', update);
    video.addEventListener('pause', update);
    video.addEventListener('error', () => { video.pause(); update(); });
    update();
    return { video, button };
  }).filter(Boolean);
  // A changed motion preference or a hidden page stops every running demo.
  reducedMotion.addEventListener('change', () => demos.forEach(({video}) => video.pause()));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) demos.forEach(({video}) => video.pause());
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (!entry.isIntersecting) entry.target.pause(); });
    }, { threshold:0 });
    demos.forEach(({video}) => observer.observe(video));
  }
})();
