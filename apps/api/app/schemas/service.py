from pydantic import BaseModel


class ServiceCreate(BaseModel):
    name: str
    provider: str
    category: str
    description: str
    input_type: str
    output_type: str
    version: str = "0.1.0"


class ServiceRead(ServiceCreate):
    id: str
    status: str
    trust_badge: str