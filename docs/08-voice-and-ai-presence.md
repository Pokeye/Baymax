# 08 — Voice and AI Presence

## 1. MVP voice capture
1. Owner explicitly starts recording.
2. Show recording indicator and elapsed time.
3. Owner stops recording.
4. Upload audio securely.
5. Generate raw transcript.
6. Generate cleaned transcript and optional summary as separate derivatives.
7. Owner reviews/edits.
8. Owner approves saving as diary/knowledge entry.
9. Extract memory candidates for separate review.

No always-listening, background capture or live transcription in MVP.

## 2. Preserve separate artifacts
- Original audio file.
- Raw transcript.
- Cleaned transcript.
- AI summary.
- Approved diary/knowledge entry.

Never overwrite raw transcript with cleaned text.

## 3. AI Presence
States: `IDLE`, `LISTENING`, `THINKING`, `RETRIEVING`, `SPEAKING`, `ACTION_PENDING`, `ERROR`.

The visual orb is an interface indicator, not a real representation of model cognition. Do not imply the system is conscious.

## 4. Speech output
Use a configurable TTS provider or browser capability if suitable. Text chat must remain usable when voice services are unavailable. Show the transcript for spoken answers.

## 5. Consent and retention
Recording must be deliberate and visible. Do not record other people without appropriate consent. Define retention/deletion behavior for audio files and transcription provider handling.
