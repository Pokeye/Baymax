# 06 — UI/UX and Design System

## 1. Product experience
BayMax should feel like a calm, useful companion rather than a noisy sci-fi control panel. Use cinematic AI Presence as one mode, not the entire application.

### Frontend visual direction (approved)
- Use a warm, caring companion aesthetic inspired by BayMax: rounded forms, generous breathing room, soft ivory surfaces, restrained coral-red accents, and friendly readable typography.
- Provide both light and dark themes through a visible Light/Dark control; remember the selection locally in the browser. Light is the initial theme. Dark mode should preserve the same calm hierarchy and readable contrast.
- Use original companion artwork as an illustration, not as a substitute for interactive UI. Keep glow and decorative effects subtle.
- Until persistence and authentication exist, label local-only interactions and sample content as demo data. Do not imply that an AI, authorization engine, backend or database is connected.

## 2. Main navigation
- Home / Companion
- Neural Canvas
- Diary & Knowledge
- Review Queue
- Tasks & Activities
- Archive
- Legacy Vault
- Settings / Personalization

## 3. Neural Canvas
- Infinite pan and zoom.
- React Flow custom nodes.
- Color identifies category; size may indicate importance or connection count.
- Node click opens a detail panel with source entries.
- Edge labels identify relationships.
- Search/filter by category, date, person, source and status.
- Provide a list/table fallback for accessibility and small screens.
- Do not create one node per chat message; reuse canonical entities and link source memories.

## 4. Category palette
- Health & Fitness: green `#22C55E`
- Food & Nutrition: amber `#F59E0B`
- Education & Learning: blue `#3B82F6`
- Work & Productivity: violet `#A78BFA`
- People & Relationships: pink `#EC4899`
- Recreation & Hobbies: cyan `#06B6D4`
- Personal Life: orange `#F97316`
- Places & Events: slate `#94A3B8`

Colors must also have text labels/icons; never rely on color alone.

## 5. AI Presence
Central orb/core with surrounding panels and clear state:
- Idle: subtle breathing.
- Listening: waveform/pulse.
- Thinking: rotating/pulsing rings.
- Retrieving: related graph nodes illuminate.
- Speaking: waveform animation synchronized approximately with audio.
- Executing: progress plus action name and approval state.
- Error: explicit warning and recovery option.

MVP implementation: CSS/SVG/canvas animation. Three.js and advanced 3D effects are later enhancements.

## 6. Responsive behavior
Desktop-first because canvas is space-intensive. On mobile, provide category filters, focused node detail and a list view rather than forcing the full desktop graph into a narrow screen.

## 7. Accessibility
Keyboard navigation, visible focus, semantic controls, readable contrast, reduced-motion option, captions/transcripts for voice, and non-color indicators.
