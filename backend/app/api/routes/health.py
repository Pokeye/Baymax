from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.errors import ErrorResponse
from app.database.session import get_db_session
from app.schemas.health import HealthResponse
from app.services.health import database_is_available

router = APIRouter()


@router.get(
    "/health",
    response_model=HealthResponse,
    responses={status.HTTP_503_SERVICE_UNAVAILABLE: {"model": ErrorResponse}},
)
def get_health(db_session: Session = Depends(get_db_session)) -> HealthResponse:
    try:
        database_is_available(db_session)
    except SQLAlchemyError as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={"code": "DATABASE_UNAVAILABLE", "message": "Database connection is unavailable."},
        ) from error
    return HealthResponse(status="ok", service="baymax-api", database="connected")
