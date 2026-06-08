from uuid import uuid4
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db import Base, engine, get_db
from app.models.service import Service
from app.schemas.service import ServiceCreate, ServiceRead

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI-EFFECT Solution Studio API", version="0.1.0")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/services", response_model=list[ServiceRead])
def list_services(db: Session = Depends(get_db)):
    services = db.query(Service).all()

    if not services:
        seed_services(db)
        services = db.query(Service).all()

    return services


@app.post("/services", response_model=ServiceRead)
def create_service(payload: ServiceCreate, db: Session = Depends(get_db)):
    service = Service(
        id=str(uuid4()),
        name=payload.name,
        provider=payload.provider,
        category=payload.category,
        description=payload.description,
        input_type=payload.input_type,
        output_type=payload.output_type,
        version=payload.version,
        status="pending_review",
        trust_badge="Awaiting validation",
    )
    db.add(service)
    db.commit()
    db.refresh(service)
    return service


@app.get("/services/{service_id}", response_model=ServiceRead)
def get_service(service_id: str, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service


@app.post("/workflows/validate")
def validate_workflow():
    return {
        "valid": True,
        "message": "Workflow validation placeholder. Compatibility rules will be added in the next milestone.",
    }


@app.post("/workflows/submit")
def submit_workflow():
    return {
        "workflow_id": "demo-workflow-001",
        "status": "submitted",
        "message": "Submission placeholder. Orchestrator adapter integration comes later.",
    }


@app.get("/workflows/{workflow_id}")
def get_workflow(workflow_id: str):
    return {"workflow_id": workflow_id, "status": "running"}


@app.get("/workflows/{workflow_id}/tasks")
def get_tasks(workflow_id: str):
    return {
        "workflow_id": workflow_id,
        "tasks": [
            {"id": "task-1", "name": "Load input reference", "status": "completed"},
            {"id": "task-2", "name": "Execute AI service", "status": "running"},
        ],
    }


def seed_services(db: Session):
    examples = [
        Service(
            id="svc-grid-forecasting",
            name="Grid Load Forecasting Service",
            provider="AI-EFFECT Node",
            category="Forecasting",
            status="validated",
            version="1.0.0",
            description="Forecasts energy demand using time-series input data and produces forecast references for downstream services.",
            input_type="Time-series DataReference",
            output_type="Forecast DataReference",
            trust_badge="Validated",
        ),
        Service(
            id="svc-synthetic-data",
            name="Synthetic Energy Data Generator",
            provider="AI-EFFECT Node",
            category="Synthetic Data",
            status="validated",
            version="0.9.0",
            description="Generates synthetic energy datasets for experimentation, testing, and workflow prototyping.",
            input_type="Configuration JSON",
            output_type="Dataset DataReference",
            trust_badge="TEF-ready",
        ),
        Service(
            id="svc-anomaly-detection",
            name="Grid Anomaly Detection Service",
            provider="AI-EFFECT Node",
            category="Monitoring",
            status="experimental",
            version="0.3.0",
            description="Detects anomalies in grid measurements and produces event markers for validation workflows.",
            input_type="Measurement DataReference",
            output_type="Anomaly Report",
            trust_badge="Experimental",
        ),
    ]

    for service in examples:
        db.merge(service)

    db.commit()