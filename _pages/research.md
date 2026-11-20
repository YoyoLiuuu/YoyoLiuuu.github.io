---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
---

I build machine-learning models and agents for chemistry and biology, from molecular representations to agents that choose experiments in a real laboratory. Across that work I keep coming back to the same questions: how these systems learn from scarce data, whether their reasoning can be checked, and when their decisions can be trusted, including when what they read is adversarial.

---
## MATS (Machine Alignment, Transparency & Security)
**Research Fellow (incoming) — MATS 12.0, Lila Sciences stream, biosecurity track** | January 2027 | London, UK<br>
*Mentored by David Peinador Veiga*

- Will work on **evaluating and mitigating catastrophic risks from dangerous scientific capabilities in frontier AI**, particularly biology, chemistry, and agents integrated with physical lab equipment.
- Plan to test whether a model's **reasoning trajectory can flag when it leaves its validated domain**, early enough to verify before an agent acts.

---
## University of Toronto — Matter Lab (Aspuru-Guzik Group)
**Undergraduate Research Project — Unhobble Science: Building a Model-Adaptive Layer in Chemistry Agents** | September 2026 – Present | Toronto, ON<br>
*Advised by Professor Alán Aspuru-Guzik and Professor Varinia Bernales*

- Studying how to **unhobble a model and move knowledge between harnesses**: what is transferable across scaffolds, what is scaffold-specific, and what turns out to be unnecessary altogether.

---

## Acceleration Consortium — Alán Aspuru-Guzik Group
**Machine Learning Research Intern — Agentic AI in Self-Driving Labs** | May 2026 – Present | Toronto, ON

- Architected and implemented a **full-stack platform connecting LLM agents with laboratory hardware and scientific software** through validated, permission-scoped interfaces for self-driving laboratories.
- Deployed and served open-weight LLMs on local compute clusters, building inference infrastructure and tooling for researchers to run models within on-premise scientific workflows.
- Engineered **closed-loop agentic workflows** for experiment execution, data analysis, and adaptive decision-making, integrating physical hardware with automated tool execution and failure recovery.
- First-author paper, *Closing the Analyze-to-Design Gap: An Authorization-Bounded Agent for Self-Driving Laboratories* ([arXiv:2611.25043](https://arxiv.org/abs/2611.25043)); an earlier version, *The A to D in DMTA*, was accepted to the [NeurIPS 2026 AI4Mat Workshop](/publications/). Replaying a 28-well oxidant screen from archived measurements, the agent found the best condition in every campaign with a budget of 8+ injections, where eight random picks include it only 29% of the time; in the live run it flagged two failed sample transfers.
- Continuing part-time after the summer internship on **reliable agentic reasoning and decision making** — making an agent's reasoning trustworthy enough to act on.

---

## LatentChem — Latent Reasoning in a Chemistry Language Model
**Co-author** | ICML 2026 | [arXiv:2602.07075](https://arxiv.org/abs/2602.07075)

- Helped design the **reasoning logic and training strategy** for a chemistry language model that reasons in continuous vectors instead of words; also helped construct the dataset and train the model.
- We adapted Coconut's continuous-thought reasoning and added a **latent token that represents the chemical structure** and is updated as the reasoning proceeds.
- Beats a strong chain-of-thought baseline in about **60% of non-tied comparisons with roughly a tenth of the reasoning steps**.
- t-SNE visualizations of its latent states showed similar chemical reasoning ending in nearby regions. I want to test whether that structure is real, and whether it can make latent reasoning traceable.

---

## Trajectory-Based Confidence — When Should a Model Ask for a Hint?
**Co-first author** | WiML Workshop at ICML 2026 | [Poster](/posters/wiml-icml-2026/)

- Asked whether a **small language model's confidence can tell it when to ask for a hint**, comparing six confidence signals. Set up the experimental framework, designed the experiments, and ran most of them.
- Only the **disagreement among a model's sampled answers** stays selective across all four models, and on the two we timed, computing it costs more than the hints it saves.

---

## University of Toronto — Chemspace Lab
**Machine Learning Research Student** | May 2024 – April 2026 | Toronto, ON

- Designed **symmetry-aware, data-efficient representations** from physics-chosen invariants on the parent geometry for alchemical-exchange-invariant molecules: within about 2 mHa of SchNet up to about 200 training molecules at 1/2,300 of its compute, and ahead of SOAP and both Coulomb-matrix variants up to about 400.
- Investigated methods for **designing chemical features** for molecular energy curves by comparing interpolation-based 3D sorting with ML-based approaches, analyzing how ordering/representation of atoms affects downstream model interpretability.
- Implemented algorithms such as A\*, locality-sensitive hashing, and genetic algorithms on molecular energy curve sorting. Developed a KNN classifier to group molecules for generating smooth 3D molecular energy curves.
- Explored how a **generative Gaussian mixture model** with cross-validation using PyTorch could predict low-energy conformers of 4-atom molecules.

---

## Yale University — Gerstein Lab
**Machine Learning Research Assistant — Protein Design** | August – September 2025 | Remote

- Contributed to an **inverse-folding based protein design paper** (under review at *Cell Systems*), including designing evaluation experiments and writing sections of the manuscript and point-to-point rebuttal letter.
- Researched and implemented experiments to test model performance against protein design benchmarks (**PepMerge for peptide design, SAbDab for antibody design**) to address reviewer concerns.
- Analyzed sources of poor model performance on specific proteins in the CATH 4.2 test set, providing explanations to guide further refinement.
- Improved model performance by addressing benchmark limitations, including **implementing new evaluation metrics informed by chemistry and biology background**.

---

## National University of Singapore — SERIUS Internship
**Machine Learning Research Intern — Large Language Models (LLMs)** | May – August 2025 | Singapore<br>
*Supervised by Yeoh Jing Wui and Professor Poh Chueh Loo*

- One of thirty students from North America selected for the 2025 SERIUS internship program at NUS.
- Defined the project scope and **led end-to-end research** on evaluating and fine-tuning LLMs for metabolite pathway engineering.
- Engineered a complete dataset pipeline by converting a newly published metabolite database into graph representations and generating chain-of-thought prompts to improve reasoning over bioengineering data.
- Designed and conducted experiments evaluating table-, graph-, and text-based fine-tuning using models such as Google Gemma and DeepSeek, benchmarking with BLEU, ROUGE, and custom biological reasoning metrics.
- Secured $8,000 CAD in research funding from the University of Toronto to support project execution.
- This work grew into *Recovering Hidden Chemistry: Improving LLM Fine-Tuning on Metabolic Pathways*, accepted to the [NeurIPS 2026 Women in Machine Learning Workshop](/publications/).

---

## University of Alberta — Brown Lab
**Research Assistant — Computational Chemistry** | October 2021 – July 2023 | Edmonton, AB

- Assisted in the research of the **effects of distance and location of a charge on a HBDI chromophore molecule's excitation energy** in different solvent environments.
- Wrote scripts to **automate DFT/Hartree-Fock calculations of molecules** on Compute Canada with Bash.
