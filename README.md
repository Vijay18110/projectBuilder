# Forge — Dashboard Studio

A Next.js and TypeScript dashboard builder with configurable pages, a shared design system, a component library, and independently runnable React/Vite or Next.js ZIP exports.

## Run the studio

Requires Node.js 22.13+ for built-in SQLite.

```sh
npm install
# Copy .env.example to .env
npm run dev
```

Open http://localhost:3000 for the marketing homepage, /about for the product story, and /docs for documentation. Open /dashboard for Project Builder. The studio opens without login, registration, email verification, or session cookies. The legacy /login URL redirects to the builder. Studio settings and business data use one shared workspace on this instance; existing account databases are retained, and old account records are not automatically copied into the shared workspace. Authentication remains an optional feature for generated applications.

Codespaces and reverse-proxy browser URLs are supported for studio saves, exports, and preview controls. Set APP_ORIGIN to the external browser origin when the proxy does not provide forwarded host/protocol headers.

## Project templates

Visit `/templates` for 10 curated configurations across business, commerce, operations, and team workspaces. Each detail page lists its actual pages, workflows, theme, and integration requirements. Choose React/Vite or Next.js to load the configuration into Project Builder, then customize, preview, and export it. Selecting a template replaces the current project draft; the launch parameter is consumed after loading so refreshing keeps subsequent changes.

Definitions live in `app/lib/project-templates.ts`. One validated configuration factory supplies the catalog, detail pages, Builder handoff, sitemap, and both framework exports. Templates use the existing application features rather than maintaining separate copies of the backend. Storefront checkout remains a demo and requires a commerce backend and payment integration for real sales.

Template cards use actual browser screenshots stored in `public/templates`, not wireframes. Run `npm run capture:templates` with Chromium installed (`CHROMIUM_PATH` can override its executable) to regenerate them. The capture runner starts each isolated generated project, verifies live data and dashboard task CRUD, captures its primary page, and removes its temporary runtime. Captures use sample data; exported source contains no preview accounts or screenshots. Dashboard templates preserve their primary workflow as the initial page.

Run `npm run test:templates` to generate and TypeScript-check all 20 template/framework combinations. These checks verify functional composition and exports; they do not measure production throughput or capacity.

## Build a project

1. Select Next.js App Router or React/Vite. Choose automatic generation (complete dashboard, e-commerce storefront, or customer workspace), or manually select pages and components. Authentication dependencies are added automatically for features that store account data.
2. Choose component variants, a default header, and sidebar/navigation. Six header and seven navigation styles are available.
3. Choose a page and assign components. Reorder or remove them. Login and registration components are routed to the standalone authentication page rather than the dashboard overview.
4. Choose Modern, Glassmorphism, Neumorphism, Claymorphism, or Minimal at the top of Theme Studio. Preview the whole-project style, then select **Apply style to project** to save it. Styles preserve your palette and set depth and corner defaults; customize further below. Saved styles carry into previews, JSON themes, and both application exports. Use Theme Studio for palettes, light/dark/system mode, typography, borders, radius, density, shadows, chart colors, motion, and component/layout defaults.
5. Click **Open Real Project**. A connected window runs generated source using the chosen framework. Studio navigation keeps it connected, and configuration changes refresh it automatically.
6. Review pages, component assignments, theme, layout, dependencies, environment variables, and setup steps. Apply and export the draft, or download the last applied theme.

The preview uses one active view at a time. Use **Focus project window** to return to the running application, or **Use embedded preview** for desktop, tablet, mobile, and full-screen views inside the studio. Closing the project window restores the embedded view. Framework hot updates preserve the running session while theme and component configuration changes.

Project configuration and applied theme save in the shared studio workspace through the workspace API, with a device fallback. The preview has a separate SQLite database and session-cookie namespace. It automatically seeds synthetic customers, products, orders, conversations, notifications, and highlights. Preview-only Admin, Manager, and Member accounts are listed in its banner. Those accounts and their credentials are never included in exported source.

Automatic generation selects matching pages and component variants, then starts the real preview. An animated generation screen remains visible while compilation runs; there is no artificial delay. E-commerce generates a public responsive storefront with category/search filters, quantity controls, a cart saved on the device, and local demo order history. It does not process payments or create server orders; connect a commerce backend and payment provider before selling online.

## Functional pages

The studio and generated dashboards share reusable page implementations for overview, analytics, customers, products, orders, tables, forms, authentication, team permissions, chat, notifications, carousel, and profile. Every generated application includes a Theme Builder at /theme for user-adjustable styles, palettes, typography, spacing, borders, layout, and light/dark/system modes. Project Builder/Export and Component Library stay in the studio.

- Axios services load all workspace data from authenticated APIs.
- Record lists support server search, filters, sorting, pagination, CSV export, and bulk deletion.
- Product forms include SKU and stock. Order forms link customers and products and calculate totals on the server.
- React Hook Form and Zod provide inline form validation, submit states, and success feedback.
- Loading skeletons, empty states, API errors, retry actions, toasts, responsive layouts, and dark mode are shared.
- Admins manage invitations and roles. Managers edit their own workspace records. Members read records, join shared chat, and update their own profile and design settings. API authorization applies independently of UI controls.
- Passwords use salted scrypt hashes. Session and recovery tokens are hashed in SQLite. Cookies are HttpOnly and SameSite=Lax, with Secure enabled in production. Password resets revoke sessions.

## Components

80 families and 249 variants include inputs, actions, navigation, data display, feedback, commerce, marketing, media, and authentication/profile/settings forms. Examples have interactive previews, source views, and individual or bulk ZIP downloads. Components consume shared CSS custom properties and CSS Modules. Component kits include their required form dependencies; unselected variant selectors are removed from kit styles.

Library examples use local sample interactions. Full application pages use the persistent API. File and media examples select local files; they do not implement a storage/upload service.

## Exported applications

Exports include selected feature routes, component assignments and variants, layouts, required dependencies, CSS Modules, shared tokens, APIs, database schema, initial migration, seed command, lint/TypeScript configuration, .env.example, project.config.json, and README. No workspace database, account records, sessions, chat history, environment file, or private credentials are copied.

Next.js exports use App Router routes and Node API handlers. React exports use Vite and an Express API/SPA server. Both use SQLite on persistent disk.

```sh
npm install
# Copy .env.example to .env
npm run dev
```

Register and verify the first account. Set SEED_USER_EMAIL to that account in .env and run `npm run seed` for clean sample records. `npm run migrate` applies the idempotent schema initialization. Run `npm run build` and `npm start` for production. Configure APP_ORIGIN and an email provider, and use HTTPS.

## Brand assets

The studio uses an original Forge F mark across navigation, the component library, and Theme Studio. Vector assets are in `public/forge-mark.svg` and `public/forge-logo.svg`; browser and device icons are `public/favicon.svg`, `public/apple-touch-icon.png`, and `public/forge-icon.png`. The in-app mark follows the selected primary and accent colors.

## Source architecture

- app/components/WorkspaceShell.tsx: studio controller and connected navigation.
- app/features/: shared API-backed pages.
- app/layouts/: reusable dashboard shell and layout variants.
- app/lib/registry.ts: typed features, variant registry, validation, dependencies, and theme tokens.
- app/lib/generator.ts and project-enhancements.ts: project composition.
- app/lib/templates/: modular application source templates.
- server/backend-core.mjs: authentication, authorization, persistence, domain validation, and seeds.
- server/migrations/: SQL schema version.
- server/preview-manager.ts: isolated runtime lifecycle and source updates.
- app/lib/component-catalog.json: component export source; component-metadata.json contains lightweight builder metadata.

After changing shared templates or the backend, run `npm run sync:templates` to update the studio copies and backend export snapshot. Generated applications include Theme Builder and exclude Project Builder and Component Library. Theme Builder saves changes on the device and syncs them to the workspace API when available. The design tokens and selected component implementations are included, while project composition tools stay in the studio. Legacy saved configurations are filtered at generation time.

## Verify

```sh
npm test
npm run typecheck
npm run test:exports
npm run test:runtime
```

The regular suite covers backend flows, account isolation, role checks, recovery/revocation, page composition, unsafe names, feature/dependency/style exclusions, component ZIPs, and server rendering of all 249 variants. Export checks materialize and typecheck complete React and Next projects under .forge-checks. Runtime checks launch actual preview servers and verify session cookies, seeds, pagination/search, CRUD, duplicates, profile, notifications, chat, and member restrictions.

## Hosting

Use persistent storage for data/workspace.sqlite and back it up. The preview runner needs a local Node host that can spawn processes and listen on loopback ports. The studio runs one active project for its shared workspace, with a 15-minute idle timeout. A remotely hosted or serverless deployment needs a routed preview service; exported applications run independently of that studio service. Chat uses polling rather than WebSockets.

## Marketing pages and SEO

Home (/), About (/about), and Docs (/docs) render their content on the server with unique titles, descriptions, canonical URLs, Open Graph/Twitter metadata, and structured data. Public pages are listed in /sitemap.xml; /robots.txt excludes studio and API routes. Dashboard metadata is noindex. Set NEXT_PUBLIC_SITE_URL to the public website origin before the production build. The studio lives at /dashboard; legacy /?page=... URLs redirect with their parameters preserved.
