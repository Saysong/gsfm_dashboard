import React from 'react';

const NotificationBubble = ({ message, timestamp, onDismiss }) => {
  const minutesAgo = Math.floor((Date.now() - timestamp) / 60000);
  const timeText = minutesAgo === 0 ? 'Just now' : `${minutesAgo} min ago`;

  return (
    <div
      style={{
        marginBottom: '0.8em',
        padding: '0.6em',
        backgroundColor: '#330000',
        border: '1px solid #a00',
        borderRadius: '8px',
        color: 'white',
        position: 'relative',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        maxWidth: '100%',
      }}
    >
      <strong>{message}</strong>
      <p style={{ fontSize: '0.8em', margin: '0.3em 0 0' }}>{timeText}</p>
      <button
        onClick={onDismiss}
        style={{
          position: 'absolute',
          top: '4px',
          right: '6px',
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1em',
          cursor: 'pointer',
        }}
      >
        ×
      </button>
    </div>
  );
};

export default NotificationBubble;
