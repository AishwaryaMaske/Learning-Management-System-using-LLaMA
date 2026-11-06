# Learning Management System using LLaMA and SearXNG

> **Department of Information Technology**, Yeshwantrao Chavan College of Engineering (YCCE), Nagpur  
> Published at the **Hinweis International Conference on Recent Trends in Engineering and Technology (RTET-2024)**  
> **Project Guide:** Prof. Priti Matre | **Authors:** Aishwarya Maske, Abhijeet Konar, Pawan Balpande, Pralendra Behera, Samyak Labhane

---

## 📌 Abstract & Overview

Traditional Learning Management Systems (LMS) enforce rigid, one-size-fits-all curricula that fail to adapt to individual student paces, lack real-time context-aware support, and expose sensitive student information to third-party cloud data harvesters.

This project introduces a **privacy-first, on-premises Learning Management System** integrating:
1. **Local LLaMA Language Model (via Ollama)**: Delivers instant, context-aware conceptual explanations and automated topic decomposition with zero cloud telemetry.
2. **SearXNG Metasearch Engine**: Gathers diverse, unbiased academic papers and documentation across 70+ search engines while stripping student IP headers and session cookies.
3. **YouTube AI-Powered Video Recommendation Module**: Generates prompt-based video playlists using the YouTube Data API and LLaMA relevance scoring.
4. **Adaptive User Feedback Loop**: Evaluates comprehension prompts (*"Did you understand the content in the videos?"*) to dynamically modify learning pathways and feed **Random Forest** trajectory models targeting >99% prediction precision.

---

## 🏛️ System Architecture

### 1. Six Core Project Modules (Figure 3.1)
- **Module 1: Backend Foundation (Express.js & Node.js)**: REST API bridge handling request dispatch, MongoDB schema persistence, and session verification.
- **Module 2: LLaMA Model Integration (Ollama)**: Local quantized model execution ensuring full compliance with FERPA and GDPR data isolation.
- **Module 3: SearXNG Integration (Metasearch)**: Anonymous querying layer routing requests to upstream repositories without tracking.
- **Module 4: Decision Agent Implementation**: Multi-stage intent parsing engine evaluating whether user queries require internal LLM weights, live internet search, or video course synthesis.
- **Module 5: Frontend Development (React & Tailwind CSS)**: Modern dark-themed responsive user interface designed for student accessibility.
- **Module 6: Topic Decomposition & Video Recommendations**: Automated curriculum roadmaps with duration estimates, milestones, and adaptive feedback hooks.

### 2. Decision Agent 4-Stage Workflow (Figure 3.4 / Figure 2)
```
User Query ──▶ 1. Prompt Analysis ──▶ 2. Decision Path ──▶ 3. Information Retrieval ──▶ 4. Answer Synthesis & Feedback Loop ──▶ Enhanced Learning
```

### 3. SearXNG Reverse Proxy Architecture (Figure 3.2)
```
Browser (React) ──[HTTPS]──▶ Reverse Proxy (Nginx) ──[TCP]──▶ uWSGI Worker Pool (SearXNG #1-#4) ──▶ Redis DB Cache
```

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org) (v18+)
- [Docker](https://www.docker.com) & Docker Compose (optional for full containerized stack)
- [Ollama](https://ollama.ai) (for real on-premises LLaMA inference)

### 1. Run via Docker Compose (Recommended)
```bash
# Clone the repository
git clone https://github.com/your-username/lms-llama-searxng.git
cd lms-llama-searxng

# Launch Ollama, SearXNG, Redis, MongoDB, and LMS
docker-compose up -d

# Pull the target model in Ollama
docker exec -it lms_ollama ollama run llama3:8b
```

### 2. Run Manually with Local Node.js
```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables (optional)
cp .env.example .env

# 3. Start development server (runs Express + Vite on port 3000)
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## ⚙️ Configuration & Simulation Mode

The application includes a built-in **Simulation Mode** that allows reviewers, evaluators, and portfolio visitors to immediately test all features (LLaMA reasoning, SearXNG search, YouTube playlists, feedback adaptation) without downloading 8GB model weights or running local Docker containers.

| Environment Variable | Default | Purpose |
| :--- | :--- | :--- |
| `PORT` | `3000` | Port for Express backend and Vite client |
| `OLLAMA_ENDPOINT` | `http://localhost:11434` | Endpoint for local Ollama LLaMA service |
| `OLLAMA_MODEL` | `llama3:8b` | Target LLM model name |
| `SEARXNG_ENDPOINT` | `http://localhost:8080` | Endpoint for privacy SearXNG metasearch instance |
| `MONGODB_URI` | `mongodb://localhost:27017/lms_llama_db` | MongoDB connection URI |
| `YOUTUBE_API_KEY` | *(optional)* | YouTube Data API v3 key for live search queries |

---

## 📊 Research Metrics & Findings (From Project Report)
- **Prediction Accuracy:** Random Forest ensemble classifier achieves **98.8%** trajectory prediction precision based on engagement time, subtopic completion, and adaptive video feedback.
- **Response Latency:** On-premises quantized LLaMA execution benchmarked at **~20 seconds** for full multi-subtopic synthesis on modest local hardware, with consistency across concurrent requests.
- **Data Confidentiality:** Complete data sovereignty within institutional firewalls, eliminating third-party AI training on student queries.

---

## 📜 Publication & Citation

If you reference this work in your academic research, please cite:

```bibtex
@inproceedings{konar2024learning,
  title={Learning Management System using LLAMA},
  author={Matre, Priti and Konar, Abhijeet and Behera, Pralendra and Balpande, Pawan and Labhane, Samyak and Maske, Aishwarya},
  booktitle={Hinweis International Conference on Recent Trends in Engineering and Technology (RTET-2024)},
  year={2024},
  month={December},
  organization={Yeshwantrao Chavan College of Engineering, Nagpur}
}
```
