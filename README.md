# PokeParty Frontend

## Overview
**PokeParty** is a full-stack Pokémon-themed application consisting of:

- **Backend**: FastAPI + Uvicorn providing API endpoints.  
- **Frontend**: React application for interacting with the backend.  

You can find the backend repository here: [PokeParty Backend](https://github.com/ressca/pokeparty-backend)

This README covers the frontend setup, running, and building instructions.

---

## Requirements
- Node.js 16+
- npm or yarn
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
# or
yarn install
```

### 3. Configure environment variables (if needed)

Create a .env file in the root directory. For example:
```env
REACT_APP_API_URL=http://localhost:8000
```

Note: React requires environment variables to start with REACT_APP_.

## Running the Frontend (Development)
```bash
npm start
# or
yarn start
```

## The app will run at:
```markdown
http://localhost:3000
```

Hot-reload is enabled, so the UI updates automatically when files change.

## Building for Production
```bash
npm run build
# or
yarn build
```

The build output will be placed in the build/ directory, ready for deployment.