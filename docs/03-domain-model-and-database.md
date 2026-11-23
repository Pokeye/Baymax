# 03 — Domain Model and Database

## 1. Modeling rules
- PostgreSQL is canonical storage.
- Neural Canvas nodes/edges are projections of graph entities/relationships.
- A source entry remains authoritative; extracted summaries are derivatives.
- Use UUID primary keys, timestamps in UTC, foreign keys and indexes.
- Use migrations for all schema changes.

## 2. Main entities
### Identity
- `users`: id, email, password_hash, role, created_at, status.
- `owner_profiles`: user_id, display_name, timezone, profile_settings.
- `beneficiaries`: id, owner_id, user_id or invited_email, display_name, status.

### Diary and integrity
- `diary_entries`: id, owner_id, entry_type, title, original_content, current_version_id, created_at, visibility, content_hash, previous_hash.
- `entry_versions`: id, entry_id, version_number, content, created_at, created_by, change_reason.
- `entry_tags`: id, entry_id, tag.
- Use append-only semantics for original content and version history.

### Memory graph
- `memory_candidates`: id, owner_id, candidate_type, payload, origin_type, review_status, confidence_label, source_entry_id, extracted_at, reviewed_at, reviewed_by.
- `memory_entities`: id, owner_id, entity_type, canonical_name, description, verification_status, created_at.
- `memory_relationships`: id, owner_id, source_entity_id, target_entity_id, relationship_type, verification_status, source_candidate_id.
- `memory_sources`: id, entity_id or relationship_id, source_entry_id, source_span, source_kind.
- `memory_reviews`: id, candidate_id, reviewer_id, decision, edited_payload, reviewed_at, notes.

### Personalization
- `communication_preferences`: id, owner_id, preference_key, preference_value, origin_type, review_status, active, updated_at.
- `preference_candidates`: id, owner_id, preference_key, proposed_value, evidence_summary, origin_type, review_status, created_at.
- `adaptation_feedback`: id, owner_id, conversation_id, feedback_type, details, created_at.

### AI conversations
- `conversations`: id, owner_id, title, created_at, updated_at, mode.
- `messages`: id, conversation_id, role, content, created_at, provider_metadata.
- `message_citations`: id, message_id, source_entry_id, quoted_excerpt, citation_label.

### Voice
- `voice_records`: id, owner_id, storage_key, duration_seconds, recorded_at, consent_confirmed, status.
- `voice_transcripts`: id, voice_record_id, raw_transcript, cleaned_transcript, summary, transcription_provider, reviewed_at, approved_entry_id.

### Actions
- `action_proposals`: id, owner_id, action_type, parameters_json, status, proposed_at, expires_at.
- `action_executions`: id, proposal_id, approved_by, approved_at, execution_status, result_json, executed_at.

### Legacy and audit
- `protocols`: id, owner_id, name, source_text, status, created_at.
- `policy_versions`: id, protocol_id, version, source_text, compiled_artifact, status, frozen_at.
- `grants`: id, protocol_id, beneficiary_id, resource_selector, permission, conditions_json.
- `access_decisions`: id, requester_id, resource_id, decision, reason_code, evaluated_at.
- `audit_logs`: id, actor_id, event_type, resource_type, resource_id, metadata_json, created_at.

## 3. Important enums
`origin_type`: `EXPLICIT`, `AI_EXTRACTED`, `INFERRED`.

`review_status`: `PENDING`, `APPROVED`, `REJECTED`.

`verification_status`: `CONFIRMED`, `UNVERIFIED`, `DISPUTED`.

Do not collapse these into one field. A fact can be AI-extracted and later owner-approved; its origin remains AI_EXTRACTED while review_status becomes APPROVED.

## 4. Neural Canvas categories
Suggested stable category keys and colors:
- `HEALTH_FITNESS` — green `#22C55E`
- `FOOD_NUTRITION` — amber `#F59E0B`
- `EDUCATION_LEARNING` — blue `#3B82F6`
- `WORK_PRODUCTIVITY` — violet `#A78BFA`
- `PEOPLE_RELATIONSHIPS` — pink `#EC4899`
- `RECREATION_HOBBIES` — cyan `#06B6D4`
- `PERSONAL_LIFE` — orange `#F97316`
- `PLACES_EVENTS` — slate `#94A3B8`

An entity may have multiple tags/categories if the domain model supports it. Example: protein can relate to both Food & Nutrition and Health & Fitness. Do not duplicate the entity just to show it in two contexts.

## 5. Integrity
For each append-only entry event, compute a deterministic canonical representation and SHA-256 hash that includes the previous event hash. Define canonical serialization and encoding in code/docs. Hash chaining detects modification; it does not by itself prove authorship or prevent a privileged database administrator from rewriting the whole chain. Explain this limitation in the thesis.
