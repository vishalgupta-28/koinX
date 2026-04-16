import { useState } from 'react'
import { useHarvesting } from '../../context/HarvestingContext'
import { formatCrypto, formatCurrency, formatINR } from '../../utils/gainCalculations'
import './HoldingsTable.css'

const ValueWithHover = ({ value }) => (
  <span title={formatINR(value)} className="currency-hover">
    {formatCurrency(value)}
  </span>
)

const GainCell = ({ gain, balance }) => {
  const isPositive = gain > 0
  const isNegative = gain < 0
  const showZero = Math.abs(gain) < 0.01
  return (
    <div className="gain-cell">
      <div
        className={`gain-amount ${isPositive ? 'positive' : isNegative ? 'negative' : ''}`}
        title={formatINR(gain)}
      >
        {showZero ? '--' : (isPositive ? '+' : isNegative ? '-' : '') + formatCurrency(Math.abs(gain))}
      </div>
      <div className="gain-balance">
        {showZero ? '--' : formatCrypto(balance)}
      </div>
    </div>
  )
}

const HoldingsTable = ({ holdings }) => {
  const { selectedCoins, toggleHolding, toggleAll } = useHarvesting()
  const [showAll, setShowAll] = useState(false)

  const visibleHoldings = showAll ? holdings : holdings.slice(0, 5)
  const allSelected =
    holdings.length > 0 && holdings.every((h) => selectedCoins.has(h.coin + h.coinName))
  const someSelected = holdings.some((h) => selectedCoins.has(h.coin + h.coinName))

  return (
    <div className="table-wrapper">
      <div className="table-scroll">
        <table className="holdings-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected && !allSelected
                  }}
                  onChange={(e) => toggleAll(holdings, e.target.checked)}
                />
              </th>
              <th>Asset</th>
              <th>
                <div>Holdings</div>
                <div className="sub-header">Current Market Rate</div>
              </th>
              <th>Total Current Value</th>
              <th>Short-term</th>
              <th>Long-Term</th>
              <th>Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {visibleHoldings.map((holding) => {
              const key = holding.coin + holding.coinName
              const isSelected = selectedCoins.has(key)

              return (
                <tr
                  key={key}
                  className={isSelected ? 'row-selected' : ''}
                  onClick={() => toggleHolding(holding)}
                  style={{ cursor: 'pointer' }}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleHolding(holding)}
                    />
                  </td>
                  <td>
                    <div className="asset-cell">
                      <img
                        src={holding.logo}
                        alt={holding.coin}
                        className="coin-logo"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/36'
                        }}
                      />
                      <div>
                        <div className="coin-symbol">{holding.coin}</div>
                        <div className="coin-name">{holding.coinName}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="cell-main">{formatCrypto(holding.totalHolding)} {holding.coin}</div>
                    <div className="cell-sub" title={formatINR(holding.currentPrice)}>{formatCurrency(holding.currentPrice)}/{holding.coin}</div>
                  </td>
                  <td>
                    <div className="cell-main" title={formatINR(holding.totalHolding * holding.currentPrice)}>{formatCurrency(holding.totalHolding * holding.currentPrice)}</div>
                  </td>
                  <td>
                    <GainCell gain={holding.stcg.gain} balance={holding.stcg.balance} />
                  </td>
                  <td>
                    <GainCell gain={holding.ltcg.gain} balance={holding.ltcg.balance} />
                  </td>
                  <td>
                    <div className={`sell-amount ${isSelected ? 'active' : ''}`}>
                      {isSelected ? formatCrypto(holding.totalHolding) + ' ' + holding.coin : '-'}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {holdings.length > 5 && (
        <div className="view-all-wrapper">
          <button className="view-all-btn" onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? 'View Less' : `View All ${holdings.length} Assets`}
          </button>
        </div>
      )}
    </div>
  )
}

export default HoldingsTable
