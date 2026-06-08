# Product Requirements: AI-EFFECT Solution Studio

## Problem

The existing AI-EFFECT WP3 orchestrator is technically capable of executing dockerized AI service workflows, but AI vendors need a business-facing portal that makes services discoverable, trustworthy, composable, and easy to deploy.

## Product objectives

1. Let node providers publish AI services through a guided process.
2. Let AI vendors discover services in a marketplace catalogue.
3. Let AI vendors visually compose services into end-to-end solutions.
4. Convert visual workflows into orchestrator-compatible blueprint and dockerinfo payloads.
5. Add trust, validation, review, approval, and auditability.

## Non-goals for MVP

- No orchestrator code changes.
- No replacement of the existing orchestrator runtime.
- No complex billing engine in MVP.
- No production-grade certification engine in MVP.

## Personas

### Node Provider
Publishes services, manages metadata, service versions, examples, and validation readiness.

### AI Vendor
Finds services, builds solutions, deploys workflows, monitors execution, and consumes outputs.

### TEF Operator / Reviewer
Approves service publication, validates metadata, monitors service quality, and manages trust badges.

### Admin
Manages users, providers, governance, and platform configuration.

## MVP capabilities

- Service catalogue
- Service detail pages
- Publish My Service wizard
- Visual workflow builder
- Workflow validation
- Orchestrator submission
- Execution monitoring
- Admin approval queue
- Trust badges
