---
layout: archive
title: "Projects"
permalink: /projects/
author_profile: true
---

## AutoGrader — Automated Math Assignment Grading System
**Machine Learning Engineer** | CSC490 Capstone Design Project, University of Toronto | January – April 2026

- Collaborated with a team of 4 to build an end-to-end pipeline that **automates grading of handwritten math assignments**: YOLOv8 for strike-through detection, Gemini Vision for PDF-to-LaTeX OCR, and AWS Bedrock (Nova Pro) for rubric-based LLM grading.
- Architected the **entire cloud infrastructure** on AWS (ECS Fargate, Lambda, RDS, S3, ECR) with Terraform IaC, Dockerized services, VPC networking, and CI/CD for dev and production environments.
- Owned the **LLM grading component**: designed the Nova Pro pipeline and implemented a **meta-LLM prompt optimizer with LLM-as-a-judge** to iteratively refine grading policies and minimize MAE against human graders.
- Built **confidence scoring** that routes each submission to auto-grade or human review — deciding when the model should not be trusted to act alone.

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
