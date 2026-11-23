# 10 — Action Engine

## 1. MVP action types
- Timer.
- Reminder.
- Calendar event proposal (execution may be deferred if integration is unavailable).

## 2. Workflow
AI proposes -> backend validates type/parameters -> backend checks owner/session -> UI displays exact action -> owner confirms/rejects -> allowlisted executor runs -> result is audited.

Every action requires explicit confirmation in MVP, including apparently harmless timers and reminders.

## 3. Data model
`action_proposals`: owner, type, normalized parameters, status, expiry, idempotency key.

`action_executions`: proposal, approver, approval time, executor status, result and execution time.

## 4. Safety
- No arbitrary code execution.
- No unrestricted shell/OS access.
- No silent phone calls.
- Parameter validation and bounds.
- Confirmation must describe what will happen.
- Expired proposals cannot execute.
- Duplicate confirmation must not duplicate the action.
