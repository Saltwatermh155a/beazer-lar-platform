# Beazer Homes — LAR Lifecycle Platform

This project is a React-based platform for managing the Land Acquisition Request (LAR) lifecycle, developed in partnership with Calance.

## 🚀 Quick Start

### 1. Installation

Navigate to the UI directory and install dependencies:

```bash
cd lar-ui
npm install
```

### 2. Running Locally

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:5173/](http://localhost:5173/).

## 🏗️ Accessing the POC

The **LAR Lifecycle Platform POC v3** has been integrated as a standalone route within this application. It features a complete SharePoint-aligned design system and functional service map.

- **POC URL**: [http://localhost:5173/#/poc](http://localhost:5173/#/poc)

### POC Key Features:
- **Dashboard**: Reordered layout featuring the **LAR Lifecycle Flow** at the top, followed by active metrics and notifications.
- **Pipeline**: A filterable list of all active deals with risk scores and progress tracking.
- **Deal Detail**: Deep-dive into specific deals (e.g., *Kings Grove*) with delegation flows, task checklists, and AI document generation previews.
- **Architecture**: A full functional service map of the platform's backend and AI service layers.

## 📂 Project Structure

- `/lar-ui`: The main React + Vite application.
  - `/src/pages/LARPlatformPOC.jsx`: The primary component for the integrated POC.
- `/poc`: Original standalone components and design tokens.

---
*Created by Beazer Homes × Calance — March 2026*
