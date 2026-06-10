from pydantic import BaseModel


class WorkflowServiceNode(BaseModel):
    node_id: str
    service_id: str
    name: str
    container_name: str
    image: str
    proto_uri: str
    node_type: str = "MLModel"
    operation_name: str
    input_message_name: str = "Request"
    output_message_name: str = "Response"
    internal_host: str
    internal_port: str = "8080"


class WorkflowEdge(BaseModel):
    source: str
    target: str


class WorkflowSubmitRequest(BaseModel):
    name: str = "AI-EFFECT Solution Workflow"
    nodes: list[WorkflowServiceNode]
    edges: list[WorkflowEdge]