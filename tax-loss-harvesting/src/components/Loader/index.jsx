import React from 'react'

export const CardSkeleton = () => (
  <div
    style={{
      background: '#1a1a1a',
      borderRadius: 16,
      padding: 24,
      flex: 1,
      minHeight: 200
    }}
  >
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        style={{
          height: 16,
          background: 'linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
          borderRadius: 8,
          marginBottom: 16
        }}
      />
    ))}
  </div>
)

export const TableSkeleton = () => (
  <div style={{ marginTop: 24 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        style={{
          height: 64,
          background: 'linear-gradient(90deg, #111b31 25%, #1a2742 50%, #111b31 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
          borderRadius: 8,
          marginBottom: 8
        }}
      />
    ))}
  </div>
)
