(function () {
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.menu-toggle');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach(function (item) {
      item.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  window.addEventListener('scroll', function () {
    if (!header) return;
    if (window.scrollY > 16) {
      header.style.boxShadow = '0 6px 18px rgba(0,0,0,.2)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
})();
