# AGENTS.md

Wskazowki dla asystentow AI pracujacych w tym repozytorium.
Guidance for AI assistants working in this repository.

## Cel / Goal

**PL**

- Wprowadzaj mozliwie najmniejsza bezpieczna zmiane, ktora rozwiazuje zadanie.
- Zachowuj istniejaca architekture i lokalne konwencje.
- Nie refaktoryzuj niepowiazanych obszarow, jesli zadanie tego wyraznie nie wymaga.

**EN**

- Make the smallest safe change that solves the task.
- Preserve the existing architecture and local conventions.
- Do not refactor unrelated areas unless the task explicitly requires it.

## Przeglad Projektu / Project Overview

**PL**

- Stack frontend: `Vite`, `React 18`, `TypeScript`, `Ant Design`, `Redux Toolkit Query`, `React Router`, `Vitest`, `Storybook`.
- Stack backend: `NestJS`, `TypeScript`, `MongoDB`, `Mongoose`, `JWT`, `Jest`.
- Menedzer pakietow: tylko `npm`. Repo uzywa `package-lock.json`.
- Glowne obszary aplikacji:
  - `frontend/src/features/` dla modulow domenowych frontendu.
  - `frontend/src/common/` dla wspoldzielonego kodu frontendu.
  - `frontend/src/layouts/` dla layoutow.
  - `frontend/src/store/` dla Redux/RTK Query.
  - `backend/src/modules/` dla modulow domenowych backendu.
  - `backend/src/common/` dla wspoldzielonego kodu backendu.

**EN**

- Frontend stack: `Vite`, `React 18`, `TypeScript`, `Ant Design`, `Redux Toolkit Query`, `React Router`, `Vitest`, `Storybook`.
- Backend stack: `NestJS`, `TypeScript`, `MongoDB`, `Mongoose`, `JWT`, `Jest`.
- Package manager: `npm` only. The repo uses `package-lock.json`.
- Main application areas:
  - `frontend/src/features/` for frontend domain modules.
  - `frontend/src/common/` for shared frontend code.
  - `frontend/src/layouts/` for layouts.
  - `frontend/src/store/` for Redux/RTK Query.
  - `backend/src/modules/` for backend domain modules.
  - `backend/src/common/` for shared backend code.

## Zasady Pracy / Working Rules

**PL**

- Przed edycja sprawdz okoliczny kod. Dopasuj sie do istniejacego nazewnictwa, struktury i wzorcow.
- Zakladaj, ze worktree moze juz zawierac inne zmiany. Nie cofaj niepowiazanych zmian uzytkownika.
- Preferuj precyzyjne, ograniczone zmiany zamiast szerokiego porzadkowania kodu.
- W sygnaturach funkcji, propsach, aliasach typow i obiektach parametrow ukladaj pola w kolejnosci: najpierw wartosci proste i dane wejsciowe, potem tablice i obiekty, nastepnie funkcje, a pola opcjonalne na koncu.
- Jesli funkcja potrzebuje wiecej niz 2 parametrow i kontrakt na to pozwala, preferuj pojedynczy obiekt parametrow.
- Nie uzywaj `void` przed wywolaniem funkcji tylko po to, by zignorowac zwracana wartosc lub promise, chyba ze lokalny kontrakt albo narzedzie tego wymaga.
- Nigdy nie commituj sekretow z `.env` lub `.env.local` i nie kopiuj ich wartosci do plikow zrodlowych.

**EN**

- Inspect the surrounding code before editing. Match the existing naming, structure, and patterns.
- Assume the worktree may already contain other changes. Do not revert unrelated user changes.
- Prefer precise, limited changes over broad cleanup.
- In function signatures, props, type aliases, and parameter objects, order fields as follows: simple values and inputs first, then arrays and objects, then functions, with optional fields at the end.
- If a function needs more than 2 parameters and the contract allows it, prefer a single parameter object.
- Do not use `void` before function calls only to ignore a returned value or promise unless a local contract or tool explicitly requires it.
- Never commit secrets from `.env` or `.env.local`, and do not copy their values into source files.

## TypeScript i Importy / TypeScript and Imports

**PL**

- Utrzymuj typy jawne i poprawne.
- Preferuj importy `type`, gdzie to mozliwe.
- Uzywaj aliasow sciezek z `tsconfig.json`, szczegolnie `@/...` na froncie.
- Zachowuj kolejnosc importow wymuszana przez ESLint i lokalny format command.
- Zachowuj alfabetyczna kolejnosc importow w grupach i puste linie miedzy grupami.
- Usuwaj nieuzywane importy i nieuzywane zmienne wprowadzone przez swoja zmiane.

**EN**

- Keep types explicit and correct.
- Prefer `type` imports where possible.
- Use path aliases from `tsconfig.json`, especially `@/...` on the frontend.
- Follow the import order enforced by ESLint and the local format command.
- Keep imports alphabetized within groups and preserve blank lines between groups.
- Remove unused imports and unused variables introduced by your change.

## Granice Architektury / Architecture Boundaries

**PL**

- Umieszczaj kod domenowy w odpowiednim drzewie `features/<feature>/...` na froncie albo `backend/src/modules/<module>/...` na backendzie.
- Kod wspoldzielony miedzy feature'ami umieszczaj w `common/...`.
- Nie przenos kodu do `common`, jesli nie jest faktycznie uzywany w wielu miejscach.
- Trzymaj hooki, komponenty, utils, consts, types, fixtures, stories i testy w ustalonych katalogach danego feature'a.
- `__stories__` i `fixtures` powinny byc blisko komponentu albo hooka, ktore opisuja.
- Testy e2e trzymaj oddzielnie od testow komponentow.
- Runtime stale i zbiory wartosci trzymaj w `consts/`. Aliasy typow, modele danych i kontrakty trzymaj w `types/`.
- Jesli logika zaczyna mieszac warunki biznesowe, wartosci graniczne i transformacje danych, rozdziel ja na nazwane helpery, consty i typy.

**EN**

- Place domain code in the proper `features/<feature>/...` tree on the frontend or `backend/src/modules/<module>/...` on the backend.
- Put code shared across features in `common/...`.
- Do not move code into `common` unless it is actually used in multiple places.
- Keep hooks, components, utils, consts, types, fixtures, stories, and tests in the established directories of the feature.
- `__stories__` and `fixtures` should stay close to the component or hook they describe.
- Keep e2e tests separate from component tests.
- Keep runtime constants and value collections in `consts/`. Keep type aliases, data models, and contracts in `types/`.
- If logic starts mixing business conditions, boundary values, and data transformations, split it into named helpers, constants, and types.

## Konwencje Stylow / Styling Conventions

**PL**

- Wykorzystuj istniejace wzorce stylowania zamiast wprowadzac nowe bez potrzeby.
- Frontend obecnie uzywa Ant Design i lokalnych plikow CSS. Dopasuj sie do okolicznego kodu.
- Jesli feature jest migrowany do Tailwind, rob to etapami i nie mieszaj szerokiego redesignu z refaktorem logiki.
- Nie dodawaj duzych zmian formatowania ani masowych zmian CSS bez zwiazku z zadaniem.

**EN**

- Use existing styling patterns instead of introducing new ones unnecessarily.
- The frontend currently uses Ant Design and local CSS files. Match the surrounding code.
- If a feature is migrated to Tailwind, do it incrementally and do not mix a broad redesign with logic refactoring.
- Do not add large formatting changes or broad CSS changes unrelated to the task.

## Formularze i Walidacja / Forms and Validation

**PL**

- Stosuj istniejace wzorce formularzy uzywane juz w danym feature.
- Trzymaj logike walidacji blisko istniejacych validatorow, hookow i utili zamiast duplikowac ja inline.
- Zlozone warunki walidacyjne rozbijaj na nazwane kroki posrednie.
- Zachowuj obecny ksztalt payloadow formularzy i mapowanie requestow, chyba ze zadanie wyraznie zmienia kontrakt.

**EN**

- Follow the existing form patterns already used in the feature.
- Keep validation logic close to the existing validators, hooks, and utilities instead of duplicating it inline.
- Break complex validation conditions into named intermediate steps.
- Preserve the current shape of form payloads and request mappings unless the task explicitly changes the contract.

## API i Dane / API and Data

**PL**

- Nie skladaj URL-i backendu w komponentach. Uzywaj wspolnej konfiguracji API.
- RTK Query powinno zostac warstwa pobierania danych na froncie, dopoki zadanie wyraznie nie zmienia tego kierunku.
- Po zmianach w kontraktach API aktualizuj typy request/response.
- Backendowe DTO, schematy i serwisy trzymaj w module domenowym.

**EN**

- Do not compose backend URLs inside components. Use shared API configuration.
- RTK Query should remain the frontend data-fetching layer unless the task explicitly changes that direction.
- When API contracts change, update request/response types.
- Keep backend DTOs, schemas, and services inside the domain module.

## Weryfikacja / Verification

**PL**

- Gdy to mozliwe, uruchamiaj ukierunkowana weryfikacje dla zmienionych obszarow.
- Dla frontendu preferuj:
  - `npm run format:check`
  - `npm run build --prefix ./frontend`
  - `npm run test --prefix ./frontend`, jesli zmiana dotyka testowanego zachowania.
- Dla backendu preferuj:
  - `npm run build --prefix ./backend`
  - `npm run test --prefix ./backend`, jesli zmiana dotyka logiki backendowej.
- Jesli nie udalo sie uruchomic weryfikacji, zaznacz to wyraznie w podsumowaniu.

**EN**

- When possible, run targeted verification for changed areas.
- For frontend changes, prefer:
  - `npm run format:check`
  - `npm run build --prefix ./frontend`
  - `npm run test --prefix ./frontend` when the change touches tested behavior.
- For backend changes, prefer:
  - `npm run build --prefix ./backend`
  - `npm run test --prefix ./backend` when the change touches backend logic.
- If verification could not be run, state that clearly in the summary.

## Preferowany Styl Zmian / Preferred Change Style

**PL**

- Utrzymuj komponenty male i spojne.
- Unikaj spekulacyjnych abstrakcji.
- Preferuj rozszerzanie istniejacych utili zamiast tworzenia prawie identycznych helperow.
- Gdy warunek lub transformacja nie miesci sie czytelnie w jednym wyrazeniu, rozbij ja na consty o nazwach opisujacych intencje biznesowa.
- Dodawaj krotkie komentarze tylko wtedy, gdy kod nie jest oczywisty i komentarz realnie pomaga.
- Jesli komentarz jest potrzebny przy bardziej zlozonej logice, preferuj `// ANCHOR: ...`.

**EN**

- Keep components small and cohesive.
- Avoid speculative abstractions.
- Prefer extending existing utilities instead of creating nearly identical helpers.
- When a condition or transformation does not fit clearly in a single expression, split it into constants whose names describe the business intent.
- Add short comments only when the code is not obvious and the comment materially helps.
- If a comment is needed around more complex logic, prefer `// ANCHOR: ...`.

## Czego Nie Robic / What Not to Do

**PL**

- Nie zmieniaj menedzera pakietow.
- Nie wprowadzaj masowych zmian formatowania.
- Nie przepisuj stabilnych modulow tylko po to, by dopasowac je do preferencji stylistycznych.
- Nie usuwaj istniejacych tras, kontraktow API, stories, fixtures ani testow bez potwierdzenia, ze sa nieuzywane.

**EN**

- Do not change the package manager.
- Do not introduce large-scale formatting changes.
- Do not rewrite stable modules only to match stylistic preferences.
- Do not remove existing routes, API contracts, stories, fixtures, or tests without confirming they are unused.
