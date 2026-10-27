# Nova — Agent Instructions

These instructions apply to all work in this repository. Read them before changing code. Preserve these conventions when adding features, refactoring, or generating files.

## Product context

Nova helps healthcare professionals manage appointments, patients, clinical records, documents, and patient materials. Each specialty has its own workflows, screens, data, and rules.

The specialties are psychology, veterinary medicine, dentistry, and medicine. Dentistry is the first implementation priority, as confirmed by the user. The other specialties will follow the same architectural pattern once their designs are defined; do not invent or implement them without a task requesting it.

Shared infrastructure is limited to authentication, users, subscriptions, and reusable presentation components and utilities. Specialty-specific business concepts must remain inside their owning feature.

## Current phase: interactive mockups only

- Build screens, reusable components, and interactive prototypes using fictional data.
- Keep mock data in `src/features/<module-name>/mocks/`.
- Use local React state for prototype interactions such as navigation, filters, tabs, dialogs, and simulated form changes.
- Do not connect APIs, databases, backend projects, real authentication, cloud storage, or external integrations.
- Save and upload actions must not persist or transmit real data. They may simulate behavior in memory; user feedback must make simulation clear and must not claim a real upload or permanent save occurred.
- Do not persist clinical information in browser storage. Use fictional patient information only.
- Do not introduce HTTP clients, backend services, database schemas, or infrastructure merely to prepare for a later phase.
- Prioritize coherent layouts, reusable components, and specialty-specific workflows before backend integration.

## Language policy

- Write all code in English: variables, functions, hooks, components, interfaces, types, properties, constants, enum values, imports, identifiers, and internal data keys.
- Use English for every file name, directory name, route path, URL parameter, configuration key, and future database schema, table, and column name.
- Write code comments and developer documentation in English.
- All user-visible text must be in Spanish: labels, headings, navigation, placeholders, validation messages, tooltips, accessibility labels, empty states, and notifications.
- Spanish is permitted in string values intended for display, including fictional clinical content. Keep internal identifiers and machine-readable values in English, and map them to Spanish display labels.

## Repository stack

This project uses React, TypeScript, and Vite, with `src/App.tsx` and `src/main.tsx` as its entry points. The user explicitly confirmed React; earlier Next.js context is superseded. Do not migrate frameworks unless explicitly requested.

Shared UI primitives currently use CSS, Radix Select/Dialog/Popover, and React DayPicker. Reuse these styled wrappers instead of native select or date inputs. Inspect the existing configuration before adding tooling; do not introduce a competing UI system.

## Modular architecture

Use `src/features/` as the single home for specialty modules. Do not create a competing `src/modules/` tree. The supplied gym modules are structural examples, not Nova features.

```text
public/                         # Public static assets
src/
  assets/                       # Global fonts, logos, and styles
  components/
    ui/                         # Shared base UI primitives
    common/                     # Shared application UI, such as navigation
  config/                       # Global application configuration
  features/
    psychology/
      components/               # Psychology-specific compositions
      hooks/                    # Psychology-specific hooks and behavior
      mocks/                    # Fictional psychology data
      types/                    # Psychology domain and component types
      index.ts                  # Deliberate public feature exports
    veterinary/                 # Future specialty; same internal pattern
    dentistry/                  # Future specialty; same internal pattern
    medicine/                   # Future specialty; same internal pattern
  hooks/                        # Reusable, domain-independent hooks
  layouts/                      # Shared page shells
  pages/                        # Thin route-level compositions
  routes/                       # Route configuration
  store/                        # Shared application state, only if needed
  types/                        # Shared types and shared UI prop types
  utils/                        # Domain-independent helpers and formatters
  App.tsx
  main.tsx
```

- Create directories when needed; this tree is a responsibility map, not a requirement to generate empty files or future modules.
- Keep specialty business logic, types, state, and mock data inside the corresponding feature.
- Features must never import or depend on another specialty feature, including its types, mock data, or components.
- Shared code must not import specialty modules. Pages and route configuration may compose features through their public `index.ts` exports.
- Keep public exports intentional; do not expose all internal files by default.
- Pages assemble layouts and feature components. They must not contain specialty business logic or define reusable UI primitives.
- Global state is for genuinely shared application concerns. Prefer local state for mockups and feature-owned state for specialty behavior.
- Module `services/` folders and global HTTP infrastructure are reserved for a future, explicitly requested integration phase. Do not implement API services during the mockup phase.

## Component reuse and styling

- Inspect `src/components/ui/`, `src/components/common/`, and the relevant feature's components before creating UI.
- All reusable base controls belong in `src/components/ui/`, including buttons, inputs, selects, text areas, cards, dialogs, and related primitives.
- Do not implement ad hoc buttons, inputs, selects, or cards inside pages or feature screens. If a required primitive is missing, create it in `src/components/ui/` and reuse it.
- Native HTML controls may be used inside their shared primitive implementation. Use semantic markup, associated labels, keyboard interaction, and visible focus states.
- Place specialty-specific compositions in `src/features/<module-name>/components/`; place shared application components in `src/components/common/`.
- Use consistent shared styles and the configured styling system. Avoid hardcoded inline styles, duplicated visual variants, and unmanaged custom controls.
- Build responsive screens and provide appropriate empty, validation, and simulated interaction states.

## Strict TypeScript

- Keep TypeScript strict. Do not use `any`, disable type checking, or use unsafe assertions to bypass design issues.
- Type every function's parameters and return value, component props, state model, and data boundary.
- Place named interfaces and type aliases in the corresponding feature's `types/` folder. Place genuinely shared types, including shared UI prop types, in `src/types/`.
- Type mock data with the same feature-owned models used by the UI.
- When real integrations are explicitly requested in a later phase, their response types must also be strictly defined in the owning `types/` folder.

## Specialty scope

Start with dentistry: login, role-specific demo access, appointments, patient lists, a visual odontogram, and treatment estimates. Keep branding configurable per organization (name, logo, and palette), separate from the Atmosfera developer credit. Reuse the authorized Atmosfera assets copied from ATM Pulso. Roles follow the Pulso distinction between platform superadministrator, owner, administrator, and reception, with cashier and dentist added for this prototype. UI role gates are demonstrations, not security enforcement.

### Future psychology scope

The intended psychology mockups cover daily appointments; patient profiles with consultation reasons and therapeutic goals; session records containing presenting concerns, work performed, observed behavior, techniques, homework, and next-session plans; patient folders and subfolders for documents and media; quick notes; mood and goal tracking; printable patient materials; and consultation tools and games, especially for children.

This is product context, not an instruction to build every screen in one task. Implement the requested scope while preserving module boundaries.

## Working practices and future scope

- Inspect existing code and conventions before making changes, and preserve unrelated user work.
- Keep dependencies and generated artifacts small. The eventual deployment environment has limited RAM and an 80 GB disk shared with other projects.
- Do not add libraries, global state systems, or abstractions without a concrete need.
- For code changes, run the relevant existing checks (`pnpm lint` and `pnpm build`) and report failures or checks that could not run. Documentation-only changes do not require an application build.
- Do not claim a prototype action is backed by a working service.
- Future work includes shared authentication, users and subscriptions, additional specialty mockups, separate database schemas per module, and backend integration. Reminders, patient portals, video calls, payments, scored questionnaires, PDF exports, encryption, and access auditing are later ideas, not current implementation requirements.
- The preference for React and Go with Gin in new personal projects does not authorize adding a backend or changing this project's stack.

## Companion API repository

The user authorized a separate, empty Go + Gin scaffold at `../atm-nova-api`.
This does not change the web's mockup-only scope: do not connect the projects or
add backend functionality. Each repository has its own Git history and SSH origin.
No deployment or remote push is authorized by the current local setup task.
