import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect
} from 'react'
import { applyHoldingToGains } from '../utils/gainCalculations'

const HarvestingContext = createContext(null)

const holdingKey = (holding) => `${holding.coin}${holding.coinName}`

export const HarvestingProvider = ({ children, initialGains }) => {
  const [selectedCoins, setSelectedCoins] = useState(new Set())
  const [postHarvestGains, setPostHarvestGains] = useState(initialGains)

  useEffect(() => {
    setSelectedCoins(new Set())
    setPostHarvestGains(initialGains)
  }, [initialGains])

  const toggleHolding = useCallback((holding) => {
    const key = holdingKey(holding)

    setSelectedCoins((prev) => {
      const next = new Set(prev)
      const isSelecting = !next.has(key)

      if (isSelecting) {
        next.add(key)
      } else {
        next.delete(key)
      }

      setPostHarvestGains((prevGains) => applyHoldingToGains(prevGains, holding, isSelecting))
      return next
    })
  }, [])

  const toggleAll = useCallback(
    (holdings, selectAll) => {
      if (selectAll) {
        const allKeys = new Set(holdings.map((h) => holdingKey(h)))
        setSelectedCoins(allKeys)

        let gains = {
          stcg: { ...initialGains.stcg },
          ltcg: { ...initialGains.ltcg }
        }

        holdings.forEach((h) => {
          gains = applyHoldingToGains(gains, h, true)
        })

        setPostHarvestGains(gains)
      } else {
        setSelectedCoins(new Set())
        setPostHarvestGains(initialGains)
      }
    },
    [initialGains]
  )

  const value = useMemo(
    () => ({
      selectedCoins,
      postHarvestGains,
      toggleHolding,
      toggleAll
    }),
    [selectedCoins, postHarvestGains, toggleHolding, toggleAll]
  )

  return <HarvestingContext.Provider value={value}>{children}</HarvestingContext.Provider>
}

export const useHarvesting = () => useContext(HarvestingContext)
