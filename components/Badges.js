import React from 'react';
import BILScore from './BILScore';
import FSABadge from './FSABadge';

const BadgeContainer = ({ children, className = '' }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {children}
    </div>
  );
};

export { BILScore, FSABadge, BadgeContainer };
