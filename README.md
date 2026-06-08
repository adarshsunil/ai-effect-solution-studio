# AI-EFFECT Solution Studio

A new product-grade web portal for AI-EFFECT that lets node providers publish dockerized AI services and lets AI vendors discover, compose, validate, and deploy AI solutions through the existing AI-EFFECT WP3 orchestrator.

This repository is intentionally separated from the orchestrator repository:

- Orchestrator engine: https://github.com/IRESI-EU/ai-effect-wp3
- Solution Studio product layer: this repository

## Product goal

The Solution Studio turns the WP3 orchestrator into a vendor-facing product:

1. Service marketplace for validated AI-EFFECT services.
2. Guided Publish My Service flow for node providers.
3. Visual Build a Solution workflow builder for AI vendors.
4. Governance, approval, versioning, and trust layer for TEF operators.
5. Adapter-based integration with the orchestrator so future orchestrator changes do not tightly couple to the UI.

## Architecture

```text
apps/web                 Next.js web application
apps/api                 FastAPI backend-for-frontend
packages/service-contracts Service and DataReference schemas
packages/workflow-model  Visual workflow schema and validation model
packages/orchestrator-adapter Adapter contract for ai-effect-wp3 orchestrator
docs                     Product, UX, and architecture documentation
```

## Orchestrator integration boundary

The UI never talks directly to orchestrator internals. All communication goes through the API backend and the orchestrator adapter.

Current orchestrator assumptions:

- `POST /workflows` submits `{ blueprint, dockerinfo, inputs, services_api_key? }`
- `GET /workflows/{workflow_id}` reads workflow status
- `GET /workflows/{workflow_id}/tasks` reads task status
- Services implement `/control/execute`, `/control/status/{id}`, `/control/output/{id}`, and `/health`
- Data payload transfer remains a service-side data-plane concern using `DataReference` values

## Development status

This is a starter scaffold for the new repository. It contains the product architecture, initial data contracts, API routes, UI page structure, and adapter placeholder needed to begin implementation.
