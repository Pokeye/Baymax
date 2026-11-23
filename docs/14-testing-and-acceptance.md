# 14 — Testing and Acceptance

## 1. Unit tests
- OOP entry subclasses and writing-mode polymorphism.
- Functional normalization, correction, diff and hash functions.
- Parser tokens, AST and syntax errors.
- Prolog rule outcomes.
- Export serializers.
- Personalization candidate state transitions.

## 2. Integration tests
- Register -> create diary entry -> version entry.
- Entry -> candidate extraction -> owner approval -> graph node.
- Approved graph -> Neural Canvas API projection.
- User asks question -> only authorized records retrieved -> citations validated.
- Policy source -> parser -> Prolog -> access decision.
- Action proposal -> confirmation -> one execution -> audit event.
- Export -> reauthorization -> downloadable artifact.

## 3. Security tests
- User A cannot access User B's records.
- Beneficiary cannot access before release.
- Explicit deny wins over allow.
- Unknown resource denies.
- Prolog unavailable denies.
- Invalid policy cannot replace last valid policy.
- Old conversation is re-authorized when reopened.
- Unauthorized record ID never appears in AI context.
- Export does not leak unauthorized attachments.
- Prompt injection in a diary entry cannot alter system behavior or permissions.

## 4. Integrity tests
- Changing an entry without updating hash causes verification failure.
- Broken previous-hash link is detected.
- New version preserves original.
- Document canonical serialization and limitations.

## 5. Acceptance criteria
A thesis MVP is acceptable when:
- Required paradigm modules are demonstrably implemented.
- At least two entry types and multiple writing modes work.
- Functional transformations are pure and tested.
- Hash-chain tampering is detected.
- Custom policy grammar/parser/interpreter compiles into Prolog.
- Prolog tests cover allow, deny, conflict and release.
- AI answers cite permitted source entries and report no record when evidence is absent.
- Unauthorized records never reach model context.
- Memory suggestions require owner review.
- Canvas displays approved nodes and typed edges.
- Action proposals require explicit confirmation.
- Voice recording is manual and owner-reviewed.
- Export rechecks permissions.
- Setup and demo instructions are reproducible.
