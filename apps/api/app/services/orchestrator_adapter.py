from typing import Any
import httpx
from app.core.config import settings
from app.schemas.workflow import WorkflowDraft

class OrchestratorAdapter:
    """Adapter that shields the Solution Studio from ai-effect-wp3 internals."""

    def __init__(self, base_url: str | None = None):
        self.base_url = (base_url or settings.orchestrator_base_url).rstrip("/")

    def to_blueprint(self, workflow: WorkflowDraft) -> dict[str, Any]:
        node_by_id = {node.id: node for node in workflow.nodes}
        outgoing = {node.id: [] for node in workflow.nodes}
        for edge in workflow.edges:
            source = node_by_id[edge.source_node_id]
            target = node_by_id[edge.target_node_id]
            outgoing[source.id].append({
                "container_name": target.container_name,
                "operation_signature": {"operation_name": target.operation_name}
            })
        return {
            "pipeline_id": workflow.name.lower().replace(" ", "-"),
            "name": workflow.name,
            "nodes": [
                {
                    "container_name": node.container_name,
                    "node_type": node.node_type,
                    "operation_signature_list": [
                        {
                            "operation_signature": {
                                "operation_name": node.operation_name,
                                "output_message_name": f"{node.operation_name}Response"
                            },
                            "connected_to": outgoing[node.id]
                        }
                    ]
                } for node in workflow.nodes
            ]
        }

    def to_dockerinfo(self, workflow: WorkflowDraft) -> dict[str, Any]:
        return {
            "docker_info_list": [
                {
                    "container_name": node.container_name,
                    "ip_address": node.container_name.replace("_", "-"),
                    "port": "8080"
                } for node in workflow.nodes
            ]
        }

    async def submit_workflow(self, workflow: WorkflowDraft) -> dict[str, Any]:
        payload = {
            "blueprint": self.to_blueprint(workflow),
            "dockerinfo": self.to_dockerinfo(workflow),
            "inputs": workflow.inputs
        }
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(f"{self.base_url}/workflows", json=payload)
            response.raise_for_status()
            return response.json()

    async def get_workflow(self, workflow_id: str) -> dict[str, Any]:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.get(f"{self.base_url}/workflows/{workflow_id}")
            response.raise_for_status()
            return response.json()

    async def get_tasks(self, workflow_id: str) -> dict[str, Any]:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.get(f"{self.base_url}/workflows/{workflow_id}/tasks")
            response.raise_for_status()
            return response.json()
