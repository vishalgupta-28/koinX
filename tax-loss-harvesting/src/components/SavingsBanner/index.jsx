import React from 'react'
import { formatCurrency } from '../../utils/gainCalculations'

const SavingsBanner = ({ savings }) => (
  <div
    style={{
      background: 'transparent',
      border: 'none',
      borderRadius: 8,
      padding: '8px 0 0 0',
      marginTop: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexWrap: 'wrap'
    }}
  >
    <span
      style={{
        fontSize: 13,
        fontWeight: 600,
        color: '#dbeafe'
      }}
    >
      Congrats: You are going to save upto {formatCurrency(savings)}
    </span>
  </div>
)

export default SavingsBanner
