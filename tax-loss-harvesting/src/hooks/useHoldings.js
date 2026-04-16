import { useState, useEffect } from 'react'
import { fetchHoldings } from '../api/holdingsApi'

export const useHoldings = () => {
  const [holdings, setHoldings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchHoldings()
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => Math.abs(b.stcg.gain + b.ltcg.gain) - Math.abs(a.stcg.gain + a.ltcg.gain)
        )
        setHoldings(sorted)
      })
      .catch(() => setError('Failed to load holdings'))
      .finally(() => setIsLoading(false))
  }, [])

  return { holdings, isLoading, error }
}
