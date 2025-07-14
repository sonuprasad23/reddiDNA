<div align="center">
  <img src="frontend/public/logo.png" alt="ReddiDNA Logo" width="120" />
  <h1>ReddiDNA</h1>
  <p><b>Extracting the digital DNA of Reddit users.</b></p>
  <p>An AI-powered application that generates a detailed user persona from public Reddit activity.</p>
  <a href="https://reddidna.netlify.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-View%20App-orange?style=for-the-badge&logo=netlify" alt="Live Demo"/>
  </a>
</div>

## Overview

ReddiDNA leverages the power of Large Language Models (Google's Gemini Pro) to create a rich, detailed user persona based on a Reddit user's public comments and posts. This tool goes beyond simple data scraping to provide deep insights into a user's demographics, personality traits, motivations, behaviors, and frustrations, all backed by citable sources from their activity.

This project is a full-stack application featuring a React frontend and a Python (Flask) backend, containerized with Docker for easy deployment.

## ✨ Features

-   **AI-Powered Persona Generation:** Uses Google's Gemini Pro to analyze text and infer detailed user characteristics.
-   **Deep Insight Categories:** Generates data on Demographics, Personality Sliders, Motivations, Behaviors, Frustrations, and Goals.
-   **Verifiable Citations:** Every piece of inferred data is linked back to the specific Reddit comment or post it was derived from.
-   **Interactive UI:** A clean, modern, and responsive interface built with React and Tailwind CSS.
-   **Engaging Loading State:** A dynamic countdown timer with fun messages and images keeps users engaged during analysis.
-   **Downloadable Reports:** Users can download a detailed text report of the persona with all sources included.

## 🛠️ Tech Stack

| Area      | Technology                                                                                                  |
| :-------- | :---------------------------------------------------------------------------------------------------------- |
| **Frontend**  | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) |
| **Backend**   | ![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white) ![Flask](https://img.shields.io/badge/-Flask-000000?logo=flask&logoColor=white) ![Gemini](https://img.shields.io/badge/Gemini%20Pro-4285F4?logo=google-gemini&logoColor=white) |
| **Deployment**| ![Netlify](https://img.shields.io/badge/-Netlify-00C7B7?logo=netlify&logoColor=white) ![Hugging Face](https://img.shields.io/badge/Hugging%20Face-Spaces-FFD21E?logo=hugging-face&logoColor=black) ![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white) |


## 🚀 Getting Started: Local Development

Follow these steps to set up and run the project on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Python](https://www.python.org/) (v3.10 or later)
-   [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/sonuprasad23/reddidna.git
cd reddidna