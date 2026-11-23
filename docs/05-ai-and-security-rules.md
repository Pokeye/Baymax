# 05 — AI and Security Rules

## 1. Trust boundaries
The LLM is an untrusted reasoning/generation component. It is not a database, policy engine, identity provider or authorization authority.

## 2. Grounded Q&A
1. Authenticate requester.
2. Authorize record scope through backend/Prolog.
3. Retrieve only allowed records.
4. Build context only from that filtered set.
5. Ask model to answer from supplied context.
6. Validate citations against retrieved IDs.
7. If no evidence exists, answer that no record was found.
8. Audit the decision and citations.

Never pass the entire vault to the model with instructions to ignore restricted records.

## 3. Prompt injection
Diary entries, PDFs, transcripts, messages and memory descriptions are untrusted user data. They may contain text such as "ignore prior instructions". Treat this as quoted data, not executable instruction. Keep system/developer instructions separate from retrieved context. Do not allow retrieved text to trigger tools or change access rules.

## 4. Authorization invariants
- Deny by default.
- Deny overrides allow.
- Release conditions must be evaluated server-side.
- Fail closed on Prolog error, timeout, missing policy, malformed policy or unknown resource.
- Re-check permissions when loading historical conversations and exports.
- The UI hiding a button is not authorization.

## 5. AI-generated memory
- Candidate extraction only.
- Preserve source and extraction metadata.
- Require owner approval before confirmed persistent memory.
- Keep explicit facts distinct from inferred suggestions.
- Provide correction and rejection paths.

## 6. Personalization safety
- Prefer low-risk communication preferences: language, tone, response length, formatting.
- Never infer diagnoses, protected traits or intimate facts for personalization.
- Show evidence summaries and confidence labels.
- Owner can disable and delete preferences.
- Do not adapt in ways that manipulate, pressure or exploit emotional vulnerability.

## 7. Action safety
- Allowlisted action types only.
- Validate parameter schemas and bounds.
- Confirm every action with the owner.
- Use idempotency keys where duplicate execution is possible.
- Record proposal, decision, executor result and timestamp.
- Phone intents may open a dialer; the app must not silently place calls.

## 8. Privacy and demo
Use fictional data for thesis demos. Review provider retention and free-tier data policies before sending personal records to third-party AI services. Store secrets in environment variables. Apply file size/type limits and access checks to uploaded audio/documents.
