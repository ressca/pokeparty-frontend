# PokeParty Frontend

### Project Description
PokeParty allows users to:

- Browse a list of Pokémon.  
- Add Pokémon to their favorites.  
- Vote for Pokémon to indicate which one they like more.  
- See rankings based on votes.  

This makes PokeParty an interactive Pokémon platform combining collection, preference voting, and rankings in a fun UI.

## Overview

**PokeParty** is a full-stack Pokémon-themed application consisting of:

- **Backend**: FastAPI + Uvicorn providing API endpoints.  
- **Frontend**: React application for interacting with the backend.  

You can find the backend repository here: [PokeParty Backend](https://github.com/ressca/pokeparty-backend)

This README covers the frontend setup and running instructions.

---

## Requirements
- Node.js 16+
- npm
- (Optional) Backend API running

---

## Installation (Local)

### 1. Clone the repository
```bash
git clone https://github.com/ressca/pokeparty-frontend.git
cd pokeparty-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables (if needed)

Create a .env file in the root directory. For example:
```env
VITE_POKEPARTY_API_URL=http://localhost:8000/
```

## Running the Frontend (Development)
```bash
npm run dev
```
