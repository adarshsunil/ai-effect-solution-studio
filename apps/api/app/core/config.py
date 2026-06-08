from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    orchestrator_base_url: str = "http://localhost:18000"
    database_url: str = "sqlite:///./solution_studio.db"

settings = Settings()
