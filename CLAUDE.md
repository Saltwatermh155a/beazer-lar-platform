# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Beazer Homes LAR (Land Acquisition Request) Lifecycle Platform — a React-based platform for managing land acquisition workflows, developed in partnership with Calance. The project is in a prototype/POC phase. It includes a new `lar-ui` frontend alongside a reference `BeazerUISample/Scout` codebase from the existing Scout application.

## Commands

### lar-ui (primary development target)
```bash
cd lar-ui
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:5173
npm run build        # Production build
npm run lint         # ESLint
```

### BeazerUISample/Scout (reference codebase, not actively developed here)
- **Backend:** .NET 8 (`ScoutWebApp`) with Azure AD auth, SQL Server via `pyodbc` in Python DB migration scripts
- **Frontend:** React 18 + Vite inside `ScoutReactJS/` — uses `@azure/msal-react` for auth, `axios` for API calls
- **Database migrations:** Python scripts in `Src/DataBase/PythonScripts/v1_1_0/`, run via `runner.py`
- **Infrastructure:** Azure DevOps pipelines (`azure-pipelines.yml`)

## Architecture

### lar-ui structure
- **Framework:** React 19 + Vite 7, MUI components, Bootstrap CSS
- **Routing:** `HashRouter` in [App.jsx](lar-ui/src/App.jsx) — `/poc` is a standalone route (no nav/tabs), all other routes share a `Navbar` + `Tabs` layout
- **State:** Redux with a single `user` reducer (mock user, no real auth yet)
- **Key pages:**
  - `/presidents-letter` — Letter dashboard, navigates to `/letter-editor`
  - `/letter-editor` — Rich text editor (Jodit) for generating LAR letters
  - `/poc` — Full LAR Lifecycle Platform POC v3 with dashboard, pipeline, deal detail, architecture views
  - `/topinputform`, `/topoutput`, `/larcriteria`, `/proforma` — Scout data pages (mirrored from the existing Scout app)
- **UI libraries:** MUI, react-leaflet (maps), react-quill/jodit-react (rich text), react-scroll, axios

### Style guide
The canonical design system is [beazer-lar-platform-style-guide.yaml](beazer-lar-platform-style-guide.yaml). It documents the SharePoint-aligned visual language reverse-engineered from Beazer's internal Vera intranet. Key rules:
- **Primary brand color:** `#9F2C32` (Beazer red) — the only prominent brand color
- **Do NOT use** `#679F7B` (accent green), `#AE8F5D` (accent gold), or gradient backgrounds — those are from old presentation decks
- **Border radius:** 2px (nearly square, matching SharePoint)
- **Font:** Segoe UI system font stack
- **Icons:** line-weight only (lucide-react), no emoji, no filled/solid icons
- **Anti-patterns:** no uppercase labels, no heavy shadows, no pill badges

The POC ([LARPlatformPOC.jsx](lar-ui/src/pages/LARPlatformPOC.jsx)) embeds design tokens as a `T` constant at the top of the file — these should stay in sync with the YAML guide.

### BeazerUISample/Scout reference
The existing production Scout app uses:
- .NET 8 backend with Azure AD (Microsoft.Identity.Web), JWT bearer auth
- React 18 frontend at `Src/WebApp/Scout/ScoutReactJS/` with MSAL auth
- Azure Functions (`Src/GoogleMapApi/`) for Google Maps integration
- SQL Server with Python migration scripts versioned as `c1_*.py` through `c29_*.py`
- Multi-environment configs: Local, Development, QA, UAT, PREP

## Key conventions
- Router uses `HashRouter` (not `BrowserRouter`) — routes include the `#` prefix
- ESLint config ignores `no-unused-vars` for variables starting with uppercase or underscore
- Redux store uses `combineReducers` — currently only `userReducer`; new reducers go in `src/redux/reducers/` and are combined in `index.js`
- The `poc/` directory contains earlier standalone prototypes; `lar-ui/src/pages/LARPlatformPOC.jsx` is the current integrated version
