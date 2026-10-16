# Requirements: Cardfight!! Vanguard Stride Deckset Chronojet Scanner & Deck Explorer

## 1. Problem Statement
The user created a high-performing Gundam Card Game scanner & deck builder in `gcg_card_scraper`. They now need the identical architecture, data model quality, and interactive visual interface ported to Cardfight!! Vanguard D-Standard, specifically focusing on **D Special Series 03: Stride Deckset Chronojet** (D-SS03), complemented with a deep-dive **Tips & Tricks / Strategy Guide** covering multiple pre-con decks and a detailed masterclass on how to pilot Chronojet.

## 2. Acceptance Criteria
- [x] **Data Pipeline & Scraper**:
  - Scrape all 19 unique cards from D-SS03: Stride Deckset Chronojet from Cardfight Fandom wiki via MediaWiki API.
  - Complete card schema matching GCG format adapted for Vanguard: `cardNo`, `name`, `rarity`, `grade`, `power`, `shield`, `critical`, `nation` ("Dark States"), `clan` ("Gear Chronicle"), `race`, `cardType`, `triggerType`, `skillText`, `artVariants`, and `faqs`.
  - Stored in `src/data/cards.json` and structured deck list in `src/data/chronojetDeck.json`.
- [ ] **Modern Web Application Scaffold**:
  - React 19 + TypeScript + Vite + Tailwind CSS + Lucide icons.
  - Responsive Navbar with tabs: "Chronojet Deckset", "Card Explorer", "Tips & Pre-con Guide".
- [ ] **Interactive Deck Viewer**:
  - Segmented display: Ride Deck (4 cards: Dran -> Masergear -> Smokegear -> Chronojet), G-Zone (8 cards: 4x Nextage, 4x Faterider), Crest (Chronojet Dragon Crest), Main Deck (46 cards) with visual counts (4x, 1x).
  - Deck statistics: Grade breakdown, Trigger breakdown (4 Crit, 4 Draw, 3 Front, 4 Heal, 1 Over).
- [ ] **Card Explorer & Card Modal**:
  - Real-time search by name, card number, skill text.
  - Filters by Grade (G0-G4), Card Type, Trigger Type.
  - High-res card inspect modal with stylized Vanguard ability badges (`[AUTO]`, `[ACT]`, `[CONT]`, `[Stride]`, `[Counter-Blast]`, `[Soul-Blast]`) and FAQ/rulings.
- [ ] **Tips & Strategy Guide (Segmented by Pre-con Decks + Chronojet Pilot Masterclass)**:
  - Pre-con deck breakdowns:
    1. Stride Deckset Chronojet (D-SS03)
    2. Stride Deckset Messiah (D-SS04)
    3. Stride Deckset Shiranui (D-SS09)
    4. Stride Deckset Luard (D-SS10)
    5. Stride Deckset Harri (DZ-SS02)
    6. Stride Deckset Nightrose (DZ-SS03)
    7. Quick Start / Break Away Start Decks
  - Interactive Step-by-Step "How to Pilot Chronojet":
    - Ride line setup & Crest placement
    - The Stride rule & timing
    - Crest continuous power scaling calculation (+5000 per face-up G-card)
    - Upstream Dragon + Gigi resource loop
    - Nextage restand turn sequencing
    - Defensive play & guarding
- [ ] **Verification**:
  - `npm run build` passes with zero TypeScript/bundle errors.
