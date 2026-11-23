# BayMax frontend design QA

Final result: blocked

## Captures and comparison

- Approved design reference: [design-reference-approved.png](./design-reference-approved.png)
- Implemented Home, light theme: [design-qa-home.png](./design-qa-home.png)
- Implemented Home, dark theme: [design-qa-dark.png](./design-qa-dark.png)
- Responsive mobile capture: [design-qa-mobile.png](./design-qa-mobile.png)
- Reference comparison viewport: 1440 × 1024.
- Responsive check viewport: 390 × 844.
- The shared browser reports a requested viewport that differs from the page's effective CSS viewport (for example, a 1440 px request yielded `window.innerWidth` around 714 px); captured images include unused blank space. This prevents a reliable same-size desktop fidelity comparison.

The approved image and implementation capture were reviewed together in the same Home state. The implementation preserves the central visual direction: a warm ivory canvas, coral actions, friendly rounded surfaces, a caring companion illustration, the approved headline, a visible light/dark switch, and a “Continue your story” memory section. The implementation intentionally uses a contained split hero rather than the reference’s full-bleed scene so the copy and controls remain legible across screen sizes. The reference’s sample memory cards were replaced with clearly labeled demo memories. However, the shared browser's effective viewport did not match its requested viewport, so screenshot-based fidelity at the approved 1440 px desktop width cannot be signed off; the final QA status remains blocked until recaptured in a correctly sized browser viewport.

## Results

- Visual hierarchy and typography: the page leads with one clear companion message, two primary tasks, then recent memories and optional quick starts. No duplicate page title remains above the hero.
- Theme consistency: both light and dark captures retain readable text, coral emphasis, and the same component hierarchy. Theme selection persists locally.
- Assets: the hero uses original project artwork. No decorative CSS illustration is used in place of the character image.
- Navigation and responsive behavior: desktop primary navigation and Explore menu work; at 390 px the hamburger opens all eight product destinations plus Settings, and the page stacks without forcing the canvas graph into a narrow column. The capture is usable for responsive structure, but not for final desktop pixel-fidelity signoff.
- Interaction checks: all nine routes rendered content; theme switch both directions, desktop Explore → Neural Canvas, mobile menu (all destinations), companion message send preview, memory add/delete, and Neural Canvas category filtering were exercised. The temporary test memory was removed afterward.
- Accessibility basics: semantic heading levels, labeled text input and controls, `aria-pressed` theme state, `aria-expanded` mobile menu state, descriptive hero alt text, visible focus styling, reduced-motion override, and a list route from the graph preview are present.
- Product boundaries: the footer marks local demo mode; conversation response, graph, review suggestions, action confirmations, archive, and Legacy Vault are explicitly not presented as connected AI/backend/authorization features.

## Known visual/product differences

- The illustration and hero are a close implementation of the approved direction, not a pixel-perfect reproduction. The approved image shows a simpler companion and a full-bleed scene; the app uses original generated artwork in a separate responsive image panel.
- The Neural Canvas is an illustrative static graph preview, not the planned infinite React Flow canvas. A list link is present.
- Interactions are browser-local demonstrations, not production persistence or secure personal-data handling.

The frontend build and lint also passed; the handoff and intentionally deferred integrations are tracked in [19-frontend-progress.md](./19-frontend-progress.md).
