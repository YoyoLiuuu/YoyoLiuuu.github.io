---
permalink: /
title: "Hey, I'm Yoyo."
layout: home
author_profile: false
# --- homepage hero (edit freely) ---
hero_title: "Hey, I’m <em>Yoyo</em>."
hero_eyebrow: "ML for science · and when to trust it"
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

I build machine-learning models and agents for chemistry and biology: molecular representations, chemical reasoning in language models, and agents that choose experiments in a real laboratory. The question that work keeps raising, and the one I want to spend my PhD on, is when these systems can be **checked**, **understood**, and **trusted**.

I'm a Computer Science (Focus in AI and Technology Leadership) student at the **University of Toronto**. I am currently completing my 4th year research project **Unhobble Science: Building a Model-Adaptive Layer in Chemistry Agents**, advised by **Professor Alán Aspuru-Guzik and Professor Varinia Bernales**.

In January 2027, I'll join **MATS** (12.0) as a **Research Fellow** in London, in the Lila Sciences stream (biosecurity track) mentored by **David Peinador Veiga**, working on evaluating and mitigating catastrophic risks from dangerous scientific capabilities in frontier AI.

Since May 2026, I've been an **ML Research Intern at the Acceleration Consortium**, where I built agentic infrastructure for self-driving labs, connecting SDL workflows, agentic capabilities, and human control to close the analyze-design gap. This work became a first-author paper at the **NeurIPS 2026 AI4Mat Workshop**. After the summer, I've continued with AC part-time on reliable agentic reasoning and decision making. 

Before that, I was an **Applied ML Engineer Intern at Shopify** on the Core (Search Relevance) team, a **LLM Research Intern at the National University of Singapore**, and a research student advised by **Professor Anatole von Lilienfeld**. 

I care about making ML useful for scientific problems: not just training models, but designing evaluation pipelines, engineering datasets, and building systems that scale. Whether it's fine-tuning LLMs for metabolite pathway reasoning or implementing inverse-folding benchmarks for protein design, I like getting my hands dirty with the full stack of research engineering.

---

## What I'm working on now

- **Applying to PhD programs** — where I want to take all of this is mapped out [below](#phd-directions).
- **MATS 12.0** (incoming, January 2027) — *biosecurity*: evaluating and mitigating risks from dangerous scientific capabilities in frontier AI, particularly biology, chemistry, and agents connected to physical lab equipment.
- **Unhobble Science** — *building a model-adaptive layer in chemistry agents*: how to unhobble a model and move knowledge between harnesses. What is actually transferable across scaffolds, what is scaffold-specific, and what turns out to be unnecessary altogether?
- **Acceleration Consortium** (part-time) — *reliable agentic reasoning and decision making*: making an agent's reasoning trustworthy enough to act on, so it can recognize a bad plan and escalate rather than run it. This grew out of the SDL infrastructure work, narrowed to the reliability question underneath it.

---

## What I've worked on {#research-interests}

- **Representations that build in what the science knows** — symmetric molecular representations for data-efficient learning (von Lilienfeld group), reasoning traces for metabolic pathways ([NeurIPS 2026 WiML](/publications/)), and RNA 3D structure prediction and inverse protein design ([AAAI 2026 UC, RiboFold, BC-Design](/publications/))
- **Reasoning in chemical language models** — latent reasoning in LatentChem ([ICML 2026](/publications/)), and confidence signals that tell a small model when to ask for a hint ([ICML 2026 WiML](/publications/))
- **Agents inside the experiment** — an agent that selects and interprets measurements in a self-driving lab, with every action that changes the lab behind validation and human approval ([NeurIPS 2026 AI4Mat](/publications/))

---

## Where I'm headed {#phd-directions}

Each of those projects left the same kind of question open. Is the structure a model seems to learn real? Does its confidence mean anything? How much of an agent's reliability belongs to the model, and how much to the harness around it?

In my PhD, I want to work on those questions directly: **validation**, **safety**, and **understanding** of models and agents for science — though I'm open to other ideas and directions. Two places I'd start: **safety cheap enough to use**, meaning checks an agent can run before every action, and **reasoning that follows a problem's structure** rather than its surface. Science stays the test bed, because it offers structure defined independently of the model and experiments that say whether a decision was right.

The map below lays out the layers where these questions live, from "fundamental" chemistry to agentic, cross-discipline work, with two safety layers underneath. Click a node to open it; hover an edge to see how two layers connect.

<div id="ai4chem" class="ai4chem">
  <noscript><p style="padding:1em 1.3em">This interactive map needs JavaScript. The short version: molecular representation → reasoning in molecule space → language meets geometry → agents in the lab, with experimental feedback flowing all the way back to the start, and two safety layers underneath: model safety (decision making, reasoning, interpretability, calibration) and lab-in-the-loop guardrails.</p></noscript>
</div>

<script src="/assets/js/ai4chem.js?v=3"></script>

---

## A bit more about me

Outside the lab, I am the co-president of **UofT Women in Computer Science** (WiCS) and a **Student Ambassador for the Department of Computer Science** at UofT. I founded the **Toronto Ethics in AI Symposium** (TEAS) and served as a **NCWIT Campus Representative**. I also sing, play double bass and make jewelry. I love watching old Sci-Fi movies :D

Feel free to reach out if you're working on AI for science, or if you just want to chat about research.
