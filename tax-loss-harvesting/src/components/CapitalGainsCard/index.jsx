import { calculateNetGain, calculateRealisedGain, formatCurrency, formatINR } from '../../utils/gainCalculations'
import SavingsBanner from '../SavingsBanner'
import './CapitalGainsCard.css'

const ValueWithHover = ({ value }) => (
  <span title={formatINR(value)} className="currency-value" style={{ cursor: 'help' }}>
    {formatCurrency(value)}
  </span>
)

const GainRow = ({ isDark, stProfits, stLosses, stNet, ltProfits, ltLosses, ltNet }) => {
  const labelColor = isDark ? '#475569' : 'rgba(255,255,255,0.85)'
  const valueColor = isDark ? '#111827' : '#ffffff'
  const emphasisColor = isDark ? '#0f172a' : '#ffffff'

  return (
    <div className="gain-table">
      <div className="gain-table-header">
        <span style={{ color: labelColor, fontSize: 12 }}></span>
        <span style={{ color: labelColor, fontSize: 12, fontWeight: 500 }}>Short-term</span>
        <span style={{ color: labelColor, fontSize: 12, fontWeight: 500 }}>Long-term</span>
      </div>
      <div className="gain-table-row">
        <span style={{ color: labelColor, fontSize: 12 }}>Profits</span>
        <span style={{ color: valueColor, fontWeight: 500 }}><ValueWithHover value={stProfits} /></span>
        <span style={{ color: valueColor, fontWeight: 500 }}><ValueWithHover value={ltProfits} /></span>
      </div>
      <div className="gain-table-row">
        <span style={{ color: labelColor, fontSize: 12 }}>Losses</span>
        <span style={{ color: valueColor, fontWeight: 500 }}>- <ValueWithHover value={stLosses} /></span>
        <span style={{ color: valueColor, fontWeight: 500 }}>- <ValueWithHover value={ltLosses} /></span>
      </div>
      <div className="gain-table-row">
        <span style={{ color: emphasisColor, fontSize: 12, fontWeight: 600 }}>Net Capital Gains</span>
        <span style={{ color: emphasisColor, fontWeight: 600 }}>
          {stNet < 0 ? '-' : ''}<ValueWithHover value={stNet} />
        </span>
        <span style={{ color: emphasisColor, fontWeight: 600 }}>
          {ltNet < 0 ? '-' : ''}<ValueWithHover value={ltNet} />
        </span>
      </div>
    </div>
  )
}

const CapitalGainsCard = ({ title, gains, isDark = false, preRealisedGains = null }) => {
  const stNet = calculateNetGain(gains.stcg.profits, gains.stcg.losses)
  const ltNet = calculateNetGain(gains.ltcg.profits, gains.ltcg.losses)
  const realised = calculateRealisedGain(gains.stcg, gains.ltcg)
  const savings = preRealisedGains !== null ? preRealisedGains - realised : 0
  const realisedLabel = isDark ? 'Realised Capital Gains' : 'Effective Capital Gains'

  return (
    <div className={`card ${isDark ? 'card-dark' : 'card-blue'}`}>
      <h3 className={`card-title ${isDark ? 'card-title-dark' : 'card-title-light'}`}>{title}</h3>
      <GainRow
        isDark={isDark}
        stProfits={gains.stcg.profits}
        stLosses={gains.stcg.losses}
        stNet={stNet}
        ltProfits={gains.ltcg.profits}
        ltLosses={gains.ltcg.losses}
        ltNet={ltNet}
      />
      <div className={`card-divider ${isDark ? 'card-divider-dark' : 'card-divider-light'}`} style={{ marginTop: 16 }} />
      <div className="realised-row">
        <span
          style={{
            color: isDark ? '#1e293b' : 'rgba(255,255,255,0.9)',
            fontSize: 14
          }}
        >
          {realisedLabel}
        </span>
        <span
          style={{
            color: isDark ? '#111827' : '#fff',
            fontSize: 24,
            fontWeight: 700
          }}
          title={formatINR(realised)}
        >
          {formatCurrency(realised)}
        </span>
      </div>
      {!isDark && savings > 0 && <SavingsBanner savings={savings} />}
    </div>
  )
}

export default CapitalGainsCard
