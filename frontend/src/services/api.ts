import type { ApiError, ChatMessage, ChatResponse, HealthResponse } from '../types/api'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1'

export class ApiRequestError extends Error {
  public readonly code: string

  constructor(error: ApiError) {
    super(error.message)
    this.name = 'ApiRequestError'
    this.code = error.code
  }
}

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${apiBaseUrl}/health`)

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as ApiError | null
    throw new ApiRequestError(error ?? { code: 'HEALTH_CHECK_FAILED', message: 'Unable to reach BayMax.' })
  }

  return response.json() as Promise<HealthResponse>
}

export async function sendChat(messages: ChatMessage[]): Promise<ChatResponse> {
  const response = await fetch(`${apiBaseUrl}/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  })

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as ApiError | null
    throw new ApiRequestError(error ?? { code: 'AI_REQUEST_FAILED', message: 'BayMax could not reply right now.' })
  }

  return response.json() as Promise<ChatResponse>
}
