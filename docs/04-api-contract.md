# 04 — API Contract (Initial)

Use `/api/v1`. All request/response models must be defined in Pydantic and mirrored in frontend TypeScript. These routes are an initial contract; finalize exact payloads during implementation before parallel work.

## Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`

## Diary
- `GET /entries`
- `POST /entries`
- `GET /entries/{entry_id}`
- `PATCH /entries/{entry_id}` — creates a version; never destroys original.
- `GET /entries/{entry_id}/versions`

## Memory
- `GET /memory/candidates?status=pending`
- `POST /memory/candidates/{id}/review` — approve/edit/reject.
- `GET /memory/entities`
- `GET /memory/entities/{id}`
- `GET /memory/relationships`
- `GET /memory/canvas` — authorized graph projection.

## Personalization
- `GET /personalization/profile`
- `GET /personalization/candidates`
- `POST /personalization/candidates/{id}/review`
- `PATCH /personalization/preferences/{id}`
- `DELETE /personalization/preferences/{id}`

## AI
- `POST /ai/chat` â€” temporary Gemini-backed frontend demo endpoint; accepts recent `{role: "user" | "model", content}` messages and returns `{answer, model}`. It does not read BayMax memories or persist server-side conversations. The frontend may keep the demo chat in browser local storage. Requires `GEMINI_API_KEY`; revisit when authenticated conversation storage and approved retrieval are implemented.
- `POST /conversations`
- `GET /conversations`
- `GET /conversations/{id}`
- `POST /conversations/{id}/messages`
- `POST /conversations/{id}/feedback`

## Voice
- `POST /voice/records` — create upload/record metadata.
- `POST /voice/records/{id}/transcribe`
- `GET /voice/records/{id}`
- `POST /voice/records/{id}/approve-entry`

## Actions
- `POST /actions/proposals`
- `GET /actions/proposals`
- `POST /actions/proposals/{id}/confirm`
- `POST /actions/proposals/{id}/reject`
- `GET /actions/executions/{id}`

## Archive
- `POST /exports/conversations/{id}`
- `POST /exports/memories/{id}`
- `POST /exports/archive`
- `GET /exports/{job_id}`

## Legacy
- `GET /legacy/beneficiaries`
- `POST /legacy/beneficiaries`
- `POST /legacy/policies/validate`
- `POST /legacy/policies`
- `POST /legacy/release-simulations`
- `GET /legacy/accessible-memories`
- `POST /legacy/conversations/{id}/messages`

## Contract rules
- Return consistent error envelopes with machine-readable codes.
- Validate ownership and authorization on every resource endpoint.
- Do not trust frontend role flags.
- Exports and old conversations must re-check current access.
- Do not expose internal storage keys or secrets.
- Paginate list endpoints.

## AI demo privacy boundary
- The demo endpoint sends the supplied chat history to Google's Gemini Developer API using a server-side API key. No saved BayMax records are retrieved or included. Browser local storage is not secure and is not a substitute for protected persistence.
- Free-tier Gemini API content may be used by Google to improve its products; do not use this demo with sensitive or identifying personal information. See Google's [Gemini API pricing and data terms](https://ai.google.dev/gemini-api/docs/pricing).
- The API key must remain in `backend/.env` (or a server environment variable) and must never be exposed through a Vite `VITE_` variable.
