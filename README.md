# BayMax — Implementation Anchor Pack

**Product:** BayMax  
**Project type:** BSCS thesis / programming-languages prototype  
**Primary goal:** Build a personal AI companion with a visual memory system and a permission-controlled digital legacy vault.

## Start here
1. Read `AGENTS.md` before asking any coding agent to modify the repository.
2. Read `docs/01-product-requirements.md` and `docs/02-architecture.md`.
3. Agree on the database and API contracts before parallel implementation.
4. Follow `docs/13-ranked-roadmap.md`; it ranks work by dependencies as well as difficulty.
5. Keep the thesis requirements in `docs/12-programming-paradigms-and-thesis-requirements.md` visible throughout development.

## Product direction
BayMax combines:
- **Companion Mode:** grounded AI conversations, approved personalization, memory recall, voice and approved actions.
- **Neural Canvas:** infinite, color-coded canvas showing approved memories and their relationships.
- **Memory Engine:** diary, knowledge records, source provenance, immutable originals and owner-reviewed AI suggestions.
- **AI Presence:** a cinematic visual interface for text and voice interaction.
- **Archive:** export conversations, memories and authorized archive packages.
- **Legacy Mode:** beneficiary access governed by a custom policy language and SWI-Prolog.

## Suggested stack
React + Vite + TypeScript + Tailwind + React Flow; Python + FastAPI + SQLAlchemy + Pydantic; PostgreSQL; custom Python lexer/parser/interpreter; SWI-Prolog; configurable free-tier or local AI and transcription providers.

## Scope warning
This is a substantial project. Deliver a secure, integrated thesis MVP before attempting advanced voice, 3D effects, autonomous agents or native mobile apps. The AI model is never the authorization authority.

## Current frontend handoff
The browser-only frontend prototype is documented in [docs/19-frontend-progress.md](docs/19-frontend-progress.md). It includes demo routes and local-only interactions; backend, database, AI, live voice, real graph storage, and policy enforcement remain unconnected. Screenshot QA status and captures are in [docs/design-qa.md](docs/design-qa.md).

## Pack contents
- `AGENTS.md` — rules for coding agents.
- `docs/01`–`docs/18` — requirements, architecture, schema, API, security, UI, personalization, voice, archive, paradigms, policy language, roadmap, testing, team plan, prompts and decisions.

## Source basis
The original student handout supplied for this project defines the required OOP diary model, functional entry processing, polymorphic writing modes, Prolog access rules, custom policy language, grounded AI Q&A, typed exceptions, tests and deliverables. This pack preserves those requirements while incorporating the team's later product decisions. Confirm any course-specific interpretation with the instructor.
