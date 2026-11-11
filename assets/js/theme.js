// Light/dark toggle. The initial theme is set inline in <head> to avoid a flash.
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');

  function saved() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // Follow the system setting until the visitor picks a theme themselves.
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) {
      if (!saved()) root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }
})();
