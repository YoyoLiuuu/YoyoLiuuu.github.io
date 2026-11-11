// Homepage hero: reasoning trajectories checked against a validated domain.
//
// A trajectory takes one step at a time. While it stays inside the validated
// domain it carries on and ends in "act". The moment a step lands outside, it
// is flagged and stops: "verify first". Moving the pointer over the canvas
// steers the next steps, so a visitor can push a trajectory out of the domain
// and watch it get caught.
(function () {
  function init(canvas) {
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  // ---- layout (all in units of canvas width / height) ------------------------

  var CX = 0.45, CY = 0.52;          // centre of the validated domain
  var RX = 0.36, RY = 0.4;           // its base radii
  var STEP = 0.088;                  // length of one reasoning step (× width)
  var MAX_STEPS = 8;
  var STEP_MS = 430, HOLD_MS = 1500, HISTORY = 4;

  // a soft, slightly irregular outline
  function radiusScale(theta) {
    return 1 + 0.1 * Math.sin(2 * theta + 0.9) + 0.07 * Math.sin(3 * theta + 2.2);
  }
  function inside(p) {
    var dx = (p.x - CX) / RX, dy = (p.y - CY) / RY;
    var theta = Math.atan2(dy, dx);
    return Math.sqrt(dx * dx + dy * dy) <= radiusScale(theta);
  }

  // ---- theme -----------------------------------------------------------------

  var colors = {};
  function readColors() {
    var s = getComputedStyle(document.documentElement);
    function v(name, fallback) { return s.getPropertyValue(name).trim() || fallback; }
    colors = {
      ink: v('--ink-2', '#41464d'),
      muted: v('--muted', '#646b73'),
      edge: v('--edge', '#cbcfd5'),
      accent: v('--accent', '#c2185b'),
      act: v('--ok', '#7a2a6c'),
      flag: v('--warn', '#c98509'),
      bg: v('--bg', '#fbfaf8')
    };
  }
  // step colours walk along the site gradient
  var STEP_COLORS = ['#e88fb4', '#e47aa6', '#df6598', '#d9508a', '#d23b7c', '#ca286d', '#c2185b', '#a81452'];

  // ---- size ------------------------------------------------------------------

  var W = 0, H = 0, dpr = 1;
  function px(p) { return { x: p.x * W, y: p.y * H }; }

  // ---- trajectories ----------------------------------------------------------

  var pointer = null;      // normalised pointer position while over the canvas
  var current = null;      // trajectory being drawn
  var history = [];        // finished ones, fading out
  var count = 0;

  function rand(a, b) { return a + Math.random() * (b - a); }

  function newTrajectory(now) {
    count += 1;
    var leaves = count % 2 === 0;                 // alternate: stays in, then drifts out
    var start = { x: CX - RX * rand(0.55, 0.72), y: CY + RY * rand(-0.35, 0.35) };
    var target = leaves
      ? { x: CX + RX * rand(1.25, 1.6), y: CY + RY * rand(-0.9, 0.9) }
      : { x: CX + RX * rand(0.3, 0.55), y: CY + RY * rand(-0.4, 0.4) };
    return { pts: [start], target: target, leaves: leaves, state: 'running', stepStart: now, doneAt: 0 };
  }

  function nextPoint(t) {
    var cur = t.pts[t.pts.length - 1];
    var aim = pointer || t.target;
    var aspect = H / W;
    var base = Math.atan2((aim.y - cur.y) * aspect, aim.x - cur.x);
    var wobble = pointer ? 0.35 : (t.leaves ? 0.55 : 0.75);
    var cand = null;
    for (var i = 0; i < 6; i++) {
      var a = base + rand(-wobble, wobble);
      cand = { x: cur.x + Math.cos(a) * STEP, y: cur.y + Math.sin(a) * STEP / aspect };
      // a trajectory meant to stay inside retries with less wobble if it would leave
      if (pointer || t.leaves || inside(cand)) break;
      wobble *= 0.5;
    }
    cand.x = Math.max(0.03, Math.min(0.97, cand.x));
    cand.y = Math.max(0.06, Math.min(0.94, cand.y));
    return cand;
  }

  function advance(now) {
    if (!current) current = newTrajectory(now);
    var t = current;

    if (t.state === 'running' && now - t.stepStart >= STEP_MS) {
      var cur = t.pts[t.pts.length - 1];
      if (!inside(cur)) {
        t.state = 'flagged';
        t.doneAt = now;
      } else if (t.pts.length > MAX_STEPS ||
                 (!pointer && !t.leaves && Math.abs(cur.x - t.target.x) + Math.abs(cur.y - t.target.y) < STEP * 0.9)) {
        t.state = 'acted';
        t.doneAt = now;
      } else {
        t.pts.push(nextPoint(t));
        t.stepStart = now;
      }
    }

    if (t.state !== 'running' && now - t.doneAt > HOLD_MS) {
      history.unshift(t);
      if (history.length > HISTORY) history.pop();
      current = newTrajectory(now);
    }
  }

  // ---- drawing ---------------------------------------------------------------

  function drawDomain() {
    ctx.beginPath();
    for (var i = 0; i <= 96; i++) {
      var th = (i / 96) * Math.PI * 2;
      var s = radiusScale(th);
      var x = (CX + Math.cos(th) * RX * s) * W;
      var y = (CY + Math.sin(th) * RY * s) * H;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.globalAlpha = 0.07;
    ctx.fillStyle = colors.accent;
    ctx.fill();
    ctx.globalAlpha = 0.55;
    ctx.setLineDash([5, 6]);
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = colors.accent;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    // sits just outside the outline, clear of the trajectories
    label('validated domain', (CX - RX * 0.92) * W, (CY - RY * 1.13) * H, colors.muted, 'left');
  }

  function label(text, x, y, color, align, plate) {
    var size = W < 420 ? 10 : 12;
    ctx.font = '500 ' + size + 'px "IBM Plex Mono", ui-monospace, Menlo, monospace';
    ctx.textAlign = align || 'left';
    ctx.textBaseline = 'middle';
    if (plate) {
      // a small plate in the page colour keeps the label readable over lines
      var w = ctx.measureText(text).width, padX = 6, h = size + 8;
      var left = (align === 'right' ? x - w : x) - padX;
      var a = ctx.globalAlpha;
      ctx.globalAlpha = a * 0.88;
      ctx.fillStyle = colors.bg;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(left, y - h / 2, w + padX * 2, h, h / 2);
      else ctx.rect(left, y - h / 2, w + padX * 2, h);
      ctx.fill();
      ctx.globalAlpha = a;
    }
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }

  function drawTrajectory(t, alpha, now, live) {
    var n = t.pts.length;
    var growing = live && t.state === 'running';
    var k = growing ? Math.min(1, (now - t.stepStart) / STEP_MS) : 1;
    k = 1 - Math.pow(1 - k, 3); // ease out
    var nodeR = Math.max(4.5, W * 0.011);

    // segments
    ctx.lineWidth = 1.6;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colors.ink;
    for (var i = 1; i < n; i++) {
      var a = px(t.pts[i - 1]), b = px(t.pts[i]);
      var f = (i === n - 1) ? k : 1;
      ctx.globalAlpha = alpha * 0.55;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f);
      ctx.stroke();
    }

    // nodes
    for (var j = 0; j < n; j++) {
      var last = j === n - 1;
      if (last && growing && k < 0.85 && n > 1) continue; // the newest node pops in at the end of its step
      var p = px(t.pts[j]);
      var color = STEP_COLORS[Math.min(j, STEP_COLORS.length - 1)];
      var r = nodeR;
      if (last && t.state === 'flagged') { color = colors.flag; r = nodeR * 1.25; }
      if (last && t.state === 'acted') { color = colors.act; r = nodeR * 1.25; }
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = colors.bg;
      ctx.stroke();
    }

    // outcome
    if (t.state !== 'running') {
      var end = px(t.pts[n - 1]);
      var flagged = t.state === 'flagged';
      var c = flagged ? colors.flag : colors.act;
      if (live) {
        var age = (now - t.doneAt) / 900;
        var pulse = reduceMotion ? 0.5 : age % 1;
        ctx.globalAlpha = alpha * (1 - pulse) * 0.7;
        ctx.beginPath();
        ctx.arc(end.x, end.y, nodeR * (1.6 + pulse * 2.6), 0, Math.PI * 2);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = c;
        ctx.stroke();
      }
      ctx.globalAlpha = alpha;
      var right = end.x < W * 0.74;
      label(flagged ? 'flagged · verify first' : 'checked · act',
            end.x + (right ? nodeR * 2.6 : -nodeR * 2.6), end.y - nodeR * 2.8, c, right ? 'left' : 'right', true);
    }
    ctx.globalAlpha = 1;
  }

  function draw(now) {
    if (!W) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    drawDomain();
    for (var i = history.length - 1; i >= 0; i--) {
      drawTrajectory(history[i], 0.34 * (1 - i / HISTORY), now, false);
    }
    if (current) drawTrajectory(current, 1, now, true);
  }

  // ---- loop ------------------------------------------------------------------

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var visible = true, raf = null;

  function tick(now) {
    raf = null;
    advance(now);
    draw(now);
    if (visible && !document.hidden) raf = requestAnimationFrame(tick);
  }
  function schedule() {
    if (raf == null && !reduceMotion) raf = requestAnimationFrame(tick);
  }

  // without motion: show one finished trajectory of each kind
  function drawStill() {
    function finish(leaves) {
      count = leaves ? 1 : 0;
      var t = newTrajectory(0);
      // keep the two examples apart: one low and inside, one high and leaving
      t.pts[0].y = CY + RY * (leaves ? -0.3 : 0.32);
      t.target.y = CY + RY * (leaves ? -0.75 : 0.42);
      while (t.state === 'running') {
        var cur = t.pts[t.pts.length - 1];
        if (!inside(cur)) t.state = 'flagged';
        else if (t.pts.length > MAX_STEPS ||
                 (!leaves && Math.abs(cur.x - t.target.x) + Math.abs(cur.y - t.target.y) < STEP * 0.9)) t.state = 'acted';
        else t.pts.push(nextPoint(t));
      }
      return t;
    }
    if (!still) still = [finish(false), finish(true)];
    var safe = still[0], flagged = still[1];
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    drawDomain();
    drawTrajectory(safe, 1, 0, true);
    drawTrajectory(flagged, 1, 0, true);
  }

  // ---- interaction -----------------------------------------------------------

  canvas.addEventListener('pointermove', function (e) {
    var r = canvas.getBoundingClientRect();
    pointer = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
  });
  canvas.addEventListener('pointerleave', function () { pointer = null; });
  canvas.addEventListener('pointercancel', function () { pointer = null; });

  // ---- lifecycle -------------------------------------------------------------

  readColors();

  var still = null;
  function render() {
    var r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, r.width);
    H = Math.max(1, r.height);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    if (reduceMotion) drawStill(); else draw(performance.now());
  }
  render();

  if (window.ResizeObserver) new ResizeObserver(render).observe(canvas);
  else window.addEventListener('resize', render);

  if (window.IntersectionObserver) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) schedule();
    }).observe(canvas);
  }
  document.addEventListener('visibilitychange', function () { if (!document.hidden) schedule(); });

  if (window.MutationObserver) {
    new MutationObserver(function () { readColors(); render(); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  schedule();
  }

  // one drawing per <canvas data-scene="trajectory">
  Array.prototype.forEach.call(document.querySelectorAll('canvas[data-scene="trajectory"]'), init);
})();
