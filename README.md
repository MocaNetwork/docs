![AIR Kit Developer Docs](images/preview.png)

# AIR Kit Developer Docs

This repository contains the source for the AIR Kit developer documentation published at [docs.air3.com](https://docs.air3.com).

Use this README as the working contract for contributors: how the docs are organized, how to write content that fits the rest of the site, how to preview locally, and how to ship your change through a pull request on GitHub.

## What lives here

The site has a Home icon tab for the landing page ([`index.mdx`](index.mdx)) and six top-level tabs, all wired up in [`docs.json`](docs.json). Products and Technicals are dropdowns; each dropdown item has its own sidebar. Shared setup lives in Get Started, and each product keeps only its own pages, linking back to Get Started from its overview. A page belongs to exactly one place in the navigation.

- **Get Started** — everything the products share: overview, Build with AI, setup, authentication (including JWKS), UI customization, quickstarts, and general recipes.
- **Products** (dropdown):
  - **AIR Identity** (`airkit/usage/credential/`, `learn/airkit/`): how credentials work, schema design, issuing (including issuer backend hosting), verifying, and selective disclosure.
  - **AIR Agents** (`agentic-identity/`): agent binding, consent, commerce use cases, and the Agent API quickstart.
  - **AIR Money** (`money/`, `airkit/usage/account/`): overview, smart accounts, paymaster, the built-in wallet UI, session keys, and the wagmi recipe.
  - **AIR Loyalty** (`loyalty/`): overview, loyalty for businesses, loyalty for developers, and the loyalty points recipe.
- **Solutions** (`solutions/`, `kyc/`) — industry overviews for partners, all listed in the sidebar.
- **Technicals** (dropdown) — Architecture and security (`learn/`), and Moca Chain (`mocachain/`).
- **API References** (`api-reference/`) — REST endpoints generated from [`api-reference/openapi.json`](api-reference/openapi.json), the Agent APIs generated from [`api-reference/agent-openapi.json`](api-reference/agent-openapi.json), the SDK references, and release notes.
- **Help** — troubleshooting, FAQs, status, and the glossary (`concepts/`).

[`custom.css`](custom.css) renders the first tab as an icon and pushes the last two tabs (API References and Help) to the right, so keep that tab order. Demo apps live on the [AIR Kit demo site](https://air-bd-v2.netlify.app); link to them from existing pages rather than adding docs routes.

The landing page is [`index.mdx`](index.mdx). Shared assets live in [`images/`](images).

## Repository layout

```
.
├── docs.json                # Site configuration: theme, navigation, SEO, social
├── index.mdx                # Custom landing page
├── learn/                   # Moca Book content
├── solutions/               # Partner solutions by vertical
├── airkit/                  # AIR Kit SDK docs (web + Flutter)
├── agentic-identity/         # Agent identity, commerce, and partner integrations
├── mocachain/               # Moca Chain docs and node guides
├── api-reference/           # OpenAPI spec + endpoint pages
├── recipes/                 # Task-oriented integration recipes
└── images/                  # Static assets (including images/preview.png)
```

`docs.json` is the single source of truth for navigation. A new MDX file is invisible on the site until you add its path (without the `.mdx` extension) to the right group in `docs.json`.

## Writing guidelines

Match the voice of the surrounding pages and keep contributions reviewable.

- Write in second person ("you") and active voice.
- Use sentence case for headings ("Issuing credentials", not "Issuing Credentials").
- Lead with the goal of the page; put prerequisites near the top.
- Keep terminology consistent: **Moca Network**, **Moca Chain**, **AIR Kit**, **AIR Account**, **credential**, **issuer**, **verifier**.
- Use root-relative internal links without file extensions, for example `/airkit/usage/getting-started`. Do not use relative paths or full URLs for pages inside this repo.
- Store images under `images/` and reference them as `/images/your-file.png` from MDX. Always include descriptive alt text.
- Tag every code block with a language (` ```ts `, ` ```bash `, ` ```json `).
- Prefer Mintlify components (`<Steps>`, `<CodeGroup>`, `<Card>`, `<Note>`, `<Warning>`) over custom HTML when they exist for the use case.
- Avoid marketing adjectives ("powerful", "seamless", "robust") and filler phrases ("simply", "just", "in order to").

When in doubt, open two or three neighboring pages in the same section and match their structure.

## Local development

You need Node.js installed. Then install the Mintlify CLI globally:

```bash
npm i -g mint
```

From the root of this repository (where `docs.json` lives), start the live preview:

```bash
mint dev
```

The site is served at `http://localhost:3000`. The preview hot-reloads as you edit MDX files and `docs.json`.

Before opening a pull request, run the checks Mintlify provides:

```bash
mint broken-links
mint validate
```

If the dev server fails to start or pages render as 404s, run `mint update` to upgrade the CLI and confirm you are running the command from the directory that contains `docs.json`.

## Contributing changes via pull request

The repository lives at [github.com/MocaNetwork/docs](https://github.com/MocaNetwork/docs) and the default branch is `main`.

<a id="open-a-pull-request"></a>

### 1. Fork or clone

If you have write access, clone directly:

```bash
git clone https://github.com/MocaNetwork/docs.git
cd docs
```

If you do not, click **Fork** on GitHub, then clone your fork and add the upstream remote:

```bash
git clone https://github.com/<your-user>/docs.git
cd docs
git remote add upstream https://github.com/MocaNetwork/docs.git
```

### 2. Create a branch

Branch from an up-to-date `main`. Use a short, descriptive name:

```bash
git checkout main
git pull origin main
git checkout -b docs/<area>-<short-description>
```

Examples: `docs/airkit-credentials-flow-update`, `docs/mocachain-validator-fix-typo`.

### 3. Make your changes

- Edit or add MDX files in the right section.
- If you add a new page, register it in [`docs.json`](docs.json) under the appropriate tab and group.
- Place new images under `images/` and reference them with `/images/...`.
- Run `mint dev` and verify the page renders, links work, and components display as intended.

### 4. Commit

Keep commits focused and use a clear, imperative subject line:

```bash
git add <changed-files>
git commit -m "docs(airkit): clarify credential issuance flow"
```

Group related changes into one commit when possible. Avoid mixing content edits with unrelated refactors.

### 5. Push and open the pull request

Push your branch and open a PR against `main`:

```bash
git push -u origin docs/<area>-<short-description>
```

Then on GitHub click **Compare & pull request**, or use the GitHub CLI:

```bash
gh pr create --base main --web
```

In the PR description include:

- A short summary of what changed and why.
- The list of pages added, edited, or removed.
- Any screenshots for visual changes.
- Confirmation that you ran `mint dev`, `mint broken-links`, and `mint validate` locally.

### 6. Review and merge

- Address review feedback by pushing additional commits to the same branch.
- Keep the branch up to date with `main` if it falls behind:
  ```bash
  git fetch origin
  git rebase origin/main
  git push --force-with-lease
  ```
- Once approved and CI is green, the PR is merged into `main` and Mintlify deploys the change to [docs.moca.network](https://docs.air3.com) automatically.

## Getting help

- Mintlify component and configuration reference: [mintlify.com/docs](https://mintlify.com/docs)
- Mintlify CLI reference: [npmjs.com/package/mint](https://www.npmjs.com/package/mint)
- Moca Network GitHub: [github.com/MocaNetwork](https://github.com/MocaNetwork)
- Community: [Discord](https://discord.gg/mocaversenft) · [X](https://twitter.com/Moca_Network)
