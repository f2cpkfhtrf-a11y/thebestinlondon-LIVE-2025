// Best of London Score Badge Component - Enhanced with BIL Score System
import React from 'react';
import BILScore from './BILScore';
import { calculateBestOfLondonScore } from '../utils/halalStations';

export default function BestOfLondonBadge({ venue, size = 'medium', showTooltip = true, showExplanation = false }) {
  const score = calculateBestOfLondonScore(venue);
  
  // Convert 5-point scale to 10-point scale for BIL Score
  const bilScore = (score / 5) * 10;
  
  return (
    <BILScore 
      score={bilScore} 
      venue={venue} 
      showExplanation={showExplanation} 
      size={size}
      showSubScores={showExplanation}
    />
  );
}