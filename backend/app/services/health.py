from sqlalchemy import text
from sqlalchemy.orm import Session


def database_is_available(db_session: Session) -> bool:
    """Return whether the configured database accepts a minimal query."""
    db_session.execute(text("SELECT 1"))
    return True
