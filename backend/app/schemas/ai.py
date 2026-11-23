from typing import Literal

from pydantic import BaseModel, Field, model_validator


class ChatMessage(BaseModel):
    role: Literal["user", "model"]
    content: str = Field(min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(min_length=1, max_length=20)

    @model_validator(mode="after")
    def validate_history(self) -> "ChatRequest":
        if self.messages[-1].role != "user":
            raise ValueError("The latest chat message must be from the user.")
        if sum(len(message.content) for message in self.messages) > 12000:
            raise ValueError("The chat history is too long.")
        return self


class ChatResponse(BaseModel):
    answer: str
    model: str

