# 07 — Adaptive Companion Personalization

## 1. Goal
Adapt communication to the owner's approved preferences without pretending to know their identity or silently constructing a psychological profile.

## 2. Preference dimensions
MVP:
- Preferred language / code-switching.
- Tone: formal, neutral, casual.
- Response length: concise, balanced, detailed.
- Formatting: bullets, prose, examples.
- Explanation style: beginner-friendly, technical, analogy-based.

Later:
- Topic-specific preferences.
- Accessibility preferences.
- Preferred reminder style.

## 3. Evidence classes
- `EXPLICIT`: owner directly states a preference.
- `OBSERVED`: repeated behavior suggests a pattern.
- `INFERRED`: weak or uncertain hypothesis.

Only owner-approved preferences become active profile settings. Preserve origin even after approval.

## 4. Workflow
Interaction -> candidate preference -> evidence summary -> owner review -> approve/edit/reject -> active profile -> response adaptation.

Do not change the profile based on one unusual message. Avoid sensitive-trait inference and psychological diagnosis.

## 5. Runtime use
Build a compact personalization instruction from approved settings only. Do not dump the entire profile or diary into every prompt. Personalization must not override safety, truthfulness, authorization or user instructions.

## 6. UI
"How BayMax Knows You" page:
- Approved preferences.
- Suggested preferences awaiting review.
- Evidence and origin labels.
- Edit, disable and delete controls.
- Clear all personalization option.
