# 09 — Archive and Export

## 1. Export targets
- Single conversation.
- Single memory.
- Selected memories/conversations.
- Complete owner archive.
- Beneficiary-visible archive, filtered by current authorization.

## 2. Formats
- PDF: readable sharing/printing.
- Markdown: portable human-readable text.
- TXT: plain text.
- JSON: structured data and metadata.
- ZIP: multi-file archive with manifest and attachments.

## 3. Export content
Conversation: title, timestamps, messages, roles, citations and attachment references.

Memory: canonical title/description, category, verification/review status, origin, dates, source entries, relationships and clearly labeled AI summary.

Archive: manifest, entries, versions, approved graph, conversations, citations, policy records where owner-authorized, and attachments where permitted.

## 4. Security
- Re-authorize every record at export time.
- Beneficiary export must use same Prolog-backed scope as viewing.
- Do not expose storage paths, credentials or hidden metadata.
- Large exports should use background jobs and short-lived download links.
- Log export creation and download events.
- Do not claim an export is complete if a component failed.

## 5. Integrity and portability
Include schema/version information and checksums in the ZIP manifest. Document that JSON is the structured interchange format. Do not include rejected candidates unless the owner explicitly selects them.
