import React from 'react';

const WhiskerMap = ({ whiskers = {} }) => {
  const getColor = (w) => (whiskers[w] < 4095 ? '#ff4444' : '#888');
  const whiskerWidth = (w) => (whiskers[w] < 4095 ? 4 : 1.5);

  return (
    <div
      style={{
        backgroundColor: '#222',
        borderRadius: '8px',
        border: '1px solid #444',
        padding: '0.4em',
        width: '140px',
        height: '140px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ color: 'white', fontSize: '0.75em', marginBottom: '0.25em' }}>Whiskers</div>
      <svg width="100%" height="100%" viewBox="0 0 140 140">
        {/* Labels */}
        <text x="35" y="12" fill="white" fontSize="7" textAnchor="middle">L</text>
        <text x="105" y="12" fill="white" fontSize="7" textAnchor="middle">R</text>

        {/* Modules */}
        <rect x="40" y="35" width="6" height="70" rx="2" fill="#aaa" stroke="#444" strokeWidth="1" />
        <rect x="94" y="35" width="6" height="70" rx="2" fill="#aaa" stroke="#444" strokeWidth="1" />

        {/* Left Whiskers (W0–W3) */}
        <line x1="40" y1="35" x2="10" y2="15" stroke={getColor('W0')} strokeWidth={whiskerWidth('W0')} />
        <line x1="40" y1="50" x2="5" y2="50" stroke={getColor('W1')} strokeWidth={whiskerWidth('W1')} />
        <line x1="40" y1="70" x2="5" y2="85" stroke={getColor('W2')} strokeWidth={whiskerWidth('W2')} />
        <line x1="40" y1="105" x2="10" y2="125" stroke={getColor('W3')} strokeWidth={whiskerWidth('W3')} />

        {/* Right Whiskers (W7–W4) */}
        <line x1="100" y1="35" x2="130" y2="15" stroke={getColor('W7')} strokeWidth={whiskerWidth('W7')} />
        <line x1="100" y1="50" x2="135" y2="50" stroke={getColor('W6')} strokeWidth={whiskerWidth('W6')} />
        <line x1="100" y1="70" x2="135" y2="85" stroke={getColor('W5')} strokeWidth={whiskerWidth('W5')} />
        <line x1="100" y1="105" x2="130" y2="125" stroke={getColor('W4')} strokeWidth={whiskerWidth('W4')} />
      </svg>
    </div>
  );
};

export default WhiskerMap;
