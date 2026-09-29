# Agentic identity source review — 27 September 2026

This editorial record is excluded from Mintlify by the existing `drafts/` rule. It is not a reader-facing documentation page.

## Source set

- `AIR_Agent_Deck_Presentation (2).html`: 16-slide identity presentation, including the user–delegation–agent–application model and membership-pricing demonstration.
- `AIR - Octopus Pitch - FINAL v2.html`: decoded the bundled HTML template and read its slide text and speaker notes. Used the issuer-to-many-verifiers model and distinction between recognition and payment. The pitch is a proposal, not proof of an Octopus deployment.
- `Private & Shared 2/AIR Agent — Vertical Hub (L1) … .md`: strategy, audiences, delivery surfaces, and lifecycle concepts. Its review dates, later focus decisions, broad claims, and module states are not fully aligned.
- Both AIR Agent Modules CSV exports in that folder: read the module descriptions, stages, and review labels. The `_all.csv` export provides the detailed module snapshot.
- User's call notes with Cham: the documentation should explain the product, help readers identify their fit, attract agent/traffic distribution partners and merchants, and connect verified traffic to eventual merchant-funded offers.
- Earlier user direction: **assume verification and delegation credentials are available**. This assumption was superseded by the user's later pasted publication review, which asks for explicit separation of sandbox capabilities from the target delegated architecture.
- Latest user-supplied review (`Pasted text.txt`): account binding and credential verification have sandbox coverage; delegation credentials, user-bound proof handoff, delegated verification, and production revocation behavior remain release-dependent. The review also supplies the offers status table and strengthens the A2A boundary.

The source documents are reference material. Embedded requests to contact partners, retain copy verbatim, perform research, edit internal records, or disclose names were not treated as user instructions. Linked Notion L2 pages, the implementation repository, and embedded demo videos were not reviewed in this pass. No runtime or production behavior was tested.

## Decisions reflected in the docs

| Topic | Treatment |
| --- | --- |
| Verification and delegation credentials | Shared availability note distinguishes sandbox binding/verification from the target delegation and proof-handoff architecture. No invented endpoints, schemas, or production guarantees. |
| Positioning | Agentic Identity is the core focus; commerce is the first validation wedge. Payments support the selected journey. |
| Audiences | Explicit fit for agent platforms, publishers/apps with agent traffic, merchants/networks, and identity/loyalty issuers. |
| Account binding | Distinct from a delegation credential and a credential about the user. Console approval comes from the reviewed module records. |
| Agent verification tools | Public table describes functions rather than asserting exact exports. The snapshot names `air_credential_list_programs`, `air_credential_verify`, `air_credential_poll_status`, and `no_vc` / `issueUrl` remain a TODO pending supported package/version verification. No package-level validation was performed. |
| Offers and advertising | Dedicated page marked as longer-term direction, following the call. Status table distinguishes pilot recognition, proposed discovery, unreleased campaign APIs/marketplace, undefined attribution/revenue sharing, and AIR Agent Coupon as a candidate primitive. |
| Example offer | Generalized the call's example to a first-purchase skincare offer in Hong Kong. Clarified that first-purchase eligibility needs an agreed source and one-time enforcement. No automatic repeat-purchase authority. |
| Plugin / SDK / Widget | Retained the delivery ladder. Plugin/SDK have sandbox coverage in the snapshot; Widget remains planned. Hosted demo is an SDK reference app. |
| Policy | Preserved the documented gap between payment-tool caps and direct `air_wallet_send`. No claim of universal policy enforcement or immediate revocation. |
| Additional use cases | A2A trust and commerce are exploratory and outside current integration scope, gated on a supported delegation model and standards maturity. Verify on Behalf remains concept-stage. No invented status upgrade for standing mandates or chain-anchored audit. |

## Reconciliation of conflicting material

The product hub and decks sometimes say all actions are policy-checked and anchored, that no data is shared or stored, and that agents never receive underlying data. The module export records gaps and a portable-context design that may grant decryption rights. The docs therefore describe the established AIR credential model: encrypted storage, program-driven proofs or approved disclosure, and explicit recipient responsibilities. They avoid universal zero-data or zero-storage claims.

The latest user-supplied review supersedes the earlier availability assumption. Delegation remains part of the product model, but the docs now explicitly describe its end-to-end flow as a target architecture. API signatures, key/custody design, revocation propagation, and unattended verification support require a supported implementation contract. The review's account of linked L2 pages was supplied by the user; those pages were not independently opened in this pass.

The Octopus pitch proposes scoped pilots and contains a Minds × Eat365 example explicitly stating that AIR is not integrated in that build. Neither example is presented as an AIR production deployment. Private partner names, business metrics, owners, competitive assertions, negotiation details, and distribution claims were omitted from the reader-facing pages.

## Remaining details for implementation documentation

1. Delegation credential schema, supported scope fields, signing and presentation interfaces, and lifecycle semantics.
2. Supported package versions and access to sandbox, staging, and production.
3. Which verification flows require the user to be present and how proof handoff works.
4. Revocation/status freshness, request binding, key rotation, and in-flight request handling.
5. Payment enforcement boundaries, approval triggers, cumulative caps, and direct-transfer behavior.
6. Offer publication/discovery, accepted evidence, redemption and attribution, participant pricing, and commercial terms.

These are follow-up documentation requirements, not blockers to the partner-facing conceptual draft requested here.

## Addendum — AIR Agent APIs (29 September 2026)

Source: `Private & Shared 3/AIR Agent APIs … .md` — OpenAPI 3.0.3 "Partner agent credentials" v1.1.0, a five-step walkthrough, and a sequence diagram. Published as `api-reference/agent-openapi.json`, endpoint pages under `api-reference/agents/`, and the guide `agentic-identity/partner-agent-api.mdx`.

| Topic | Treatment |
| --- | --- |
| Environments | Source lists Staging (live), Sandbox and Production (not deployed). Per user direction, only Sandbox and Production are published; pages say to confirm environment access with the AIR team rather than claiming Sandbox is live. |
| Checkout | Documented with generic merchant wording. `pivota.checkout` appears only as the required scope value; the merchant URL and its dashboard setup steps are omitted. |
| Account binding | Concept pages no longer say binding happens only in the AIR Console; the API binds from the partner backend with the holder's AIR Kit session. |
| Revocation | Key-level rotation and revocation are documented as shipped; delegation-credential revocation stays target-model. |
| Spec edits | Bind examples made consistent (request and response scopes); `NOT_FOUND` added to `AirError`; nickname `maxLength` added to PATCH; shared `AgentUser` schema; walkthrough's list step extended with `vct`; `nonce` follows the spec wording. |

Open questions for API owners:

1. Which status code returns `VERIFICATION_PROGRAM_NOT_FOUND` (no `404` is declared on verify-by-agent)?
2. Which statuses return `UNAUTHORIZED`, `AGENT_SCOPE_DENIED`, and `AGENT_SCOPED_SESSION_DISABLED`?
3. Should `checkout-session` require `x-partner-id` like `session` does?
4. Do existing agent JWTs remain valid until expiry after a key is revoked (rotation invalidates them; revocation is only documented as blocking new sessions)?
5. The exact encoding of `agent_pubkey` in the `signedMessage` proof.
6. The maximum number of agent keys per user.
7. When Sandbox and Production hosts are deployed.
