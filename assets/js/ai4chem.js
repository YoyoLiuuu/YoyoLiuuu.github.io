(function() {
  var root = document.getElementById('ai4chem');
  if (!root) return;

  // ---- data ----------------------------------------------------------------

  var ICONS = {
    repr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="12" x2="5" y2="6.5"/><line x1="12" y1="12" x2="19" y2="6.5"/><line x1="12" y1="12" x2="12" y2="20"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/><circle cx="5" cy="6.5" r="2.2" fill="currentColor" stroke="none"/><circle cx="19" cy="6.5" r="2.2" fill="currentColor" stroke="none"/><circle cx="12" cy="20" r="2.2" fill="currentColor" stroke="none"/></svg>',
    reason: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 18.5L20.5 4.5" stroke-dasharray="2 2.5" opacity=".55"/><polyline points="3.5,18.5 9,8.5 14.5,14 20.5,4.5"/><circle cx="3.5" cy="18.5" r="2" fill="currentColor" stroke="none"/><circle cx="9" cy="8.5" r="2" fill="currentColor" stroke="none"/><circle cx="14.5" cy="14" r="2" fill="currentColor" stroke="none"/><circle cx="20.5" cy="4.5" r="2" fill="currentColor" stroke="none"/></svg>',
    lang: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3.5h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9.5L5 20.5v-4H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z"/><polygon points="12,6.2 15.3,8.1 15.3,11.9 12,13.8 8.7,11.9 8.7,8.1"/></svg>',
    lab: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2.5h6"/><path d="M10 2.5v6.2L4.6 18a2 2 0 0 0 1.7 3h11.4a2 2 0 0 0 1.7-3L14 8.7V2.5"/><path d="M7.2 15h9.6"/><circle cx="10.5" cy="17.8" r=".9" fill="currentColor" stroke="none"/><circle cx="13.6" cy="18.9" r=".7" fill="currentColor" stroke="none"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5l8 3v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10v-6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>'
  };

  // Tree items are either a string or [text, [children]].
  var NODES = [
    {
      id: 'repr', num: 1, size: 60,
      color: '#6c5ce7', soft: 'rgba(108, 92, 231, 0.2)',
      label: 'Molecular representation', scale: 'molecule · in silico',
      title: 'Machine learning with molecular representation',
      sub: 'How to best represent molecules, and design methods around that representation.',
      tree: [
        ['Are there better ways to represent molecules?', [
          'Do representations such as SMILES, SELFIES, or GNNs encode enough geometric information?',
          'Can we better design molecular representation in 3D space, or abstract it into latent reasoning?'
        ]],
        ['Can molecular learning be inherent and more “natural”?', [
          ['Could we directly “gradient descent” on molecular representation?', [
            'Instead of converting strings to tokens to numerical values in a loss function, could molecules be continuous landscapes or manifolds that we learn in directly?'
          ]],
          'Could GPU / hardware be designed for better molecular representation?',
          'Could statistical methods be developed to predict molecular dynamics over long ranges of time?'
        ]],
        'Can we design networks with high inductive bias that are still generalizable (train on small amounts of data, but have it work for a large number of use cases)?'
      ]
    },
    {
      id: 'reason', num: 2, size: 72,
      color: '#4f7fe0', soft: 'rgba(79, 127, 224, 0.2)',
      label: 'Reasoning in molecule space', scale: 'reactions · in silico',
      title: 'Reasoning within molecule space',
      sub: 'What it even means to “reason” over molecules, and which model families can do it.',
      tree: [
        ['How do we “reason” with molecules?', [
          'Would it be a reaction trajectory encoded in a graph, or something more abstract, like a latent space?'
        ]],
        'Could we leverage ideas from world models and robotics, where 3D models are also built to encode physical laws?',
        'Can molecular representation interact with reasoning to self-improve?',
        ['Can we reason with diffusion models, or other model families?', [
          'I learnt about Kan extension transformers at ICML, I’d like to look into how they work and whether they apply here.'
        ]],
        'Scaling laws in molecular space, and ways to encode inductive bias in large models.'
      ]
    },
    {
      id: 'lang', num: 3, size: 84,
      color: '#2ea0c4', soft: 'rgba(46, 160, 196, 0.2)',
      label: 'Language meets geometry', scale: 'LLMs · agents',
      title: 'Connect language reasoning with geometry and molecular space',
      sub: 'Language models and agents that act on molecular structure, not just talk about it.',
      tree: [
        ['Leverage LLMs or agentic AI to help guide reasoning.', [
          'Have language models do the “action” on molecular representation: modify functional groups, compare homologous structures, and so on.',
          'This could run as a feedback loop between the language side and the molecular side.'
        ]],
        'Methods from language learning (for instance recent work on token truncation), and how they could be applied to chemistry.'
      ]
    },
    {
      id: 'lab', num: 4, size: 96,
      color: '#00b894', soft: 'rgba(0, 184, 148, 0.2)',
      label: 'Agents in the lab', scale: 'self-driving lab · physical',
      title: 'Agentic systems connecting language, geometry and experimental feedback',
      sub: 'Where the loop closes on real experiments, and where reliability stops being optional.',
      tree: [
        ['When experimental feedback is provided, can agents reason better about molecular structure or reaction planning?', [
          'How could an agent make reliable hypotheses, design experiments, and self-improve from the results of physical experiments?'
        ]],
        ['How do agents actually work, and how do we make them reliable for chemistry? We don’t want one confidently mixing water and sodium.', [
          'How does decision making in an agentic system (i.e. tool calls) work? Does current confidence calibration hold up for scientific discovery?',
          'Could we design an agent system better suited to real-life adoption in laboratory settings?'
        ]],
        'Are different LLMs inherently different, and does multi-agent collaboration improve chemistry?'
      ]
    }
  ];

  // Safety layers sit under the node row and span the nodes they cover.
  var LAYERS = [
    {
      id: 'model-safety', type: 'layer', covers: ['repr', 'reason', 'lang', 'lab'],
      color: '#e17055', soft: 'rgba(225, 112, 85, 0.26)', bg: 'rgba(225, 112, 85, 0.08)', bgHover: 'rgba(225, 112, 85, 0.16)',
      label: 'Model safety', short: 'Model safety',
      title: 'Model safety',
      sub: 'Decision making, reasoning, interpretability, and confidence calibration. Can we trust what the model is doing before it acts?',
      tree: [
        ['How does decision making inside an agentic system actually work?', [
          'What makes a model pick one tool call, one hypothesis, or one next experiment over another. Is the stated reasoning the real reason?',
          'Can we intervene on that process directly, rather than only filtering its outputs?'
        ]],
        ['Does confidence calibration built for benchmarks hold up for scientific discovery?', [
          'Trajectory-level confidence signals, not just token probabilities: can an agent tell when it is out of its depth?',
          'When should an agent abstain, ask for help, or escalate instead of acting?'
        ]],
        ['Interpretability for chemistry models.', [
          'What have molecular representations and reasoning models actually learned about chemistry, and can we check it against what we already know?',
          'Can we tell a model that generalizes from one that memorized the benchmark?'
        ]],
        'How much of a model’s reliability lives in the model, and how much in the harness around it? Which of that transfers when we move a model between harnesses?'
      ]
    },
    {
      id: 'lab-safety', type: 'layer', covers: ['lang', 'lab'],
      color: '#d63031', soft: 'rgba(214, 48, 49, 0.24)', bg: 'rgba(214, 48, 49, 0.07)', bgHover: 'rgba(214, 48, 49, 0.14)',
      label: 'Lab-in-the-loop safety', short: 'Lab guardrails',
      title: 'Lab-in-the-loop safety',
      sub: 'The guardrails that let an agent run experiments autonomously without a catastrophic mistake.',
      tree: [
        ['What guardrails does an agent need to be autonomous in a lab without catastrophic failures?', [
          'Which actions must be validated, permission-scoped, or simulated before they touch real equipment or reagents?',
          'Can safety constraints (chemical incompatibilities, reagent and temperature limits) be part of planning itself, rather than a filter bolted on afterwards?'
        ]],
        ['Where does the human sit in the loop (approver, monitor, or override) and how should that shift as trust in the agent builds?', [
          'How do we keep a human able to understand and intervene, without giving up the speed that made the lab autonomous in the first place?'
        ]],
        ['How does an agent notice an experiment going wrong, and recover safely?', [
          'From its own uncertainty, from instrument feedback, or both?',
          'What does a safe fallback look like when a run is aborted part-way through?'
        ]],
        'What does a reliability evaluation for a self-driving lab look like, and how do we know an agent is ready for real-world adoption?'
      ]
    }
  ];

  var EDGES = [
    { from: 'repr', to: 'reason', kind: 'flow', label: 'Representations are what reasoning operates on' },
    { from: 'reason', to: 'lang', kind: 'flow', label: 'Language models guide, and act on, the reasoning' },
    { from: 'lang', to: 'lab', kind: 'flow', label: 'Agents carry the reasoning into a physical lab' },
    { from: 'reason', to: 'repr', kind: 'loop', label: 'Reasoning and representation self-improve together' },
    { from: 'lab', to: 'lang', kind: 'loop', label: 'Lab results correct what the agent believes' },
    { from: 'lab', to: 'repr', kind: 'loop', label: 'Experimental feedback flows all the way back to representation' }
  ];

  NODES.forEach(function(n) { n.type = 'node'; });
  var ITEMS = NODES.concat(LAYERS);
  var byId = {};
  ITEMS.forEach(function(it) { byId[it.id] = it; });

  // ---- helpers ---------------------------------------------------------------

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function svgEl(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
  }

  function renderTree(items) {
    var ul = el('ul');
    items.forEach(function(item) {
      var li = el('li');
      var text = typeof item === 'string' ? item : item[0];
      li.appendChild(el('span', 'ai4chem__q', text));
      if (typeof item !== 'string' && item[1] && item[1].length) {
        li.appendChild(renderTree(item[1]));
      }
      ul.appendChild(li);
    });
    return ul;
  }

  function edgesOf(id) {
    return EDGES.filter(function(e) { return e.from === id || e.to === id; });
  }

  // ---- build DOM -------------------------------------------------------------

  root.innerHTML = '';

  var header = el('div', 'ai4chem__header');
  header.appendChild(el('div', 'ai4chem__eyebrow', 'Interactive · click a node or a safety layer, hover an edge'));
  header.appendChild(el('div', 'ai4chem__title', 'Where AI for chemistry is headed + where I want to work'));
  header.appendChild(el('div', 'ai4chem__sub', 'From “fundamental” chemistry on the left to agentic, cross-discipline work on the right. Each layer feeds the next, feedback runs back the other way, and two safety layers run underneath: one for the model, one for the lab.'));
  root.appendChild(header);

  var stage = el('div', 'ai4chem__stage');
  var svg = svgEl('svg');
  svg.setAttribute('class', 'ai4chem__edges');
  svg.setAttribute('aria-hidden', 'true');
  var defs = svgEl('defs');
  svg.appendChild(defs);

  function addMarker(id, color) {
    var m = svgEl('marker');
    m.setAttribute('id', 'ai4-arrow-' + id);
    m.setAttribute('viewBox', '0 0 10 10');
    m.setAttribute('refX', '8');
    m.setAttribute('refY', '5');
    m.setAttribute('markerWidth', '7');
    m.setAttribute('markerHeight', '7');
    m.setAttribute('orient', 'auto');
    var p = svgEl('path');
    p.setAttribute('d', 'M0 0L10 5L0 10z');
    p.setAttribute('fill', color);
    m.appendChild(p);
    defs.appendChild(m);
  }
  addMarker('muted', '#cfd4da');
  NODES.forEach(function(n) { addMarker(n.id, n.color); });

  EDGES.forEach(function(e) {
    e.path = svgEl('path');
    e.path.setAttribute('class', 'ai4chem__edge ai4chem__edge--' + e.kind);
    e.path.setAttribute('marker-end', 'url(#ai4-arrow-muted)');
    e.hit = svgEl('path');
    e.hit.setAttribute('class', 'ai4chem__hit');
    svg.appendChild(e.path);
  });
  // Hit paths go on top so they receive pointer events over the visible edges.
  EDGES.forEach(function(e) { svg.appendChild(e.hit); });
  stage.appendChild(svg);

  var nodesRow = el('div', 'ai4chem__nodes');
  NODES.forEach(function(n) {
    var b = el('button', 'ai4chem__node');
    b.type = 'button';
    b.setAttribute('data-node', n.id);
    b.setAttribute('aria-pressed', 'false');
    b.style.setProperty('--c', n.color);
    b.style.setProperty('--c-soft', n.soft);
    b.style.setProperty('--size', n.size + 'px');
    var wrap = el('span', 'ai4chem__discwrap');
    n.disc = el('span', 'ai4chem__disc', ICONS[n.id]);
    wrap.appendChild(n.disc);
    b.appendChild(wrap);
    b.appendChild(el('span', 'ai4chem__label', n.label + '<span class="ai4chem__scale">' + n.scale + '</span>'));
    n.btn = b;
    nodesRow.appendChild(b);
  });
  stage.appendChild(nodesRow);

  var layersRow = el('div', 'ai4chem__layers');
  LAYERS.forEach(function(l) {
    var b = el('button', 'ai4chem__layer');
    b.type = 'button';
    b.setAttribute('data-layer', l.id);
    b.setAttribute('aria-pressed', 'false');
    b.style.setProperty('--c', l.color);
    b.style.setProperty('--c-soft', l.soft);
    b.style.setProperty('--c-bg', l.bg);
    b.style.setProperty('--c-bg-hover', l.bgHover);
    b.innerHTML = ICONS.shield + '<span class="ai4chem__layer-full">' + l.label + '</span><span class="ai4chem__layer-short">' + l.short + '</span>';
    l.btn = b;
    layersRow.appendChild(b);
  });
  stage.appendChild(layersRow);

  var tip = el('div', 'ai4chem__tip');
  stage.appendChild(tip);
  root.appendChild(stage);

  var axis = el('div', 'ai4chem__axis');
  axis.appendChild(el('span', null, '“Fundamental” chemistry'));
  axis.appendChild(el('span', 'ai4chem__legend', '<span><i></i>flows into</span><span><i class="dash"></i>feeds back</span>'));
  axis.appendChild(el('span', null, 'Agentic · cross-discipline'));
  root.appendChild(axis);

  var detail = el('div', 'ai4chem__detail');
  detail.setAttribute('aria-live', 'polite');
  root.appendChild(detail);

  // ---- edge geometry ---------------------------------------------------------

  function draw() {
    var sr = stage.getBoundingClientRect();
    if (!sr.width) return;
    var pos = {};
    NODES.forEach(function(n) {
      var r = n.disc.getBoundingClientRect();
      pos[n.id] = {
        x: r.left - sr.left + r.width / 2,
        y: r.top - sr.top + r.height / 2,
        r: r.width / 2
      };
    });
    svg.setAttribute('viewBox', '0 0 ' + sr.width + ' ' + sr.height);

    EDGES.forEach(function(e) {
      var a = pos[e.from], b = pos[e.to], d;
      if (e.kind === 'flow') {
        d = 'M' + (a.x + a.r + 4) + ' ' + a.y + ' L' + (b.x - b.r - 7) + ' ' + b.y;
      } else {
        // Feedback arcs run over the top; endpoints are nudged toward each other
        // so several arcs landing on one node don't stack on the same point.
        var dist = Math.abs(a.x - b.x);
        var lift = Math.min(Math.max(dist * 0.22, 30), 110) + 14;
        var nudge = dist > 400 ? 0.15 : 0.45;
        var sx = a.x - a.r * nudge, sy = a.y - a.r * 0.9 - 3;
        var tx = b.x + b.r * nudge, ty = b.y - b.r * 0.9 - 7;
        var cx = (sx + tx) / 2, cy = Math.min(sy, ty) - lift;
        d = 'M' + sx + ' ' + sy + ' Q' + cx + ' ' + cy + ' ' + tx + ' ' + ty;
      }
      e.path.setAttribute('d', d);
      e.hit.setAttribute('d', d);
    });

    var off = layersRow.getBoundingClientRect().left - sr.left;
    LAYERS.forEach(function(l) {
      var first = pos[l.covers[0]], last = pos[l.covers[l.covers.length - 1]];
      var left = first.x - first.r, right = last.x + last.r;
      l.btn.style.marginLeft = (left - off) + 'px';
      l.btn.style.width = (right - left) + 'px';
    });
  }

  // ---- state -----------------------------------------------------------------

  var activeId = null;

  function paintEdges(id) {
    EDGES.forEach(function(e) {
      var on = id && (e.from === id || e.to === id);
      e.path.classList.toggle('is-on', !!on);
      e.path.classList.toggle('is-dim', !!id && !on);
      var color = on ? byId[e.from].color : '#cfd4da';
      e.path.style.stroke = color;
      e.path.setAttribute('marker-end', 'url(#ai4-arrow-' + (on ? e.from : 'muted') + ')');
    });
  }

  function applyCoverage(layer) {
    nodesRow.classList.toggle('has-layer', !!layer);
    nodesRow.style.setProperty('--lc-soft', layer ? layer.soft : 'transparent');
    NODES.forEach(function(n) {
      n.btn.classList.toggle('is-covered', !!layer && layer.covers.indexOf(n.id) !== -1);
    });
  }

  // Re-apply the visuals for whatever is currently selected (after a hover ends).
  function restore() {
    var it = byId[activeId];
    if (it && it.type === 'layer') { applyCoverage(it); paintEdges(null); }
    else { applyCoverage(null); paintEdges(activeId); }
  }

  function chip(color, arrow, label, sub, targetId) {
    var c = el('button', 'ai4chem__chip');
    c.type = 'button';
    c.style.setProperty('--chip', color);
    c.innerHTML = '<b>' + arrow + ' ' + label + '</b>' + (sub ? '<span>' + sub + '</span>' : '');
    c.addEventListener('click', function() { select(targetId, true); });
    return c;
  }

  function chipGroup(heading) {
    var g = el('div', 'ai4chem__conn');
    g.appendChild(el('div', 'ai4chem__conn-h', heading));
    var chips = el('div', 'ai4chem__chips');
    g.appendChild(chips);
    g.chips = chips;
    return g;
  }

  function renderDetail(n) {
    detail.innerHTML = '';
    detail.style.setProperty('--c', n.color);
    detail.style.setProperty('--c-soft', n.soft);

    var head = el('div', 'ai4chem__dhead');
    head.appendChild(el('span', 'ai4chem__dnum' + (n.type === 'layer' ? ' ai4chem__dnum--shield' : ''), n.type === 'layer' ? ICONS.shield : String(n.num)));
    var ht = el('div');
    ht.appendChild(el('div', 'ai4chem__dtitle', n.title));
    ht.appendChild(el('div', 'ai4chem__dsub', n.sub));
    head.appendChild(ht);
    detail.appendChild(head);

    var tree = renderTree(n.tree);
    tree.className = 'ai4chem__tree';
    detail.appendChild(tree);

    if (n.type === 'layer') {
      var covers = chipGroup('Covers');
      n.covers.forEach(function(id) {
        var node = byId[id];
        covers.chips.appendChild(chip(node.color, String(node.num), node.label, null, id));
      });
      detail.appendChild(covers);
    } else {
      var conn = chipGroup('Connected to');
      edgesOf(n.id).forEach(function(e) {
        var outgoing = e.from === n.id;
        var other = byId[outgoing ? e.to : e.from];
        var arrow = outgoing ? (e.kind === 'loop' ? '↺' : '→') : (e.kind === 'loop' ? '↻' : '←');
        conn.chips.appendChild(chip(other.color, arrow, other.label, e.label, other.id));
      });
      detail.appendChild(conn);

      var safety = chipGroup('Safety layers');
      LAYERS.forEach(function(l) {
        if (l.covers.indexOf(n.id) === -1) return;
        safety.chips.appendChild(chip(l.color, ICONS.shield, l.label, l.sub, l.id));
      });
      detail.appendChild(safety);
    }

    var idx = ITEMS.indexOf(n);
    var nav = el('div', 'ai4chem__nav');
    var prev = el('button', 'ai4chem__navbtn', idx > 0 ? '← ' + ITEMS[idx - 1].label : '');
    var next = el('button', 'ai4chem__navbtn', idx < ITEMS.length - 1 ? ITEMS[idx + 1].label + ' →' : '');
    prev.type = next.type = 'button';
    prev.disabled = idx === 0;
    next.disabled = idx === ITEMS.length - 1;
    prev.addEventListener('click', function() { select(ITEMS[idx - 1].id, true); });
    next.addEventListener('click', function() { select(ITEMS[idx + 1].id, true); });
    nav.appendChild(prev);
    nav.appendChild(next);
    detail.appendChild(nav);
  }

  function select(id, focus) {
    if (id === activeId) return;
    activeId = id;
    ITEMS.forEach(function(it) {
      var on = it.id === id;
      it.btn.classList.toggle('is-active', on);
      it.btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    restore();
    detail.classList.add('is-swapping');
    renderDetail(byId[id]);
    // Force a reflow so the fade-in restarts.
    void detail.offsetWidth;
    detail.classList.remove('is-swapping');
    if (focus) byId[id].btn.focus({ preventScroll: true });
  }

  // ---- events ----------------------------------------------------------------

  ITEMS.forEach(function(it, i) {
    it.btn.addEventListener('click', function() { select(it.id); });
    it.btn.addEventListener('mouseenter', function() {
      if (it.type === 'layer') { applyCoverage(it); paintEdges(null); }
      else paintEdges(it.id);
    });
    it.btn.addEventListener('mouseleave', restore);
    it.btn.addEventListener('keydown', function(ev) {
      if (ev.key === 'ArrowRight' && i < ITEMS.length - 1) { ev.preventDefault(); select(ITEMS[i + 1].id, true); }
      if (ev.key === 'ArrowLeft' && i > 0) { ev.preventDefault(); select(ITEMS[i - 1].id, true); }
    });
  });

  EDGES.forEach(function(e) {
    e.hit.addEventListener('mouseenter', function() {
      var len = e.path.getTotalLength();
      var mid = e.path.getPointAtLength(len / 2);
      tip.textContent = e.label;
      tip.style.left = mid.x + 'px';
      tip.style.top = (mid.y - 6) + 'px';
      tip.classList.add('is-visible');
      e.path.classList.add('is-hover');
      e.path.style.stroke = byId[e.from].color;
      e.path.setAttribute('marker-end', 'url(#ai4-arrow-' + e.from + ')');
    });
    e.hit.addEventListener('mouseleave', function() {
      tip.classList.remove('is-visible');
      e.path.classList.remove('is-hover');
      restore();
    });
  });

  var raf = null;
  function scheduleDraw() {
    if (raf) return;
    raf = requestAnimationFrame(function() { raf = null; draw(); });
  }
  window.addEventListener('resize', scheduleDraw);
  if (window.ResizeObserver) new ResizeObserver(scheduleDraw).observe(stage);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleDraw);

  draw();
  select('repr');
})();
