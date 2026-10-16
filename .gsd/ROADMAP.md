# GSD Roadmap: Vanguard Chronojet Deckset & Explorer

- [x] **Phase 1: Data Pipeline & Deck Scraping (GCG Architecture)**
  - [x] Task 1.1: Implement `scripts/scrapeCards.mjs` targeting Cardfight Fandom MediaWiki API for D-SS03
  - [x] Task 1.2: Implement `scripts/downloadCardImages.mjs` to download all 38 high-res card art variants locally into `public/cards/` (offline-ready, 0 hotlink/CORS errors)
  - [x] Task 1.3: Generate `src/data/cards.json` with all 19 cards, authentic tabber artwork, and FAQs
  - [x] Task 1.4: Generate `src/data/chronojetDeck.json` with ride deck, G-zone, crest, and main deck counts
  - [x] Task 1.5: Build `src/services/cardDatabase.ts` matching GCG's lookup, normalization, and search service

- [x] **Phase 2: App Scaffold & Design System**
  - [x] Task 2.1: Initialize Vite, React 19, TypeScript, Tailwind CSS configuration
  - [x] Task 2.2: Establish TypeScript interfaces in `src/types/card.ts` and `src/types/deck.ts`
  - [x] Task 2.3: Build navigation and global layout with responsive dark theme and font pairings

- [x] **Phase 3: Interactive Features & UI Components**
  - [x] Task 3.1: Build `DeckViewer.tsx` (Ride deck, G-zone, Crest, Main deck, Stats counters, Crest simulator)
  - [x] Task 3.2: Build `CardExplorer.tsx` (Search, Grade filters, Card Type filters, Trigger filters, Sorting)
  - [x] Task 3.3: Build `CardModal.tsx` & Vanguard skill text formatter with badges ([AUTO], [ACT], [CONT], [Stride])
  - [x] Task 3.4: Build `TipsAndTricks.tsx` (Pre-con comparisons + Chronojet Pilot Masterclass with interactive quizzes)

- [x] **Phase 4: Verification & Polish**
  - [x] Task 4.1: Run TypeScript compiler and production build (`npm.cmd run build` passes with zero errors)
  - [x] Task 4.2: Verify all 19 cards render with authentic local artwork, power, shield, and abilities
  - [x] Task 4.3: Ensure responsiveness, local asset delivery, and smooth navigation
