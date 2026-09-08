(() => {
  const word = document.getElementById('changing-word');
  const toggle = document.getElementById('motion-toggle');
  if (!word || !toggle) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const words = ['сотрудника', 'работу'];
  let index = 0;
  let deleting = true;
  let timer;
  let paused = motion.matches;
  function syncButton() {
    toggle.textContent = paused ? 'Включить анимацию' : 'Остановить анимацию';
    document.documentElement.classList.toggle('paused', paused);
  }
  function tick() {
    if (paused) return;
    const current = word.textContent;
    if (deleting) {
      word.textContent = current.slice(0, -1);
      if (!word.textContent) { deleting = false; index = (index + 1) % words.length; }
    } else {
      word.textContent = words[index].slice(0, current.length + 1);
      if (word.textContent === words[index]) {
        deleting = true;
        timer = setTimeout(tick, 2400);
        return;
      }
    }
    timer = setTimeout(tick, deleting ? 85 : 125);
  }
  function setPaused(value) {
    clearTimeout(timer);
    paused = value;
    word.textContent = words[index];
    deleting = true;
    syncButton();
    if (!paused) timer = setTimeout(tick, 2400);
  }
  toggle.hidden = false;
  toggle.addEventListener('click', () => setPaused(!paused));
  motion.addEventListener('change', () => setPaused(motion.matches));
  setPaused(paused);
})();
