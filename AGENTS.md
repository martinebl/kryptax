# AGENTS.md

## Commands

```bash
npm run check   # Type-check (svelte-check + tsc)
npm run test    # Run all tests (vitest run)
npm run dev     # Start dev server
npm run build   # Production build
npm run preview # Preview production build
```

## CI order

`test` → `build`. The deploy workflow runs tests before building.

## Stack

Vite + Svelte 5 + TypeScript + Tailwind CSS 4 + bignumber.js

## Architecture

- `$lib` alias maps to `src/lib`
- `src/lib/engine/` — tax computation logic (lot-tracker, calculators)
- `src/lib/types/` — shared TypeScript interfaces
- `src/lib/importers/` — exchange CSV parsers (Binance, Ledger, etc.)
- `src/lib/converters/` — price fetchers (CoinGecko, Frankfurter, CSV)
- `src/lib/rules/` — JSON tax rules per country

## Key conventions

- **BigNumber for all monetary/crypto amounts** — never native floats. Price maps, CSV prices, quantities, intermediate calc all use `bignumber.js`.
- **Test files** use `.test.ts` suffix, placed next to the code they test.
- **Tax rules are JSON data** — the engine interprets them, no hardcoded country logic.
- **Absolute imports** via `$lib` alias only — no relative paths.
- **Functional style** — prefer map/filter/reduce, pure functions, `const` over `let`.
- **UI components should not contain business logic** — delegate to engine/lib.

## Testing

- Write tests before implementing new functionality (TDD).
- Test against the interface contract, not implementation details.
- **Never copy real dates or amounts from user-provided CSV snippets into test data.** Randomize them so tests are independent of real user data.

## Price resolution order

1. Local CSV files (user-imported, fully offline)
2. CoinGecko API (free tier, rate-limited, limited to ~1 year of history)
3. Frankfurter API (fiat-to-fiat via ECB data)

## No monorepo

Single npm package. No workspace, no multi-package boundaries.