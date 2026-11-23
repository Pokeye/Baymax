from fastapi import APIRouter, HTTPException

from app.core.config import get_settings
from app.schemas.ai import ChatRequest, ChatResponse
from app.services.gemini import GeminiError, generate_reply

router = APIRouter()


@router.post("/ai/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    settings = get_settings()
    try:
        answer = generate_reply(settings, request.messages)
    except GeminiError as error:
        raise HTTPException(
            status_code=error.status_code,
            detail={"code": error.code, "message": error.message},
        ) from None
    return ChatResponse(answer=answer, model=settings.gemini_model)
