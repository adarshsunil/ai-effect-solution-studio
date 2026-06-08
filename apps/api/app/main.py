from fastapi import FastAPI, HTTPException
from app.schemas.service import ServiceCreate, ServiceRead
from app.schemas.workflow import WorkflowDraft
from app.services.orchestrator_adapter import OrchestratorAdapter
from uuid import uuid4

app = FastAPI(title="AI-EFFECT Solution Studio API", version="0.1.0")
services: dict[str, ServiceRead] = {}
adapter = OrchestratorAdapter()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/services", response_model=ServiceRead)
def create_service(payload: ServiceCreate):
    service = ServiceRead(id=str(uuid4()), **payload.model_dump())
    services[service.id] = service
    return service

@app.get("/services", response_model=list[ServiceRead])
def list_services():
    return list(services.values())

@app.post("/workflows/validate")
def validate_workflow(payload: WorkflowDraft):
    if not payload.nodes:
        raise HTTPException(status_code=400, detail="Workflow must contain at least one node")
    return {"valid": True, "warnings": [], "blueprint_preview": adapter.to_blueprint(payload)}

@app.post("/workflows/submit")
async def submit_workflow(payload: WorkflowDraft):
    result = await adapter.submit_workflow(payload)
    return result

@app.get("/workflows/{workflow_id}")
async def get_workflow(workflow_id: str):
    return await adapter.get_workflow(workflow_id)

@app.get("/workflows/{workflow_id}/tasks")
async def get_tasks(workflow_id: str):
    return await adapter.get_tasks(workflow_id)
