export interface HealthResponse {
  status: 'ok'
  service: string
  database: 'connected'
}

export interface ApiError {
  code: string
  message: string
}

export interface ChatMessage {
  role: 'user' | 'model'
  content: string
}

export interface ChatResponse {
  answer: string
  model: string
}
