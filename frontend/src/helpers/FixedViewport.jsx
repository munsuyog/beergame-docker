// FixedViewport.jsx
import React from 'react';

const FixedViewport = ({ children }) => {
  return (
    <div className="fixed-viewport-wrapper">
      <div className="fixed-viewport-content">
        {children}
      </div>
    </div>
  );
};

export default FixedViewport;