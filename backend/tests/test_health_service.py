from unittest.mock import Mock

from app.services.health import database_is_available


def test_database_is_available_executes_minimal_query() -> None:
    session = Mock()

    assert database_is_available(session) is True
    session.execute.assert_called_once()
