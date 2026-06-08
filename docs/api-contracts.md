# API Contracts

## Solution Studio API

### Service Registry

- `POST /services`
- `GET /services`

### Workflow

- `POST /workflows/validate`
- `POST /workflows/submit`
- `GET /workflows/{workflow_id}`
- `GET /workflows/{workflow_id}/tasks`

## Orchestrator API Assumption

The adapter submits this shape to the existing orchestrator:

```json
{
  "blueprint": {},
  "dockerinfo": {},
  "inputs": [
    { "protocol": "inline", "uri": "...", "format": "json" }
  ],
  "services_api_key": "optional"
}
```
