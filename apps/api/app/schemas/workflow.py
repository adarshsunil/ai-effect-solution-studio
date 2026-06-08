from pydantic import BaseModel, Field
from typing import Any

class WorkflowNode(BaseModel):
    id: str
    service_id: str
    container_name: str
    operation_name: str
    node_type: str = "AIService"

class WorkflowEdge(BaseModel):
    source_node_id: str
    target_node_id: str

class WorkflowDraft(BaseModel):
    name: str
    nodes: list[WorkflowNode]
    edges: list[WorkflowEdge]
    inputs: list[dict[str, Any]] = Field(default_factory=list)

class WorkflowSubmitResponse(BaseModel):
    workflow_id: str
    status_url: str
