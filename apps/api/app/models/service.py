from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.db import Base


class Service(Base):
    __tablename__ = "services"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    provider: Mapped[str] = mapped_column(String(200), nullable=False)
    category: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="draft")
    version: Mapped[str] = mapped_column(String(50), default="0.1.0")
    description: Mapped[str] = mapped_column(Text, nullable=False)
    input_type: Mapped[str] = mapped_column(String(100), nullable=False)
    output_type: Mapped[str] = mapped_column(String(100), nullable=False)
    trust_badge: Mapped[str] = mapped_column(String(100), default="Experimental")