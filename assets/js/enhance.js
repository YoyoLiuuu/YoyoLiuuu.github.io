// Progressive enhancement. Every page reads fine without this file; with it:
//   - research / projects / experience entries become a timeline
//   - publications become cards
//   - things fade in as they scroll into view, and a progress bar tracks scroll
(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var slice = Array.prototype.slice;

  function el(tag, cls) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    return n;
  }
  function isTag(n, names) {
    return n.nodeType === 1 && names.indexOf(n.tagName) !== -1;
  }

  // ---- inner pages: timeline entries and publication cards -------------------

  // "Role | May 2026 – Present | Toronto, ON" -> pieces separated by dots
  function tidyMeta(p) {
    slice.call(p.childNodes).forEach(function (n) {
      if (n.nodeType !== 3 || n.nodeValue.indexOf('|') === -1) return;
      var parts = n.nodeValue.split('|');
      var frag = document.createDocumentFragment();
      parts.forEach(function (part, i) {
        if (i > 0) {
          var sep = el('span', 'entry__sep');
          sep.setAttribute('aria-hidden', 'true');
          sep.textContent = '·';
          frag.appendChild(sep);
        }
        if (part.trim()) frag.appendChild(document.createTextNode(part.trim()));
      });
      p.replaceChild(frag, n);
    });
  }

  function buildEntries(archive, headingTag) {
    var stops = ['H1', 'H2', 'H3', 'HR'];
    slice.call(archive.children).forEach(function (h) {
      if (h.tagName !== headingTag || h.parentNode !== archive) return;
      var entry = el('div', 'entry');
      var prev = h.previousElementSibling;
      while (prev && prev.tagName === 'HR') prev = prev.previousElementSibling;
      if (!prev || !prev.classList.contains('entry')) entry.classList.add('entry--first');
      archive.insertBefore(entry, h);
      var n = h.nextSibling;
      entry.appendChild(h);
      while (n && !isTag(n, stops)) {
        var next = n.nextSibling;
        entry.appendChild(n);
        n = next;
      }
      var meta = h.nextElementSibling;
      if (meta && meta.tagName === 'P') {
        meta.classList.add('entry__meta');
        tidyMeta(meta);
        if (/present|incoming|starting/i.test(meta.textContent + ' ' + h.textContent)) {
          entry.classList.add('entry--current');
        }
      }
    });
    archive.classList.add('is-enhanced');
  }

  function buildPubCards(archive) {
    slice.call(archive.children).forEach(function (p) {
      if (p.tagName !== 'P' || p.classList.contains('pub-links')) return;
      var first = p.firstElementChild;
      if (first && (first.tagName === 'STRONG' || first.tagName === 'EM') && p.firstChild === first) {
        p.classList.add('pub');
      }
    });
    archive.classList.add('is-enhanced');
  }

  function buildInnerPages() {
    var archive = document.querySelector('.archive');
    if (!archive) return;
    var body = document.body.classList;
    if (body.contains('page--research') || body.contains('page--projects')) buildEntries(archive, 'H2');
    else if (body.contains('page--experience')) buildEntries(archive, 'H3');
    else if (body.contains('page--publications')) buildPubCards(archive);
  }

  // ---- homepage: roadmap boxes open a drawing ------------------------------

  function setupStage() {
    var stage = document.getElementById('stage');
    if (!stage) return;
    var boxes = slice.call(document.querySelectorAll('.roadmap__item[data-pane]'));
    var panes = slice.call(stage.querySelectorAll('.stage__pane'));
    var open = null;

    function show(id) {
      open = id;
      stage.hidden = !id;
      panes.forEach(function (p) { p.hidden = p.getAttribute('data-pane') !== id; });
      boxes.forEach(function (b) {
        var on = b.getAttribute('data-pane') === id;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-expanded', on ? 'true' : 'false');
      });
      if (id) {
        // bring the drawing into view if it opened below the fold
        var r = stage.getBoundingClientRect();
        if (r.bottom > window.innerHeight || r.top < 0) {
          stage.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      }
    }

    boxes.forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-pane');
        show(open === id ? null : id);
      });
    });
    var close = stage.querySelector('.stage__close');
    if (close) close.addEventListener('click', function () { show(null); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) show(null); });
  }

  // ---- reveal on scroll ------------------------------------------------------

  function setupReveal() {
    if (reduceMotion || !window.IntersectionObserver) return;
    var targets = slice.call(document.querySelectorAll('.sec, .entry, .pub, .cta'));
    if (!targets.length) return;

    var vh = window.innerHeight || 800;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    targets.forEach(function (t) {
      // anything already on screen stays put; only content below the fold animates in
      if (t.getBoundingClientRect().top < vh * 0.92) return;
      t.classList.add('reveal');
      io.observe(t);
    });
  }

  // ---- scroll progress -------------------------------------------------------

  function setupProgress() {
    var bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    var ticking = false;
    function update() {
      ticking = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = 'scaleX(' + p + ')';
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // ---- card spotlight --------------------------------------------------------

  function setupSpotlight() {
    if (!window.matchMedia || !window.matchMedia('(hover: hover)').matches) return;
    document.addEventListener('pointermove', function (e) {
      var card = e.target.closest && e.target.closest('.pub, .tile');
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  }

  buildInnerPages();
  setupStage();
  root.classList.add('is-enhanced');
  setupReveal();
  setupProgress();
  setupSpotlight();
})();
