import React, { useState } from 'react'
import { HarvestingProvider, useHarvesting } from './context/HarvestingContext'
import { useCapitalGains } from './hooks/useCapitalGains'
import { useHoldings } from './hooks/useHoldings'
import CapitalGainsCard from './components/CapitalGainsCard'
import HoldingsTable from './components/HoldingsTable'
import { CardSkeleton, TableSkeleton } from './components/Loader'
import { calculateRealisedGain } from './utils/gainCalculations'
import './App.css'

const EMPTY_GAINS = {
  stcg: { profits: 0, losses: 0 },
  ltcg: { profits: 0, losses: 0 }
}

const NOTE_ITEMS = [
  'Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.',
  'Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.',
  'Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.',
  'Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.',
  'Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.'
]

const AppContent = ({ capitalGains, cgLoading, cgError, holdings, hLoading, hError }) => {
  const { postHarvestGains } = useHarvesting()
  const [isNotesOpen, setIsNotesOpen] = useState(false)
  const [showHowItWorks, setShowHowItWorks] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const preRealised = capitalGains ? calculateRealisedGain(capitalGains.stcg, capitalGains.ltcg) : 0

  return (
    <div className={`page ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <nav className="navbar">
        <img src="/logo.svg" alt="KoinX" className="brand-logo" />
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setIsDarkMode((prev) => !prev)}
          aria-label="Toggle light and dark mode"
          aria-pressed={isDarkMode}
        >
          <span className="theme-toggle-lines" aria-hidden="true">
            <span className="theme-line theme-line-top" />
            <span className="theme-line theme-line-bottom" />
          </span>
        </button>
      </nav>

      <main className="main">
        <section className="hero-section">
          <div className="title-row">
            <h1 className="page-title">Tax Harvesting</h1>
            <div
              className="how-wrap"
              onMouseEnter={() => setShowHowItWorks(true)}
              onMouseLeave={() => setShowHowItWorks(false)}
            >
              <button
                type="button"
                className="how-link"
                onFocus={() => setShowHowItWorks(true)}
                onBlur={() => setShowHowItWorks(false)}
                aria-label="How tax harvesting works"
              >
                How it works?
              </button>
              {showHowItWorks && (
                <div className="how-tooltip" role="tooltip">
                  <span className="how-tooltip-text">
                    Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper mattis
                    scelerisque tellus. Vel mattis diam duis morbi tellus dui consectetur.
                  </span>{' '}
                  <button type="button" className="know-more-btn">
                    Know More
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="notes-box">
            <button
              type="button"
              className="notes-toggle"
              onClick={() => setIsNotesOpen((prev) => !prev)}
              aria-expanded={isNotesOpen}
            >
              <span className="notes-left">
                <span className="info-badge">i</span>
                Important Notes & Disclaimers
              </span>
              <span className="notes-right">{isNotesOpen ? '^' : 'v'}</span>
            </button>

            {isNotesOpen && (
              <ul className="notes-list">
                {NOTE_ITEMS.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <div className="cards-row">
          {cgLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : capitalGains ? (
            <>
              <CapitalGainsCard
                title="Pre Harvesting"
                gains={capitalGains}
                isDark={true}
                isPageDark={isDarkMode}
              />
              <CapitalGainsCard
                title="After Harvesting"
                gains={postHarvestGains}
                isDark={false}
                isPageDark={isDarkMode}
                preRealisedGains={preRealised}
              />
            </>
          ) : (
            <p style={{ color: '#ef4444' }}>{cgError || 'Failed to load capital gains'}</p>
          )}
        </div>

        {hLoading ? (
          <TableSkeleton />
        ) : hError ? (
          <p style={{ color: '#ef4444', marginTop: 24 }}>{hError}</p>
        ) : (
          <HoldingsTable holdings={holdings} />
        )}
      </main>
    </div>
  )
}

const App = () => {
  const { data: capitalGains, isLoading: cgLoading, error: cgError } = useCapitalGains()
  const { holdings, isLoading: hLoading, error: hError } = useHoldings()

  return (
    <HarvestingProvider initialGains={capitalGains || EMPTY_GAINS}>
      <AppContent
        capitalGains={capitalGains}
        cgLoading={cgLoading}
        cgError={cgError}
        holdings={holdings}
        hLoading={hLoading}
        hError={hError}
      />
    </HarvestingProvider>
  )
}

export default App
