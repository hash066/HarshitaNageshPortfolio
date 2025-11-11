import { useState, useEffect } from 'react'
import { Hobby, hobbyService } from '../lib/database'

export const useRealtimeHobbies = () => {
  const [hobbies, setHobbies] = useState<Hobby[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Initial fetch - get all hobbies
    const fetchHobbies = async () => {
      try {
        const data = await hobbyService.getAllHobbies()
        setHobbies(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch hobbies')
      } finally {
        setIsLoading(false)
      }
    }

    fetchHobbies()

    // Listen for localStorage changes (updates from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'hobbies_data') {
        fetchHobbies()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const refetch = async () => {
    setIsLoading(true)
    try {
      const data = await hobbyService.getAllHobbies()
      setHobbies(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch hobbies')
    } finally {
      setIsLoading(false)
    }
  }

  return { hobbies, isLoading, error, refetch }
}