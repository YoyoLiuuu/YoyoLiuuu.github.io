// Small canvas drawings that open when a roadmap box is clicked on the homepage.
// Each <canvas data-scene="name"> gets the scene of that name:
//   latent  paths through latent space settling into clusters      (Reasoning)
//   loop    design - make - test - analyze, with a human gate       (Agents)
//   gate    actions checked before they reach the lab               (checks before acting)
//   lens    a probe that reveals hidden structure                   (Understand)
//   edit    molecular edits tried and scored                        (Improve)
// The molecule and trajectory drawings live in molecule.js / trajectory.js.
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TAU = Math.PI * 2;
  var STOPS = ['#7a2a6c', '#c2185b', '#e0527f']; // the site's three "built" colours

  // deterministic random numbers, so a drawing looks the same on every visit
  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function ease(k) { return 1 - Math.pow(1 - Math.max(0, Math.min(1, k)), 3); }

  function readColors() {
    var s = getComputedStyle(document.documentElement);
    function v(name, fallback) { return s.getPropertyValue(name).trim() || fallback; }
    return {
      ink: v('--ink-2', '#41464d'), muted: v('--muted', '#646b73'), edge: v('--edge', '#cbcfd5'),
      border: v('--border', '#e6e3dd'), accent: v('--accent', '#c2185b'), live: v('--ok', '#7a2a6c'),
      flag: v('--warn', '#c98509'), bg: v('--surface', '#ffffff')
    };
  }

  function text(env, str, x, y, color, align) {
    var ctx = env.ctx;
    ctx.font = '500 ' + (env.W < 380 ? 10 : 11.5) + 'px "IBM Plex Mono", ui-monospace, Menlo, monospace';
    ctx.textAlign = align || 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(str, x, y);
  }
  function dot(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fillStyle = color;
    ctx.fill();
  }

  // ---- latent: reasoning paths that end up near each other -------------------

  function latent(env) {
    var rand = rng(7);
    var centers = [{ x: 0.7, y: 0.26 }, { x: 0.78, y: 0.72 }, { x: 0.4, y: 0.6 }];
    var paths = [];
    for (var i = 0; i < 12; i++) {
      var k = i % 3;
      paths.push({
        k: k,
        from: { x: 0.06 + rand() * 0.2, y: 0.1 + rand() * 0.8 },
        via: { x: 0.25 + rand() * 0.4, y: 0.05 + rand() * 0.9 },
        to: { x: centers[k].x + (rand() - 0.5) * 0.11, y: centers[k].y + (rand() - 0.5) * 0.16 },
        delay: rand() * 5
      });
    }
    function at(p, u) {
      var a = (1 - u) * (1 - u), b = 2 * (1 - u) * u, c = u * u;
      return { x: (a * p.from.x + b * p.via.x + c * p.to.x) * env.W, y: (a * p.from.y + b * p.via.y + c * p.to.y) * env.H };
    }
    return function (t) {
      var ctx = env.ctx, W = env.W, H = env.H;
      centers.forEach(function (c, k) {
        ctx.globalAlpha = 0.1;
        dot(ctx, c.x * W, c.y * H, Math.min(W, H) * 0.17, STOPS[k]);
        ctx.globalAlpha = 1;
      });
      paths.forEach(function (p) {
        var phase = reduceMotion ? 1 : ((t + p.delay) % 5) / 3.2;   // 3.2 s travelling, then rest
        var u = ease(phase);
        ctx.beginPath();
        for (var s = 0; s <= 24; s++) {
          var q = at(p, u * s / 24);
          if (s === 0) ctx.moveTo(q.x, q.y); else ctx.lineTo(q.x, q.y);
        }
        ctx.strokeStyle = STOPS[p.k];
        ctx.globalAlpha = 0.45;
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.globalAlpha = 1;
        var start = at(p, 0), head = at(p, u);
        dot(ctx, start.x, start.y, 2.2, env.c.edge);
        dot(ctx, head.x, head.y, phase >= 1 ? 4.2 : 3.4, STOPS[p.k]);
      });
      text(env, 'different questions', W * 0.16, H * 0.05, env.c.muted);
      text(env, 'similar chemistry, nearby', W * 0.72, H * 0.95, env.c.muted);
    };
  }

  // ---- loop: the experiment cycle, with the agent's half and a human gate -----

  function loop(env) {
    var names = ['Design', 'Make', 'Test', 'Analyze'];
    var angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]; // top, right, bottom, left
    return function (t) {
      var ctx = env.ctx, W = env.W, H = env.H, c = env.c;
      var cx = W / 2, cy = H / 2, R = Math.min(W * 0.3, H * 0.33);
      var a = reduceMotion ? -Math.PI * 0.72 : (t * 0.75) % TAU - Math.PI / 2; // token angle, clockwise from the top

      // whole cycle
      ctx.lineWidth = 2;
      ctx.strokeStyle = c.edge;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();

      // the agent's half: Analyze -> Design
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = STOPS[2];
      ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI, Math.PI * 1.5); ctx.stroke();
      text(env, 'agent', cx - R * 0.98, cy - R * 0.98, STOPS[2]);
      text(env, 'robots', cx + R * 1.02, cy + R * 0.98, c.muted);

      // human approval, between Design and Make
      var g = -Math.PI / 4;
      var norm = function (x) { return ((x % TAU) + TAU) % TAU; };
      var near = Math.abs(norm(a - g + Math.PI) - Math.PI) < 0.32;
      var gx = cx + Math.cos(g) * R, gy = cy + Math.sin(g) * R;
      ctx.lineWidth = 3;
      ctx.strokeStyle = near ? c.live : c.ink;
      ctx.beginPath();
      ctx.moveTo(gx - Math.cos(g) * 9, gy - Math.sin(g) * 9);
      ctx.lineTo(gx + Math.cos(g) * 9, gy + Math.sin(g) * 9);
      ctx.stroke();
      text(env, near ? 'approved' : 'human approval', gx + 12, gy - 16, near ? c.live : c.muted, 'left');

      // stations
      names.forEach(function (name, i) {
        var x = cx + Math.cos(angles[i]) * R, y = cy + Math.sin(angles[i]) * R;
        dot(ctx, x, y, 7, c.bg);
        ctx.lineWidth = 2;
        ctx.strokeStyle = (i === 0 || i === 3) ? STOPS[2] : c.edge;
        ctx.beginPath(); ctx.arc(x, y, 7, 0, TAU); ctx.stroke();
        var dx = Math.cos(angles[i]), dy = Math.sin(angles[i]);
        text(env, name, x + dx * 18, y + dy * 20, c.ink, dx > 0.5 ? 'left' : (dx < -0.5 ? 'right' : 'center'));
      });

      // the experiment going round
      var tx = cx + Math.cos(a) * R, ty = cy + Math.sin(a) * R;
      ctx.globalAlpha = 0.25;
      dot(ctx, tx, ty, 11, c.accent);
      ctx.globalAlpha = 1;
      dot(ctx, tx, ty, 5.5, c.accent);
    };
  }

  // ---- gate: every action is checked before it reaches the lab ---------------

  function gate(env) {
    var rand = rng(11);
    var plan = [];
    for (var i = 0; i < 40; i++) plan.push({ lane: Math.floor(rand() * 3), risky: rand() < 0.28 });
    var EVERY = 0.42, SPEED = 0.2; // seconds between actions; canvas widths per second
    return function (t) {
      var ctx = env.ctx, W = env.W, H = env.H, c = env.c;
      var gx = W * 0.56, labX = W * 0.86;
      if (reduceMotion) t = 9.3;

      // lanes
      ctx.strokeStyle = c.border;
      ctx.lineWidth = 1;
      [0.3, 0.5, 0.7].forEach(function (y) {
        ctx.beginPath(); ctx.moveTo(W * 0.06, H * y); ctx.lineTo(labX, H * y); ctx.stroke();
      });

      // the check
      ctx.setLineDash([4, 5]);
      ctx.strokeStyle = c.accent;
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(gx, H * 0.14); ctx.lineTo(gx, H * 0.86); ctx.stroke();
      ctx.setLineDash([]);
      text(env, 'check', gx, H * 0.07, c.accent);
      text(env, 'proposed actions', W * 0.2, H * 0.93, c.muted);

      // the lab
      ctx.strokeStyle = c.live;
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(labX, H * 0.2, W * 0.1, H * 0.6, 10); else ctx.rect(labX, H * 0.2, W * 0.1, H * 0.6);
      ctx.stroke();
      text(env, 'lab', labX + W * 0.05, H * 0.5, c.live);

      var first = Math.max(0, Math.floor(t / EVERY) - 16);
      for (var n = first; n <= t / EVERY; n++) {
        var a = plan[n % plan.length];
        var age = t - n * EVERY;
        var x = W * 0.06 + age * SPEED * W;
        var y = H * (0.3 + a.lane * 0.2);
        if (a.risky && x >= gx - 9) {
          // stopped at the check, then cleared away
          var held = (x - (gx - 9)) / (SPEED * W);
          if (held > 1.4) continue;
          ctx.globalAlpha = 1 - held / 1.4;
          dot(ctx, gx - 9, y, 5.5, c.flag);
          ctx.strokeStyle = c.flag;
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(gx - 9, y, 5.5 + held * 9, 0, TAU); ctx.stroke();
          ctx.globalAlpha = 1;
        } else if (x < labX) {
          dot(ctx, x, y, 5, x < gx ? c.edge : c.live);
        }
      }
    };
  }

  // ---- lens: probing for structure a model has learned -----------------------

  function lens(env) {
    var rand = rng(23);
    var centers = [{ x: 0.3, y: 0.34 }, { x: 0.66, y: 0.3 }, { x: 0.52, y: 0.7 }];
    var pts = [];
    for (var i = 0; i < 150; i++) {
      var k = i % 3;
      var r = Math.pow(rand(), 0.7) * 0.3, th = rand() * TAU;
      pts.push({ k: k, x: centers[k].x + Math.cos(th) * r, y: centers[k].y + Math.sin(th) * r * 1.25 });
    }
    return function (t) {
      var ctx = env.ctx, W = env.W, H = env.H, c = env.c;
      var R = Math.min(W, H) * 0.26;
      var lx, ly;
      if (env.pointer) { lx = env.pointer.x * W; ly = env.pointer.y * H; }
      else {
        var s = reduceMotion ? 1.1 : t * 0.45;
        lx = W * (0.5 + 0.3 * Math.sin(s)); ly = H * (0.5 + 0.24 * Math.sin(s * 1.7 + 0.6));
      }
      pts.forEach(function (p) {
        var x = p.x * W, y = p.y * H;
        if (x < 4 || x > W - 4 || y < 4 || y > H - 4) return;
        var seen = (x - lx) * (x - lx) + (y - ly) * (y - ly) < R * R;
        dot(ctx, x, y, seen ? 4 : 2.6, seen ? STOPS[p.k] : c.edge);
      });
      ctx.lineWidth = 2;
      ctx.strokeStyle = c.accent;
      ctx.beginPath(); ctx.arc(lx, ly, R, 0, TAU); ctx.stroke();
      // handle
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(lx + R * 0.72, ly + R * 0.72);
      ctx.lineTo(lx + R * 1.05, ly + R * 1.05);
      ctx.stroke();
      text(env, 'probe', lx, ly - R - 10, c.accent);
    };
  }

  // ---- edit: try molecular edits, keep the one that scores best --------------
  // An illustration only: the bars are made-up scores, not real chemistry.

  function edit(env) {
    var groups = ['H', 'F', 'OH', 'NH\u2082', 'CH\u2083', 'OCH\u2083'];
    var score = [0.26, 0.42, 0.58, 0.5, 0.74, 0.9];
    var BEAT = 1.15;
    return function (t) {
      var ctx = env.ctx, W = env.W, H = env.H, c = env.c;
      var n = groups.length;
      var beat = reduceMotion ? n - 1 : Math.floor(t / BEAT) % (n + 2);   // two beats of rest at the end
      var i = Math.min(beat, n - 1);
      var pop = reduceMotion || beat >= n ? 1 : ease((t % BEAT) / 0.3);

      // the ring being edited
      var cx = W * 0.27, cy = H * 0.5, r = Math.min(W * 0.13, H * 0.2);
      ctx.strokeStyle = c.ink;
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      for (var k = 0; k < 6; k++) {
        var x = cx + Math.cos(k * TAU / 6) * r, y = cy + Math.sin(k * TAU / 6) * r;
        if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, r * 0.58, 0, TAU); ctx.stroke();

      // fixed side, and the position being edited
      ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx - r * 1.6, cy); ctx.stroke();
      ctx.strokeStyle = c.accent;
      ctx.beginPath(); ctx.moveTo(cx + r, cy); ctx.lineTo(cx + r * 1.55, cy); ctx.stroke();
      ctx.font = '600 ' + Math.round(Math.max(13, r * 0.42)) + 'px Inter, sans-serif';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'right';
      ctx.fillStyle = c.ink;
      ctx.fillText('R', cx - r * 1.7, cy);
      ctx.textAlign = 'left';
      ctx.fillStyle = c.accent;
      ctx.globalAlpha = pop;
      ctx.fillText(groups[i], cx + r * 1.65, cy - (1 - pop) * 8);
      ctx.globalAlpha = 1;
      text(env, 'edit', cx + r * 1.3, cy - r * 0.55, c.accent);

      // one bar per candidate tried so far
      var x0 = W * 0.6, x1 = W * 0.93, base = H * 0.78, top = H * 0.2;
      var bw = (x1 - x0) / n * 0.58, best = 0;
      for (var j = 0; j <= i; j++) if (score[j] > score[best]) best = j;
      ctx.strokeStyle = c.border;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x0 - 6, base); ctx.lineTo(x1, base); ctx.stroke();
      for (j = 0; j <= i; j++) {
        var grow = j === i ? pop : 1;
        var bx = x0 + (x1 - x0) * j / n, bh = (base - top) * score[j] * grow;
        ctx.fillStyle = j === best ? c.live : c.edge;
        ctx.globalAlpha = j === i || j === best ? 1 : 0.6;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(bx, base - bh, bw, bh, [4, 4, 0, 0]); else ctx.rect(bx, base - bh, bw, bh);
        ctx.fill();
        ctx.globalAlpha = 1;
        text(env, groups[j], bx + bw / 2, base + 12, j === i ? c.accent : c.muted);
      }
      var bestX = x0 + (x1 - x0) * best / n + bw / 2;
      text(env, 'best so far', bestX, base - (base - top) * score[best] - 12, c.live);
      text(env, 'objective', (x0 + x1) / 2 - 8, H * 0.93, c.muted);
    };
  }

  var SCENES = { latent: latent, loop: loop, gate: gate, lens: lens, edit: edit };

  // ---- driver: size, theme, pointer, and only animate while on screen --------

  function mount(canvas) {
    var make = SCENES[canvas.getAttribute('data-scene')];
    if (!make || !canvas.getContext) return;
    var env = { ctx: canvas.getContext('2d'), W: 1, H: 1, c: readColors(), pointer: null };
    var draw = make(env);
    var dpr = 1, raf = null, visible = false;

    function frame(now) {
      raf = null;
      env.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      env.ctx.clearRect(0, 0, env.W, env.H);
      env.ctx.globalAlpha = 1;
      draw(now / 1000);
      if (visible && !document.hidden && !reduceMotion) raf = requestAnimationFrame(frame);
    }
    function kick() { if (raf == null) raf = requestAnimationFrame(frame); }
    function resize() {
      var r = canvas.getBoundingClientRect();
      if (r.width < 2) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      env.W = r.width; env.H = r.height;
      canvas.width = Math.round(env.W * dpr);
      canvas.height = Math.round(env.H * dpr);
      kick();
    }

    canvas.addEventListener('pointermove', function (e) {
      var r = canvas.getBoundingClientRect();
      env.pointer = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
      if (reduceMotion) kick();
    });
    canvas.addEventListener('pointerleave', function () { env.pointer = null; if (reduceMotion) kick(); });

    if (window.ResizeObserver) new ResizeObserver(resize).observe(canvas);
    else window.addEventListener('resize', resize);
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) kick();
      }).observe(canvas);
    } else { visible = true; }
    document.addEventListener('visibilitychange', function () { if (!document.hidden && visible) kick(); });
    if (window.MutationObserver) {
      new MutationObserver(function () { env.c = readColors(); kick(); })
        .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }
    resize();
  }

  Array.prototype.forEach.call(document.querySelectorAll('canvas[data-scene]'), mount);
})();
