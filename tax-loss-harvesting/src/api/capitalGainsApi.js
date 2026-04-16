const CAPITAL_GAINS_DATA = {
  capitalGains: {
    stcg: { profits: 70200.88, losses: 1548.53 },
    ltcg: { profits: 5020, losses: 3050 }
  }
}

export const fetchCapitalGains = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve(CAPITAL_GAINS_DATA), 800)
  )
