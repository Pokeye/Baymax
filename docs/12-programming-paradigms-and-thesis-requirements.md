# 12 — Programming Paradigms and Thesis Requirements

This document maps the original student handout requirements to implementation.

## 1. Diary model — OOP
Implement owner, entries (at least two types), beneficiary, vault, protocol and grant. Use inheritance, polymorphism and encapsulation. Example: abstract `DiaryEntry` with `TextEntry` and `VoiceEntry` subclasses; preserve domain invariants in methods/services.

## 2. Entry processing — Functional
Implement pure functions over immutable inputs for:
- normalization,
- name/topic extraction or normalization,
- correction/cleaning,
- diff/version comparison,
- canonical serialization and hash computation.

Avoid hidden mutation and side effects in pure functions. Keep I/O in adapters/services. Use append-only records and a hash chain.

## 3. Writing modes — OOP
Implement polymorphic modes such as:
- `Verbatim`: no content changes.
- `LightFix`: limited spelling/grammar cleanup.
- `Review`: suggestions or review annotations.

Always preserve original content. Each mode should have a common interface and tests.

## 4. Access rules — Logic / Prolog
Facts/rules determine registered people's access. Deny by default; deny overrides allow; evaluate release conditions; freeze policy after release simulation.

## 5. Legacy Policy language — language design
Provide EBNF grammar, lexer, recursive-descent parser and interpreter that compiles policies into Prolog facts. At least four statement types and at least three sample policy programs.

## 6. Grounded AI Q&A — scripting
Answer only from entries the asker may see. Cite each entry by date/source. Say when no record exists. Unauthorized entries must never reach the AI provider.

## 7. Typed exceptions
Implement and test:
- `AccessDenied`
- `AmbiguousName`
- `TamperDetected`
- `PolicySyntaxError`

Use safe error handling; do not leak private record content in error messages.

## 8. Optional features
Prioritize only after required elements work: manual voice, documents/photos, split keys, timeline/mood summaries, additional policy statements, web/mobile interface, dead-man's-switch check-in. Avoid scope expansion that jeopardizes core requirements.

## 9. Deliverables checklist
- Working prototype and source.
- README and setup instructions.
- Design note.
- EBNF grammar and at least three sample programs.
- Prolog rules and access test table.
- Parser tests.
- Design report.
- AI-use log.
- Linear workspace/weekly updates if required by course.
- Extra paradigms/features list.
- Presentation and live demo.
- Team names on required files.

## 10. Defense preparation
Be ready to explain:
- Why Prolog instead of ordinary conditionals.
- Why immutable processing and hash-chain integrity.
- How deny/allow conflicts resolve.
- How unauthorized records are prevented from reaching the LLM.
- How AI-generated code was reviewed and tested.
- Which modules demonstrate each paradigm.
