import requests
from app.core.config import settings


def submit_to_orchestrator(payload: dict):
    response = requests.post(
        f"{settings.orchestrator_base_url}/workflows",
        json=payload,
        timeout=20,
    )
    response.raise_for_status()
    return response.json()


def get_workflow_status(workflow_id: str):
    response = requests.get(
        f"{settings.orchestrator_base_url}/workflows/{workflow_id}",
        timeout=10,
    )
    response.raise_for_status()
    return response.json()


def get_workflow_tasks(workflow_id: str):
    response = requests.get(
        f"{settings.orchestrator_base_url}/workflows/{workflow_id}/tasks",
        timeout=10,
    )
    response.raise_for_status()
    return response.json()