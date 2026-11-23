from functools import lru_cache

from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import get_settings


@lru_cache
def _get_session_factory(database_url: str) -> sessionmaker[Session]:
    engine = create_engine(database_url, pool_pre_ping=True, connect_args={"connect_timeout": 5})
    return sessionmaker(bind=engine, autocommit=False, autoflush=False, class_=Session)


def get_db_session():
    database_url = get_settings().database_url
    if not database_url:
        raise HTTPException(
            status_code=503,
            detail={"code": "DATABASE_NOT_CONFIGURED", "message": "Database access is not configured."},
        )

    db_session = _get_session_factory(database_url)()
    try:
        yield db_session
    finally:
        db_session.close()
