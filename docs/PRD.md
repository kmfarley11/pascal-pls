# Project Requirements Document

## Overview

One-liner: A cozy, single-page site that surfaces whimsical Pascal quotes from Animal Crossing: New Horizons, with a “today’s quote” and quick copy-to-clipboard.

Users: Fans who want a small, soothing dose of Pascal philosophy.

Platform: Browser SPA, deployed via GitHub Pages, no backend.

Tech: Vite + React + TypeScript + Tailwind (static build). Content comes from a simple newline-delimited quotes.txt file at first.

## Goals & Objectives

Primary goal: Let users get a “today’s quote” and easily browse/copy other quotes.

Success-ish constraints (not strict):

Simple, fast load on mobile.

Feel “cozy, polished, fan-made” rather than “bootstrappy”.

Non-goals: User accounts, persistent favorites, social sharing beyond copy-to-clipboard, server-side APIs.

## Requirements & Scope

### Core UX

Views: Single responsive page:

Header: title + small about/help affordance.

Main: “Today’s quote” card.

Controls: buttons to:

Copy current quote.

Shuffle to a different quote.

Optional: toggle “random vs today’s mode” (could be v1.1).

Flows:

Landing: On load, show deterministic “today’s quote” based on the date.

Shuffle: “Give another scallop” button → show a different quote (random; don’t have to guarantee no-repeat in v1).

Copy: “Copy quote” button → copy quote text (optionally with attribution suffix) to clipboard, and show a brief visual confirmation.

### Data

Source (v1): Static text file public/quotes.txt.

Each line = one quote.

Empty lines ignored.

Example (quotes.txt):

The tide goes in and out, man.
When you think about it, we're all just bubbles in the cosmic sea, maaan.
Sometimes the deepest truth is just chillin' on the surface.

Internal model: At runtime we treat this as a simple string[] in memory.

Future option (v1.1+): Upgrade to JSON with IDs/tags if we want filtering or richer metadata.

### UI / Visual

Style keywords: Cozy, beachy, gentle, philosophical.

Colors: Soft pinks and/or purples as accents/backgrounds or outlines (e.g., card border, header background, buttons), with sufficient contrast for text.

Layout:

Centered quote card with rounded corners and soft shadow.

Background gradient or subtle pattern using pink/purple hues.

Accessibility:

High contrast for text on card.

Clear focus states for buttons.

Works well with keyboard (Tab focus, Enter/Space to activate).

Respect prefers-reduced-motion (no intense animations).

### Performance & Quality

Perf: Keep bundle small (no huge deps) and interactions snappy.

Offline: Nice-to-have but not required for v1 (PWA can be v1.1).

Errors/empty:

If quotes.txt fails to load → friendly error message.

If file is empty → “No quotes found” message instead of breaking.

### Deploy & Ops

Build: vite build.

Hosting: GitHub Pages (either docs/ or gh-pages branch).

CI (optional v1.1): GitHub Actions to build & deploy on push to main.

Analytics: None initially.

### Legal / IP

Nature of project: Non-commercial fan-made project.

Attribution (in About modal/footer):

Text along the lines of:

“This is an unofficial fan project inspired by Pascal from Animal Crossing: New Horizons.
Animal Crossing and Nintendo Switch are trademarks of Nintendo.
This site is not affiliated with or endorsed by Nintendo.”

Content:

Short textual quotes attributed to Pascal / Animal Crossing: New Horizons.

No official Nintendo logos, fonts, or extracted in-game art.

Favicon / character usage:

To avoid licensing issues, use:

A custom, original icon (e.g., a stylized scallop, pearl, or otter silhouette) as the favicon.

An About dialog that mentions Pascal and Animal Crossing: New Horizons in text, with the attribution above.

Avoid using ripped sprites, box art, or official character art.

(Not legal advice, just a conservative, fan-safe pattern.)

## Supporting Information

Inspiration: Minimal quote/Pomodoro apps, ACNH color palettes, “lo-fi chill” web UIs.

Open questions (for later):

Should we add a light/dark toggle using the same pink/purple accents?

Should “copy” include an attribution suffix by default?