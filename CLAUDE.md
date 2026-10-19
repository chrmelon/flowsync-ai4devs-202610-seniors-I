# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Context

FlowSync is a course exercise repo (LIDR AI4Devs, module 1, branch `s1/start`). It has two independent npm projects, each with its own `package.json` and lockfile. No root workspace exists. `README.md` is the exercise brief. It is generated, so don't edit it by hand. `prompts.md` is a template the student fills in. Docs and commit messages are in Spanish.

**The backend already exists and should not be modified in this exercise.** Work happens in `frontend/`. Read the backend to learn its API contract, especially the validators, because product tickets don't spell out every field the backend requires.

Requires **Node.js 24+**. Older versions fail with `Unknown file extension ".ts"`.

## Commands

### Backend (`backend/`, AdonisJS 7, port 3333)

```bash
npm install
cp .env.example .env && node ace generate:key   # first-time setup
node ace migration:run                          # SQLite at backend/tmp/db.sqlite3
npm run dev          # node ace serve --hmr
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run format       # prettier (@adonisjs/prettier-config)
npm test             # node ace test (Japa)
node ace test --files tests/functional/foo.spec.ts   # single file
node ace test --tests "test title"                   # single test by title
```

Test suites are defined in `adonisrc.ts`: `unit` (`tests/unit/**/*.spec.ts`) and `functional` (`tests/functional/**/*.spec.ts`, which boots the HTTP server). No tests exist yet. `.env.test` uses an in-memory session driver.

### Frontend (`frontend/`, React 19 + Vite 8, port 5173)

```bash
npm install
npm run dev       # vite
npm run build     # tsc -b && vite build (this is the typecheck)
npm run lint      # oxlint
```

The frontend has no test runner or formatter yet. It still contains the Vite starter template (`src/App.tsx`), so routing, an API client, and shadcn/ui have not been set up yet. The exercise expects shadcn/ui, whose components are copied into the repo instead of installed as a dependency. TS config is strict about unused locals and parameters, and it uses `verbatimModuleSyntax`, so use `import type` for types.

## Backend architecture

Request flow: `start/routes.ts` → controller → VineJS validator → Lucid model → transformer → `ctx.serialize()`.

- **API routes** (all under `/api/v1`):
  - `POST /auth/signup` → `NewAccountController.store`
  - `POST /auth/login` → `AccessTokensController.store`
  - `GET /account/profile` → `ProfileController.show` (protected by `middleware.auth()`)
  - `POST /account/logout` → `AccessTokensController.destroy` (protected by `middleware.auth()`)
- **Validators** (`app/validators/user.ts`) are the real API contract:
  - Signup requires `email` (unique), `password` (8–32 chars), and **`passwordConfirmation`** (must match `password`). `fullName` is nullable.
  - Login requires `email` and `password`.
  - A validation failure returns 422 with an `errors` array. Bad login credentials return a 400 error from `verifyCredentials`.
- **Auth**: the default guard is `api`, an opaque access-token guard (`config/auth.ts`). Tokens start with `oat_` and are sent as `Authorization: Bearer <token>`.
- **Response shape**: `providers/api_provider.ts` adds `ctx.serialize()`, which wraps every payload in `{ data: ... }`.
  - Signup and login return `{ data: { user, token } }`.
  - Profile returns `{ data: user }`.
  - `UserTransformer` controls exposed fields: `id`, `fullName`, `email`, `createdAt`, `updatedAt`, `initials`.
- `force_json_response_middleware` makes every response JSON, including errors.
- CORS allows every origin in development and none in production by default (`config/cors.ts`).
- Subpath imports (`#controllers/*`, `#models/*`, `#validators/*`, etc.) are defined in `backend/package.json`.
- **Generated files, don't edit:**
  - `database/schema.ts` is regenerated from migrations by `node ace migration:run`. Models extend these generated schema classes, for example `User extends compose(UserSchema, ...)`.
  - `.adonisjs/` holds generated controller indexes and the Tuyau client registry, created by hooks in `adonisrc.ts`. Routes reference controllers via `controllers.X` from `#generated/controllers`.
  - Local diffs in these files are usually only line endings (CRLF).
- Schema changes always go in a new migration under `database/migrations/`. Never alter tables by hand or edit an existing migration.
