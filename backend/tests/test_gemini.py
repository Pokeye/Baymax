import json
from io import BytesIO
from unittest.mock import patch

import pytest

from app.core.config import Settings
from app.schemas.ai import ChatMessage, ChatRequest
from app.services.gemini import GeminiError, generate_reply
from app.api.routes.ai import chat


def test_chat_request_requires_latest_message_from_user() -> None:
    with pytest.raises(ValueError):
        ChatRequest(messages=[ChatMessage(role="model", content="Hello")])


def test_chat_request_enforces_history_limit() -> None:
    with pytest.raises(ValueError):
        ChatRequest(messages=[ChatMessage(role="user", content="x" * 4000) for _ in range(4)])


def test_backend_env_overrides_project_env(tmp_path, monkeypatch: pytest.MonkeyPatch) -> None:
    project_file = tmp_path / "project.env"
    backend_file = tmp_path / "backend.env"
    project_file.write_text("DATABASE_URL=postgresql://unused\nGEMINI_API_KEY=project-test-key\n")
    backend_file.write_text("GEMINI_API_KEY=backend-test-key\n")
    monkeypatch.delenv("GEMINI_API_KEY", raising=False)
    monkeypatch.delenv("DATABASE_URL", raising=False)

    settings = Settings(_env_file=(str(project_file), str(backend_file)))

    assert settings.gemini_api_key == "backend-test-key"


def test_generate_reply_sends_history_to_google_and_returns_text() -> None:
    settings = Settings(database_url="postgresql://unused", gemini_api_key="test-key")
    response = BytesIO(json.dumps({"candidates": [{"content": {"parts": [{"text": "I am listening."}]}}]}).encode())
    response.__enter__ = lambda: response
    response.__exit__ = lambda *_: None

    with patch("app.services.gemini.urlopen", return_value=response) as mocked_urlopen:
        result = generate_reply(settings, [ChatMessage(role="user", content="I feel tired.")])

    assert result == "I am listening."
    request = mocked_urlopen.call_args.args[0]
    assert request.get_header("X-goog-api-key") == "test-key"
    assert b"I feel tired." in request.data
    assert "gemini-3.6-flash:generateContent" in request.full_url


def test_generate_reply_fails_safely_when_key_missing() -> None:
    settings = Settings(database_url="postgresql://unused", gemini_api_key=None)

    with pytest.raises(GeminiError) as error:
        generate_reply(settings, [ChatMessage(role="user", content="Hello")])

    assert error.value.code == "AI_NOT_CONFIGURED"


def test_chat_route_returns_typed_response_without_external_request(monkeypatch: pytest.MonkeyPatch) -> None:
    settings = Settings(database_url="postgresql://unused", gemini_api_key="test-key")
    monkeypatch.setattr("app.api.routes.ai.get_settings", lambda: settings)
    monkeypatch.setattr("app.api.routes.ai.generate_reply", lambda _settings, _messages: "Hello there.")

    response = chat(ChatRequest(messages=[ChatMessage(role="user", content="Hi")]))

    assert response.answer == "Hello there."
    assert response.model == settings.gemini_model


def test_fastapi_app_imports_without_database(monkeypatch: pytest.MonkeyPatch) -> None:
    from app.core.config import get_settings

    monkeypatch.delenv("DATABASE_URL", raising=False)
    get_settings.cache_clear()
    from app.main import app

    assert get_settings().database_url is None
    assert app.title == "BayMax API"



