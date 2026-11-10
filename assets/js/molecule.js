// Homepage hero: a ball-and-stick model of HBDI (the GFP chromophore) drawn on
// a 2D canvas. It turns slowly on its own and can be dragged to rotate.
//
// Geometry: PubChem CID 129849628, computed 3D conformer (coordinates in Å).
// To show a different molecule, replace ATOMS and BONDS with another
// conformer's atoms [element, x, y, z] and bonds [from, to, order].
(function () {
  function init(canvas) {
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  var ATOMS = [
    ['O', 0.225, -1.709, 0.025], ['O', -5.068, -0.617, 0.033], ['N', 2.691, 0.716, -0.032],
    ['N', 2.562, -1.541, 0.036], ['C', 1.344, 0.442, -0.031], ['C', 3.353, -0.493, 0.009],
    ['C', 0.252, 1.209, -0.048], ['C', 1.256, -1.057, 0.013], ['C', -1.142, 0.729, -0.026],
    ['C', 3.308, 2.021, 0.008], ['C', 4.842, -0.627, 0.026], ['C', -1.8, 0.447, -1.223],
    ['C', -1.802, 0.558, 1.19], ['C', -3.12, -0.006, -1.203], ['C', -3.121, 0.106, 1.21],
    ['C', -3.78, -0.176, 0.014], ['H', 0.351, 2.291, -0.07], ['H', 3.498, 2.317, 1.045],
    ['H', 2.674, 2.783, -0.458], ['H', 4.261, 2.026, -0.532], ['H', 5.251, -0.253, -0.916],
    ['H', 5.128, -1.676, 0.147], ['H', 5.255, -0.047, 0.855], ['H', -1.299, 0.575, -2.179],
    ['H', -1.302, 0.774, 2.131], ['H', -3.628, -0.224, -2.139], ['H', -3.625, -0.023, 2.165],
    ['H', -5.366, -0.677, 0.957]
  ];
  var BONDS = [
    [0, 7, 2], [1, 15, 1], [1, 27, 1], [2, 4, 1], [2, 5, 1], [2, 9, 1], [3, 5, 2], [3, 7, 1],
    [4, 6, 2], [4, 7, 1], [5, 10, 1], [6, 8, 1], [6, 16, 1], [8, 11, 2], [8, 12, 1], [9, 17, 1],
    [9, 18, 1], [9, 19, 1], [10, 20, 1], [10, 21, 1], [10, 22, 1], [11, 13, 1], [11, 23, 1],
    [12, 14, 2], [12, 24, 1], [13, 15, 2], [13, 25, 1], [14, 15, 1], [14, 26, 1]
  ];

  var RADIUS = { C: 0.44, N: 0.42, O: 0.42, H: 0.25 }; // drawn radius in Å
  var SPAN = 11.6;   // Å that should fit across the canvas
  var CAMERA = 26;   // camera distance in Å (mild perspective)

  // centre the molecule on its centroid
  var cx = 0, cy = 0, cz = 0;
  ATOMS.forEach(function (a) { cx += a[1]; cy += a[2]; cz += a[3]; });
  cx /= ATOMS.length; cy /= ATOMS.length; cz /= ATOMS.length;
  var pts = ATOMS.map(function (a) { return { el: a[0], x: a[1] - cx, y: a[2] - cy, z: a[3] - cz }; });

  // ---- colours (follow the site theme) --------------------------------------

  var palette = {};

  function hexToRgb(hex) {
    hex = hex.replace('#', '').trim();
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    var n = parseInt(hex, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function mix(a, b, t) {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  }
  function css(c, alpha) {
    return 'rgba(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ',' + (alpha == null ? 1 : alpha) + ')';
  }

  function readPalette() {
    var s = getComputedStyle(document.documentElement);
    function v(name, fallback) {
      var raw = s.getPropertyValue(name).trim();
      return hexToRgb(/^#[0-9a-f]{3,6}$/i.test(raw) ? raw : fallback);
    }
    palette = {
      C: v('--mol-c', '#3b4049'),
      H: v('--mol-h', '#d9dce1'),
      N: v('--mol-n', '#5b7fe8'),
      O: v('--mol-o', '#ea6a52'),
      bg: v('--bg', '#fbfaf8')
    };
  }

  // ---- size ------------------------------------------------------------------

  var W = 0, H = 0, dpr = 1;

  function resize() {
    var r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, r.width);
    H = Math.max(1, r.height);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    draw();
  }

  // ---- orientation -----------------------------------------------------------

  var yaw = -0.3, pitch = 0.5;       // current rotation (radians)
  var vYaw = 0, vPitch = 0;          // drag inertia
  var AUTO = 0.0042;                 // idle spin per frame
  var dragging = false, lastX = 0, lastY = 0;

  function project(p) {
    var cyw = Math.cos(yaw), syw = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    // tilt about the long (x) axis first, then spin about the vertical axis
    var y1 = p.y * cp - p.z * sp;
    var z1 = p.y * sp + p.z * cp;
    var x2 = p.x * cyw + z1 * syw;
    var z2 = -p.x * syw + z1 * cyw;
    var k = CAMERA / (CAMERA - z2);
    var scale = Math.min(W / SPAN, H / (SPAN * 0.62));
    return { x: W / 2 + x2 * scale * k, y: H / 2 - y1 * scale * k, z: z2, s: scale * k };
  }

  // ---- drawing ---------------------------------------------------------------

  function fog(color, z) {
    // atoms further from the viewer fade slightly toward the page background
    var t = Math.max(0, Math.min(0.55, (-z + 1) * 0.085));
    return mix(color, palette.bg, t);
  }

  function drawAtom(p, q) {
    var r = RADIUS[p.el] * q.s;
    var base = fog(palette[p.el], q.z);
    var g = ctx.createRadialGradient(q.x - r * 0.35, q.y - r * 0.4, r * 0.08, q.x, q.y, r);
    g.addColorStop(0, css(mix(base, [255, 255, 255], 0.5)));
    g.addColorStop(0.55, css(base));
    g.addColorStop(1, css(mix(base, [0, 0, 0], 0.28)));
    ctx.beginPath();
    ctx.arc(q.x, q.y, r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
  }

  function drawBond(b, proj) {
    var a = proj[b[0]], c = proj[b[1]];
    var dx = c.x - a.x, dy = c.y - a.y;
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    var nx = -dy / len, ny = dx / len;
    var s = (a.s + c.s) / 2;
    var width = Math.max(1.2, s * 0.15);
    var offsets = b[2] === 2 ? [-width * 0.95, width * 0.95] : [0];
    var mx = (a.x + c.x) / 2, my = (a.y + c.y) / 2;
    var colA = fog(mix(palette[pts[b[0]].el], palette.bg, 0.12), a.z);
    var colC = fog(mix(palette[pts[b[1]].el], palette.bg, 0.12), c.z);

    ctx.lineCap = 'round';
    ctx.lineWidth = b[2] === 2 ? width * 0.8 : width;
    offsets.forEach(function (o) {
      // each half of the bond takes the colour of the atom it touches
      ctx.beginPath();
      ctx.moveTo(a.x + nx * o, a.y + ny * o);
      ctx.lineTo(mx + nx * o, my + ny * o);
      ctx.strokeStyle = css(colA);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mx + nx * o, my + ny * o);
      ctx.lineTo(c.x + nx * o, c.y + ny * o);
      ctx.strokeStyle = css(colC);
      ctx.stroke();
    });
  }

  function draw() {
    if (!W) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    var proj = pts.map(project);
    var items = [];
    pts.forEach(function (p, i) { items.push({ z: proj[i].z, atom: i }); });
    BONDS.forEach(function (b) {
      // nudge bonds just behind their atoms so the spheres cap the sticks
      items.push({ z: (proj[b[0]].z + proj[b[1]].z) / 2 - 0.05, bond: b });
    });
    items.sort(function (m, n) { return m.z - n.z; });
    items.forEach(function (it) {
      if (it.bond) drawBond(it.bond, proj);
      else drawAtom(pts[it.atom], proj[it.atom]);
    });
  }

  // ---- animation loop --------------------------------------------------------

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var visible = true, raf = null;

  function tick() {
    raf = null;
    if (!dragging) {
      yaw += vYaw + (reduceMotion ? 0 : AUTO);
      pitch += vPitch;
      vYaw *= 0.94;
      vPitch *= 0.94;
    }
    pitch = Math.max(-1.35, Math.min(1.35, pitch));
    draw();
    var coasting = Math.abs(vYaw) > 0.0002 || Math.abs(vPitch) > 0.0002;
    if (visible && !document.hidden && (!reduceMotion || dragging || coasting)) schedule();
  }
  function schedule() {
    if (raf == null) raf = requestAnimationFrame(tick);
  }

  // ---- interaction -----------------------------------------------------------

  canvas.addEventListener('pointerdown', function (e) {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    vYaw = vPitch = 0;
    canvas.classList.add('is-dragging');
    try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
    schedule();
  });
  canvas.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - lastX, dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    vYaw = dx * 0.008;
    vPitch = dy * 0.008;
    yaw += vYaw;
    pitch += vPitch;
  });
  function release() {
    dragging = false;
    canvas.classList.remove('is-dragging');
    schedule();
  }
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);

  // ---- lifecycle -------------------------------------------------------------

  readPalette();
  resize();

  if (window.ResizeObserver) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize', resize);

  if (window.IntersectionObserver) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) schedule();
    }).observe(canvas);
  }
  document.addEventListener('visibilitychange', function () { if (!document.hidden) schedule(); });

  if (window.MutationObserver) {
    new MutationObserver(function () { readPalette(); draw(); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  schedule();
  }

  // one drawing per <canvas data-scene="molecule">
  Array.prototype.forEach.call(document.querySelectorAll('canvas[data-scene="molecule"]'), init);
})();
