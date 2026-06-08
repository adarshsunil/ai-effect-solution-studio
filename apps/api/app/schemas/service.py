from pydantic import BaseModel, Field
from typing import Literal

class DataReferenceSchema(BaseModel):
    protocol: Literal["inline", "http", "grpc", "s3", "file"]
    uri: str
    format: str

class ServicePort(BaseModel):
    name: str
    message_name: str | None = None
    data_format: str
    protocols: list[str] = Field(default_factory=list)

class ServiceCreate(BaseModel):
    name: str
    provider: str
    description: str
    use_case: str
    docker_image: str | None = None
    container_name: str
    control_port: int = 8080
    operation_name: str
    inputs: list[ServicePort] = Field(default_factory=list)
    outputs: list[ServicePort] = Field(default_factory=list)

class ServiceRead(ServiceCreate):
    id: str
    status: str = "draft"
    trust_badges: list[str] = Field(default_factory=list)
