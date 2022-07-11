const mode = document.getElementById('mode');
if (mode !== null) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
      document.documentElement.setAttribute('data-dark-mode', '');
    } else {
      document.documentElement.removeAttribute('data-dark-mode');
    }
    document.body.classList.toggle("dark");
  })
  mode.addEventListener('click', () => {
    document.documentElement.toggleAttribute('data-dark-mode');
    localStorage.setItem('theme', document.documentElement.hasAttribute('data-dark-mode') ? 'dark' : 'light');
  });
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-dark-mode', '');
  } else {
    document.documentElement.removeAttribute('data-dark-mode');
  }
}
