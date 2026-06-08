# Architecture

## Principle

The Solution Studio is an independent product layer. It integrates with the orchestrator through an adapter boundary rather than coupling the UI to orchestrator implementation details.

```text
Web UI -> Solution Studio API -> Orchestrator Adapter -> ai-effect-wp3 Orchestrator
```

## Orchestrator contract used

- `POST /workflows`
- `GET /workflows/{workflow_id}`
- `GET /workflows/{workflow_id}/tasks`

## Service contract surfaced in UI

- `POST /control/execute`
- `GET /control/status/{id}`
- `GET /control/output/{id}`
- `GET /health`

## Data model concepts

- Provider
- Service
- ServiceVersion
- ServicePort
- DataReference
- WorkflowDraft
- WorkflowNode
- WorkflowEdge
- Deployment
- ExecutionTask
- TrustBadge
- ReviewDecision

## Adapter responsibilities

1. Convert visual workflow nodes and edges into `blueprint.json` style payload.
2. Convert selected services into `dockerinfo.json` style payload.
3. Submit payload to orchestrator.
4. Retrieve workflow and task status.
5. Normalize orchestrator responses for UI consumption.
