---
permalink: /
title: "Hey, I'm Yoyo."
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

I'm a Computer Science (Focus in AI and Technology Leadership) and Biological Chemistry student at the **University of Toronto**. I am currently completing my 4th year research project **Unhobble Science: Building a Model-Adaptive Layer in Chemistry Agents**, advised by Professor Alán Aspuru-Guzik and Professor Varinia Bernales.

I recently completed an **ML Research Internship at the Acceleration Consortium**, where I built agentic infrastructure for self-driving labs, connecting SDL workflows, agentic capabilities, and human control to close the analyze-design gap. I continue to work with AC part-time on reliable agentic reasoning and decision making. 

Before that, I was an **Applied ML Engineer Intern at Shopify** on the Core (Search Relevance) team, and a research student advised by Professor Anatole von Lilienfeld. 

I build machine learning systems that work at the intersection of AI and the natural sciences: RNA structure prediction, drug discovery, protein design, cheminformatics, and molecular modeling.

I care about making ML useful for scientific problems: not just training models, but designing evaluation pipelines, engineering datasets, and building systems that scale. Whether it's fine-tuning LLMs for metabolite pathway reasoning or implementing inverse-folding benchmarks for protein design, I like getting my hands dirty with the full stack of research engineering. 

I've been interested in reliability and decision making in agentic systems, reasoning in the chemical space, scientific agents in self-driving labs, and data-efficient learning.

---

## What I'm working on now

- **Applying to PhD programs** — where I want to take all of this is mapped out [below](#phd-directions).
- **Unhobble Science** — *building a model-adaptive layer in chemistry agents*: how to unhobble a model and move knowledge between harnesses. What is actually transferable across scaffolds, what is scaffold-specific, and what turns out to be unnecessary altogether?
- **Acceleration Consortium** (part-time) — *reliable agentic reasoning and decision making*: making an agent's reasoning trustworthy enough to act on, so it can recognize a bad plan and escalate rather than run it. This grew out of the SDL infrastructure work, narrowed to the reliability question underneath it.

---

## Where I'm headed {#phd-directions}

I want to study how we best represent and reason with molecules — and how to do that safely. I'm open to other directions, but I see it as one pathway: from the smallest scale, fully in silico, up to the physical lab, with reliability running underneath every step. That is where AI safety and chemistry meet for me.

<div class="phd-path">
  <div class="phd-axis" aria-hidden="true">
    <div class="phd-axis__bar"></div>
    <div class="phd-axis__nodes">
      <span class="phd-node phd-node--1">1</span>
      <span class="phd-node phd-node--2">2</span>
      <span class="phd-node phd-node--3">3</span>
      <span class="phd-node phd-node--4">4</span>
    </div>
    <div class="phd-axis__labels">
      <span>molecule · fully in silico</span>
      <span>lab · physical experiments</span>
    </div>
  </div>
  <div class="phd-steps">
    <div class="phd-step phd-step--1">
      <div class="phd-step__head">
        <span class="phd-step__num">1</span>
        <div>
          <div class="phd-step__title">Molecular representation</div>
          <span class="phd-step__scale">how a molecule gets written down</span>
        </div>
        <i class="fas fa-atom" aria-hidden="true"></i>
      </div>
      <ul>
        <li>Do SMILES, SELFIES, and GNNs actually carry enough geometry?</li>
        <li>Could we treat molecules as continuous landscapes and descend on them directly, instead of tokenizing strings into a loss function?</li>
        <li>Networks with strong inductive bias that still generalize from very little data</li>
      </ul>
    </div>
    <div class="phd-step phd-step--2">
      <div class="phd-step__head">
        <span class="phd-step__num">2</span>
        <div>
          <div class="phd-step__title">Reasoning in molecule space</div>
          <span class="phd-step__scale">how reactions and structure get thought about</span>
        </div>
        <i class="fas fa-diagram-project" aria-hidden="true"></i>
      </div>
      <ul>
        <li>What does reasoning over molecules look like — a reaction trajectory on a graph, or something latent?</li>
        <li>Borrowing from world models and robotics, where 3D models are built to encode physical law</li>
        <li>Representation and reasoning that improve each other, plus scaling laws in molecular space</li>
      </ul>
    </div>
    <div class="phd-step phd-step--3">
      <div class="phd-step__head">
        <span class="phd-step__num">3</span>
        <div>
          <div class="phd-step__title">Language meets geometry</div>
          <span class="phd-step__scale">LLMs and agents acting on structure</span>
        </div>
        <i class="fas fa-language" aria-hidden="true"></i>
      </div>
      <ul>
        <li>Language models that act on molecules — edit functional groups, compare homologous structures — in a feedback loop</li>
        <li>Do methods from language learning transfer to chemistry?</li>
        <li>Closing the gap between text reasoning and 3D space</li>
      </ul>
    </div>
    <div class="phd-step phd-step--4">
      <div class="phd-step__head">
        <span class="phd-step__num">4</span>
        <div>
          <div class="phd-step__title">Agents in the lab</div>
          <span class="phd-step__scale">experimental feedback and automation</span>
        </div>
        <i class="fas fa-flask" aria-hidden="true"></i>
      </div>
      <ul>
        <li>Reliable hypotheses → experiment design → self-improvement from physical results</li>
        <li>Agent systems that are actually suited to adoption in a real laboratory</li>
        <li>Are different LLMs inherently different — and does multi-agent collaboration help chemistry?</li>
      </ul>
    </div>
  </div>
  <div class="phd-safety">
    <div class="phd-safety__head">
      <i class="fas fa-shield-halved" aria-hidden="true"></i>
      <div>
        <div class="phd-safety__title">Reliable understanding &amp; model safety</div>
        <span class="phd-safety__scale">threaded through every layer</span>
      </div>
    </div>
    <ul>
      <li>Does confidence calibration that works on benchmarks hold up for scientific discovery?</li>
      <li>How does decision making inside an agent — the tool calls — actually work, and when should it refuse to act?</li>
      <li>We do not want a system that confidently mixes water and sodium.</li>
    </ul>
  </div>
</div>

---

## Research interests

- **Reliability and decision making in agentic systems** — trajectory-based confidence signals, knowing when a model is out of its depth, and what capability actually transfers between harnesses
- **Scalable/Agentic ML systems with reasoning** — dataset pipelines, chain-of-thought prompt engineering, latent reasoning in chemical space, custom evaluation frameworks incorporating biochemistry evaluations 
- **Macromolecule structure prediction and design** — 3D folding of ribozymes, data-efficient deep learning approaches for tRNA structure prediction, protein inverse design
- **Scientific ML** — LLM fine-tuning for bioengineering, molecular energy curve modeling, generative models for conformer prediction 

---

## A bit more about me

Outside the lab, I am the co-president of **UofT Women in Computer Science** (WiCS), founded the **Toronto Ethics in AI Symposium** (TEAS), and served as a **NCWIT Campus Representative**. I also sing, play double bass and make jewelry. I love watching old Sci-Fi movies :D

Feel free to reach out if you're working on AI for science, or if you just want to chat about research.
