# Repository Guidelines
## General Code Rules

### RULES YOU ABSOLUTELY MUST FOLLOW!

Agents, you must preserve the exact wording of the following bullet points.

- DO NOT USE `any`. YOU DO NOT HAVE TO USE `any`. If you are using `any`, you are adding a bug. I'm serious.
- If you are doing `as any`, you're doing it wrong. You should not need `as any`. Figure it out. Fix your types first. Your compiler is your best friend. I don't care what is happening in the browser if there are type errors in my code. Make it work. Do not resort to a band-aid like `any`. Use `unknown` if you have to, because that is what it's there for. Get an error with `unknown`? Good, that's what it's there for. When you fix that error, you will have solved a problem for yourself ahead of time. THIS IS YOUR GOSPEL.
- Just as bad as `any` is `@ts-ignore` and `@ts-ignore-error`. Never use any of these.
- IF YOU ARE CASTING, YOU ARE DOING IT WRONG. NO CASTING. You are very possibly hiding a bug. It's only a step up from `as any`. Doing `as X` is almost as bad. Doing `as unknown as X` is even worse than `as X`. Casting is only necessary in very rare cases. Consider it banned. **If it has to happen, you MUST make that argument to me and receive my confirmation that it be allowed in the codebase.**
- Using `satisfies` is smelly. If you are doing this, consider why you are doing it. If you're doing it because it seems like the only way to fix some type issue, then you are probably doing it wrong. This is useful in only very rare cases, in my opinion. **If it has to happen, you MUST make that argument to me and receive my confirmation that it be allowed in the codebase.**
- FIX YOUR TYPES FIRST. If you have type errors, do not put band-aids on them. Fix them. Every time you fix a type error, you are solving a problem for yourself ahead of time. If the types are too complicated, maybe the code is too complicated and you should rewrite it to be simpler. I don't want to see you testing or trying anything out if the types are broken. Fix them first, always.

### TypeScript Discipline

- Strict TypeScript only. Do not weaken types to "make it work". Fix types first.
- Never use `any`. If you think you need `any`, revisit the design. Prefer precise types; use `unknown` if necessary and narrow explicitly.
- Do not use `@ts-ignore` or `@ts-expect-error` as band-aids. Address the root cause.
- Avoid casting (`as T` or double-cast `as unknown as T`). Casting hides bugs and is only acceptable in rare, justified cases with prior maintainer approval.
- Be skeptical of `satisfies`. If it seems required, reevaluate the types or API. Only use with explicit reviewer approval and rationale.
- Interfaces over anonymous types when naming enriches clarity and reuse.
- No path aliases; always use relative ES module imports.
- Formatting and style: 2-space indent, semicolons on, double quotes.

> Core mantra: "Fix your types first." If types are too complicated, simplify the code.

### Nullish Checks

- Use `x == null` and `x != null` exclusively for nullish checks so both `null` and `undefined` are handled. Use `===`/`!==` everywhere else. ESLint is configured (`eqeqeq` with `{ null: "ignore" }`) to enforce this.
- Do not use `=== undefined` or `=== null` or `!== undefined` or `!== null`. If you must compare directly against a nullish value to exclude the other one, you're probably doing something wrong. **Just use `== null` or `!= null` instead!**
- Don't positively check a type if you really mean to check if something is nullish. For example, don't do `if (typeof someNullableString === 'string')`, do `if (someNullableString != null)`. You're masking other type issues when you use the former style.

### Style and Naming

- No one-letter identifiers. Use descriptive variable, parameter, and function names for readability.
- Allowed exceptions: loop indices `i`/`j`/`k` and coordinates `x`/`y`.
- ESLint enforces `id-length` with min 2, excluding properties; `_` is allowed as a throwaway placeholder.
- Tests are allowed to use short identifiers when it meaningfully improves brevity (e.g., tiny helpers); the linter permits this only in `*.test.ts[x]` files.
- For canvas transforms, avoid `a..f`—prefer descriptive names (e.g., `m11`, `m12`, `dx`, `dy`).

### Coding Style & Conventions

- TypeScript strict; 2-space indent; semicolons on; double quotes.
- Filenames should be named for the main exported thing in that file. If the file mainly exports a class called `FooBar`, then the file should be called `FooBar.ts` (even if it also exports a helper function named `createFooBar`, for instance). If the file mainly exports a function called `doThing` or a constant called `thingStore`, it should be called `doThing.ts` or `thingStore.ts`. Modules with no main export should be named a sensible categorical name in camelCase like `utils.ts` or `blahBlah.ts`.
- Acronyms and initialisms should be treated like normal words in camelCase or PascalCase identifiers; e.g., `someHtmlThing` not `someHTMLThing`, `JsonParser` not `JSONParser`, etc.
- No path aliases; use relative ES module imports.
- Lint/format via ESLint + Prettier; pre-commit hooks via Husky + lint-staged.
- Whitespace is your friend. Be readable.
- Generally prefer interfaces over anonymous types.

### Testing Philosophy

- Remove legacy code promptly. Do not keep old paths or duplicate logic "just in case" or to appease stale tests.
- Tests are there to validate the application. The application is not there to validate the tests.
  - If a test enshrines behavior we no longer want, change or delete the test alongside the code change.
  - Do not retain legacy code paths solely to keep tests green.
- Keep tests aligned with the intended product behavior. Prefer high-value, integration-style tests at stable boundaries.
- When refactoring, update tests to reflect the new design; do not preserve obsolete seams.
- We want comprehensive unit tests which test INTENDED behavior (not just EXISTING behavior... which may actually be broken in some cases! We'll find out when we write tests against INTENDED BEHAVIOR.)
- Prefer testing outcomes and results, not testing that certain functions get called. There are plenty of exceptions to this rule, but try to stick to it. If there's a way to test the outcome/result without testing the internal implementation, that is a better test.

> Direct quote for emphasis: "GET RID OF THE LEGACY STUFF. Things SHOULD NOT hang around JUST TO SATISFY TESTS. Tests are there to validate your application. Your application is NOT THERE TO VALIDATE THE TESTS."

### Tooling Discipline

- Do not change ESLint rules unless explicitly instructed. Fix code and types to satisfy the existing configuration.

## Project Structure & Module Organization
- `apps/desktop/` hosts the Electron shell. Keep main-process code under `src/main/` and renderer UI in `src/renderer/`.
- `packages/core/` should capture narrative orchestration, prompt templates, and persistence adapters; isolate LLM-specific helpers here.
- Prompt templates live in `packages/core/src/prompts/` as `.ts` modules exporting pure functions.
- `packages/ui/` collects reusable React components (inventory panels, map views); colocate component-level assets next to code.
- Persist generated adventures in `stories/<story-id>/` as JSON bundles (story log, inventory, journal, map). Avoid committing real player data; use fixtures under `stories/__fixtures__/`.

## Build, Test, and Development Commands
- `npm install` installs workspace dependencies; run from repo root.
- `npm run dev` launches the Electron app with hot reload for renderer and main processes.
- `npm run build` outputs a production bundle and staged assets under `dist/`.
- `npm run test` executes unit and integration suites; add `--watch` while developing.
- `npm run lint` runs TypeScript checks and formatting verification; keep CI green before pushing.

## Testing Guidelines
- Unit tests belong in `__tests__` folders with `.spec.ts` suffix, leveraging Vitest.
- Renderer UI interactions should be covered with Playwright specs in `apps/desktop/tests/`.
- Provide canned LLM transcripts in `tests/fixtures/` to avoid flaky network calls.
- Target >80% branch coverage for core narrative and persistence layers; document gaps in PRs.

## Commit & Pull Request Guidelines
- Use concise, imperative commit messages (`Add map synchronization helper`). Squash noisy WIP commits locally.
- Reference issues in the PR body, summarize UI changes with screenshots or GIFs, and capture schema updates plainly.
- CI must pass before requesting review; include reproduction steps for any bugfixes and note impacts on saved stories.

## Security & Configuration Tips
- Store API keys in `.env.local`; never hard-code secrets or commit `.env`.
- When introducing new model providers, keep adapter secrets behind `packages/core/src/config/env.ts` and guard with runtime validation.
