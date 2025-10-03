# Games Bookstore Requirements

## Project Vision
- Deliver a desktop Electron application that lets players experience LLM-driven interactive fiction with a futuristic terminal aesthetic.
- Support creating new adventures and resuming saved stories, persisting all game state locally.

## Core Gameplay Loop
- Present a central story text panel showing narrative output from the LLM, updating after each player turn.
- Provide an input box where the player enters concise actions; submit these actions to the LLM for adjudication.
- Implement LLM prompting that treats the player input as an attempted action, enforces grounded outcomes, and keeps narrative control with the LLM.
- Allow the LLM to partially approve player actions when appropriate and explain the outcome in the story text.
- Maintain strict guardrails so the LLM remains lenient yet realistic, occasionally giving corrective feedback.

## Story Persistence and Management
- Automatically persist active adventures after every turn, including narrative transcript and structured state (items, journal, damage/vitals, map, contacts, appearance, and any future entities).
- Provide a menu to list saved adventures, resume them, and start new ones from curated prompts.
- Persist all structured data in JSON files on disk alongside the transcript in a consistent schema per entity type.

## Structured Data Generation
- After each story update, call an LLM workflow that produces valid JSON representations for:
  - Inventory items with rich descriptions.
  - Journal entries summarizing notable events.
  - Damage state, including health statistics and active conditions.
  - Map updates marking locations and current position.
  - Contact records with names, details, and communication info.
  - Character appearance details and changes.
- Validate generated JSON before storage; if invalid, retry the LLM request.
- Architect the system to support three execution modes (inline with story output, single follow-up call, or per-entity calls) with mode B (single follow-up call) as the preferred default.

## UI and UX
- Build the layout with a center-aligned story pane surrounded by collapsible panels for inventory, journal, map, contacts, damage/vitals, and appearance.
- Ensure panels can expand/collapse and adapt for future mobile-friendly layouts.
- Apply a futuristic terminal visual style using Tailwind CSS, with theme support (dark default, optional light theme). Theme variables must control color, typography, spacing, and corner radius.
- Include a dedicated phone-style interaction UI for contacts that initiates side conversations with the LLM and returns to the main story when complete.

## Platform and Technology
- Implement the application with Electron, React functional components, and TypeScript under strict compiler settings.
- Use React context for shared state; keep components small and focused.
- Integrate Tailwind CSS for styling without introducing path aliases; rely on relative imports.
- Support model configuration for OpenAI, Anthropic, and Ollama providers, storing credentials locally and securely without exfiltration.

## LLM Integration Requirements
- Expose settings to select provider, model name, and any needed endpoints (including host/port for Ollama).
- Build prompting pipelines that supply the LLM with conversation history, player action, and relevant world state.
- Emphasize strict JSON output requirements in prompts for structured data, and implement retries on malformed responses.
- Keep story generation and structured data extraction logically separate so each call has a singular focus.

## Developer Discipline
- Enforce strict TypeScript without using `any`, casts, or `@ts-ignore`; prefer `unknown` with explicit narrowing when needed.
- Resolve type errors before running or testing code; simplify designs that lead to complex typing.
- Maintain 2-space indentation, semicolons, and double quotes; avoid path aliases and prefer interfaces when naming helps clarity.
- Do not modify linting or formatting configuration; adapt code to pass existing tooling.

## Testing Requirements
- Create unit and integration tests that verify intended behaviour of the gameplay loop, persistence, structured data parsing, and UI presentation.
- Remove obsolete code paths rather than keeping them for failing tests; update or discard tests that no longer reflect desired behaviour.
- Prefer outcome-focused tests over implementation detail checks, while remaining vigilant for regressions in core functionality.

## Extensibility Considerations
- Design storage and LLM pipelines so new entity types (e.g., future features) can be added without major refactors.
- Keep theming, layout, and prompting configs modular to enable future customization and experimentation.

## Delivery Checklist
- Running application supports creating, saving, and resuming adventures with full structured data sync.
- UI matches required layout and theming, with functional panels and contact-phone experience.
- All TypeScript type checks and lint rules pass without exceptions or casts.
- Automated tests cover core scenarios and run successfully.
