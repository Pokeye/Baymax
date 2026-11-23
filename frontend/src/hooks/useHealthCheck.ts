import { useCallback, useEffect, useState } from 'react'
import { getHealth } from '../services/api'
import type { HealthResponse } from '../types/api'

interface HealthState {
  data: HealthResponse | null
  error: string | null
  isLoading: boolean
}

export function useHealthCheck() {
  const [state, setState] = useState<HealthState>({ data: null, error: null, isLoading: true })

  const refresh = useCallback(async () => {
    setState((current) => ({ ...current, isLoading: true, error: null }))
    try {
      const data = await getHealth()
      setState({ data, error: null, isLoading: false })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred.'
      setState({ data: null, error: message, isLoading: false })
    }
  }, [])

  useEffect(() => {
    let isCurrent = true

    void getHealth()
      .then((data) => {
        if (isCurrent) {
          setState({ data, error: null, isLoading: false })
        }
      })
      .catch((error: unknown) => {
        if (isCurrent) {
          const message = error instanceof Error ? error.message : 'An unexpected error occurred.'
          setState({ data: null, error: message, isLoading: false })
        }
      })

    return () => {
      isCurrent = false
    }
  }, [])

  return { ...state, refresh }
}
