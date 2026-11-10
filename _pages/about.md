---
permalink: /
title: "Hey, I'm Yoyo."
layout: home
author_profile: false
# --- homepage hero (edit freely) ---
hero_title: "Hey, I’m <em>Yoyo</em>."
hero_eyebrow: "Reasoning · Reliability · Safety — AI for science"
hero_lede: "I study machine-learning models and language-model agents in the natural sciences, where mistakes are costly: how they learn from scarce data, whether their reasoning can be checked, and when their decisions can be trusted."
hero_now:
  - "Incoming MATS 12.0 Research Fellow"
  - "ML Research @ Acceleration Consortium"
  - "Applying to PhD programs"
# hero_visual.type is "trajectory" (reasoning steps checked against a validated
# domain) or "molecule" (a rotating 3D model of HBDI). To switch back to the
# molecule, use:
#   type: molecule
#   name: "HBDI"
#   note: "the GFP chromophore, from my time in the Brown Lab"
#   hint: "drag to rotate"
#   alt: "Rotating 3D ball-and-stick model of HBDI, the chromophore of green fluorescent protein"
hero_visual:
  type: trajectory
  name: "Reasoning, checked at every step"
  note: "can a model flag when it leaves its validated domain, before an agent acts?"
  hint: "move your cursor to steer"
  alt: "Animation of reasoning trajectories: steps that stay inside a validated domain end in an action, and a step that leaves it is flagged for verification"
redirect_from:
  - /about/
  - /about.html
---

I work on AI systems for science: how models and agents **reason**, how that reasoning can be **checked**, and when their decisions are **safe to act on**. Chemistry is my test bed, because it offers structure defined independently of the model and experiments that say whether a decision was right.

I'm a Computer Science (Focus in AI and Technology Leadership) student at the **University of Toronto**. I am currently completing my 4th year research project **Unhobble Science: Building a Model-Adaptive Layer in Chemistry Agents**, advised by **Professor Alán Aspuru-Guzik and Professor Varinia Bernales**.

In January 2027, I'll join **MATS** (12.0) as a **Research Fellow** in London, in the Lila Sciences stream (biosecurity track) mentored by **David Peinador Veiga**, working on evaluating and mitigating catastrophic risks from dangerous scientific capabilities in frontier AI.

Since May 2026, I've been an **ML Research Intern at the Acceleration Consortium**, where I built agentic infrastructure for self-driving labs, connecting SDL workflows, agentic capabilities, and human control to close the analyze-design gap. This work became a first-author paper at the **NeurIPS 2026 AI4Mat Workshop**. After the summer, I've continued with AC part-time on reliable agentic reasoning and decision making. 

Before that, I was an **Applied ML Engineer Intern at Shopify** on the Core (Search Relevance) team, a **LLM Research Intern at the National University of Singapore**, and a research student advised by **Professor Anatole von Lilienfeld**. 

I care about making ML useful for scientific problems: not just training models, but designing evaluation pipelines, engineering datasets, and building systems that scale. I got here through science — RNA structure prediction, protein design, and molecular modeling — and that work is why I now care most about the machine-learning questions underneath it.

---

## What I'm working on now

- **Applying to PhD programs** — where I want to take all of this is mapped out [below](#phd-directions).
- **MATS 12.0** (incoming, January 2027) — *biosecurity*: evaluating and mitigating risks from dangerous scientific capabilities in frontier AI, particularly biology, chemistry, and agents connected to physical lab equipment.
- **Unhobble Science** — *building a model-adaptive layer in chemistry agents*: how to unhobble a model and move knowledge between harnesses. What is actually transferable across scaffolds, what is scaffold-specific, and what turns out to be unnecessary altogether?
- **Acceleration Consortium** (part-time) — *reliable agentic reasoning and decision making*: making an agent's reasoning trustworthy enough to act on, so it can recognize a bad plan and escalate rather than run it. This grew out of the SDL infrastructure work, narrowed to the reliability question underneath it.

---

## Where I'm headed {#phd-directions}

In my PhD, I want to study how AI models and agents for science can reason in ways we can check and act in ways we can trust — though I'm open to other ideas and directions. Two directions grow out of my work so far: **safety cheap enough to use**, meaning checks an agent can run before every action, and **reasoning that follows a problem's structure** rather than its surface. There are a few layers where these questions can be tackled, from "fundamental" chemistry to agentic, cross-discipline work, and every layer feeds the others. Click a node to open it; hover an edge to see how two layers connect.

<div id="ai4chem" class="ai4chem">
  <noscript><p style="padding:1em 1.3em">This interactive map needs JavaScript. The short version: molecular representation → reasoning in molecule space → language meets geometry → agents in the lab, with experimental feedback flowing all the way back to the start, and two safety layers underneath: model safety (decision making, reasoning, interpretability, calibration) and lab-in-the-loop guardrails.</p></noscript>
</div>

<script src="/assets/js/ai4chem.js?v=3"></script>

---

## Research interests

- **Agents that are safe to act** — where an agent should sit in an experiment, what authority it holds, and how its decisions are validated and traced; knowing when a model is out of its depth, and what capability actually transfers between harnesses
- **Reasoning that can be checked** — latent reasoning in chemical space, trajectory-based confidence signals, and whether a model's reasoning can flag when it leaves its validated domain
- **What a model should be given** — molecular representations with symmetry built in, reasoning traces as training data, and data-efficient learning when experiments are scarce
- **Where I started** — macromolecule structure prediction and design: 3D folding of ribozymes, tRNA structure prediction, protein inverse design

---

## A bit more about me

Outside the lab, I am the co-president of **UofT Women in Computer Science** (WiCS) and a **Student Ambassador for the Department of Computer Science** at UofT. I founded the **Toronto Ethics in AI Symposium** (TEAS) and served as a **NCWIT Campus Representative**. I also sing, play double bass and make jewelry. I love watching old Sci-Fi movies :D

Feel free to reach out if you're working on AI for science, or if you just want to chat about research.
