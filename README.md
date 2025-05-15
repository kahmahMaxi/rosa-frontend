# 🌹 Rosa Tech – AI Wellness Web Platform

The Rosa Tech web platform is a privacy-first, AI-powered mental health companion that operates entirely in-browser. It empowers users with real-time therapeutic conversations, wellness tracking, and personal growth tools — all without requiring app installation. Built using React, Firebase, and token-gating via Solana.

---

## 🌟 Features

- 🤖 AI-powered **Therapist**, **Wellness Coach**, and **Instructor**
- 📊 Daily scoring system for **wellness, physical health,** and **mental clarity**
- 🧠 Smart prompts every 2–3 hours, adapting to your last check-in
- 🔐 Token-gated premium features (via Solana wallet connection)
- 🔄 Mood log history & progress reflection
- 🔒 Anonymous, privacy-first experience
- ☁️ Firebase for authentication and backend services

---

## 🧱 Tech Stack

- **Frontend:** React (CRA)
- **State:** Redux Toolkit / Context API
- **AI:** OpenAI GPT (multi-persona integration)
- **Blockchain:** Solana (token gating with Phantom wallet)
- **Backend:** Firebase (Firestore, Auth, Functions)

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A Firebase project
- A Solana token deployed (optional for testing premium features)

### 1. Clone the Repository

```bash
git clone https://github.com/neurosa-ai/rosa.git
cd rosa-tech
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
REACT_APP_FIREBASE_API_KEY=""
REACT_APP_FIREBASE_AUTH_DOMAIN=""
REACT_APP_FIREBASE_PROJECT_ID=""
REACT_APP_FIREBASE_STORAGE_BUCKET=""
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=""
REACT_APP_FIREBASE_APP_ID=""
REACT_APP_FIREBASE_MEASUREMENT_ID=""
REACT_APP_AI_API=""
REACT_APP_RPC_URL=""
```

### 3. Run Locally

```bash
npm start
```

### 📂 Folder Structure

```bash
/src
 ├── /public         
 ├── /src              # Expo Router pages
    ├── /components               
    ├── /fonts              
    ├── /hooks              
    ├── /media            
    ├── /pages           
    └── /redux              
    └── /scripts              
    └── /styles              
    └── /utilities              
```
---

### 🔐 Token Gating (Solana)

Rosa Premium features are unlocked by connecting a Solana wallet (Phantom, Solflare, etc.) and verifying that the user holds rosa token.

Make sure you:

Have a Solana wallet browser extension installed

---

### 📜 License

This project is licensed under the MIT License. See LICENSE for details.

---

### 💬 Contact

Team Rosa 🌹

🌐 [ROSA](https://neurosa.ai)

Twitter: [@neurosamd](https://x.com/neurosamd)




