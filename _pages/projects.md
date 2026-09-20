---
layout: archive
title: "Projects"
permalink: /projects/
author_profile: true
---

## [AutoGrader](https://github.com/UofT-CSC490-W2026/AutoGrader) — Automatic Grading for Handwritten Math
**Developer** | CSC490 Capstone Project, University of Toronto | January – April 2026

- Built an end-to-end pipeline that grades handwritten math assignments in a team of 4: **YOLOv8 strike-through detection** → **Gemini Vision OCR** (PDF to LaTeX) → **LLM grading** against a rubric on AWS Bedrock.
- Trained YOLOv8m on 20,000 synthetic pages for strike-through masking (mAP@50 = 0.9945); benchmarked Gemini Vision OCR against Tesseract and Pix2Text across datasets.
- Added **RAG-enhanced grading** with pgvector similarity search over prior human feedback, and a meta-LLM prompt optimization loop that iterates on the grading policy to minimize MAE.
- Implemented **confidence scoring** to route each submission to auto-grade or human review — deciding when the model should not be trusted to act alone.
- Deployed as containers on AWS ECS Fargate with Terraform IaC, CloudWatch logging, and test-coverage CI.

---

## RiboFold — Ribozyme RNA 3D Folding Prediction
**Team Lead** | University of Toronto Machine Intelligence Student Team | October 2024 – March 2025

- Led a team of 6 developers to research and develop a model that **predicts 3D RNA folding** of ribozymes.
- Won the **Cross-Disciplinary Impact Award** at the Canadian Undergraduate Conference on AI 2025 amongst 70+ projects.

---

## Eco-Score Calculator (Partnership with Cash App)
**Developer** | University of Toronto, Focus in Technology Leadership Program | September 2024 – January 2025

- Developed an open-source web platform that calculates **environmental impact scores** for Cash App credit card transactions based on merchant ESG ratings and purchase amounts.
- Collaborating with Cash App engineers to integrate sustainability metrics into personalized financial insights.

---

## Aercoustics — Construction Audio Classification
**Researcher** | University of Toronto Machine Intelligence Student Team | February – August 2024

- Fine-tuned pre-trained audio transformers with audio data from Aercoustics Engineering Ltd and improved **multi-label** audio classification from 62% to 85%, **surpassing models by external companies**.
- Performed physics-informed audio data augmentation and worked with clients directly to tailor the pipeline towards client needs.
