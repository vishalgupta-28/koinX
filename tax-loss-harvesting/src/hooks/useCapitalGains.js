import { useState, useEffect } from 'react'
import { fetchCapitalGains } from '../api/capitalGainsApi'

export const useCapitalGains = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCapitalGains()
      .then((res) => setData(res.capitalGains))
      .catch(() => setError('Failed to load capital gains'))
      .finally(() => setIsLoading(false))
  }, [])

  return { data, isLoading, error }
}
