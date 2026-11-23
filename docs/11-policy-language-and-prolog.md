# 11 — Policy Language and Prolog

## 1. Required pipeline
Policy source -> lexer -> tokens -> recursive-descent parser -> AST -> semantic validation -> interpreter/compiler -> Prolog facts/rules -> authorization query.

Do not replace the custom language with hardcoded UI conditionals. Prolog must genuinely participate in access decisions.

## 2. Minimum statement families
Define at least four statement types. Recommended language concepts:
1. `beneficiary` declaration.
2. `allow` grant with resource selector.
3. `deny` restriction.
4. `release` condition/date.
5. Optional `freeze` or `default` statement.

The exact syntax must be finalized in the EBNF and documented with at least three sample programs.

## 3. Example illustrative syntax
This is a design sketch, not a finalized grammar:
```text
beneficiary "Mira";
allow "Mira" memory "education" after "2030-01-01";
deny "Mira" memory "private";
release after "2030-01-01";
```

## 4. Required semantics
- Deny by default.
- Explicit deny overrides allow.
- Release date/trigger is evaluated server-side.
- Unknown beneficiary/resource/action means deny.
- Invalid policy does not replace the last valid policy.
- Policy is frozen after the defined simulated release event.
- Access decisions should return reason codes for audit/debugging.

## 5. Prolog
Represent normalized policy facts and write rules for:
- beneficiary identity,
- release state,
- matching resource scope,
- allow grant,
- explicit deny,
- final access decision.

Test allow, deny, conflict, pre-release, post-release, unknown user, unknown resource and Prolog failure. Fail closed if the Prolog process is unavailable or returns malformed output.
