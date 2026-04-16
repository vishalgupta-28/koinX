export const calculateNetGain = (profits, losses) => profits - losses

export const calculateRealisedGain = (stcg, ltcg) =>
  calculateNetGain(stcg.profits, stcg.losses) +
  calculateNetGain(ltcg.profits, ltcg.losses)

export const applyHoldingToGains = (gains, holding, isSelecting) => {
  const multiplier = isSelecting ? 1 : -1
  const newGains = {
    stcg: { ...gains.stcg },
    ltcg: { ...gains.ltcg }
  }

  if (holding.stcg.gain > 0) {
    newGains.stcg.profits += multiplier * holding.stcg.gain
  } else if (holding.stcg.gain < 0) {
    newGains.stcg.losses += multiplier * Math.abs(holding.stcg.gain)
  }

  if (holding.ltcg.gain > 0) {
    newGains.ltcg.profits += multiplier * holding.ltcg.gain
  } else if (holding.ltcg.gain < 0) {
    newGains.ltcg.losses += multiplier * Math.abs(holding.ltcg.gain)
  }

  return newGains
}

export const formatINR = (value) => {
  if (Math.abs(value) < 0.01) return '₹ 0.00'
  return '₹ ' + Math.abs(value).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

export const formatCurrency = (value) => {
  if (Math.abs(value) < 0.01) return '$ 0.00'
  return '$ ' + Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

export const formatCrypto = (value) => {
  if (Math.abs(value) < 0.000001) return '0.000000'
  return value.toFixed(6)
}
