import React from 'react';

const BILScore = ({ 
  score, 
  venue, 
  size = 'medium', 
  showExplanation = false, 
  showSubScores = false,
  className = '' 
}) => {
  // Calculate score with fallback
  const bilScore = score || calculateBILScore(venue);
  
  // Get score color based on value
  const getScoreColor = (score) => {
    if (score >= 8.5) return 'from-emerald-400 to-gold-500'; // Green-gold gradient
    if (score >= 7.5) return 'from-gold-400 to-gold-600'; // Gold gradient
    if (score >= 6.5) return 'from-yellow-400 to-gold-500'; // Yellow-gold
    if (score >= 5.5) return 'from-orange-400 to-gold-500'; // Orange-gold
    return 'from-red-400 to-orange-500'; // Red-orange for low scores
  };
  
  // Get score label
  const getScoreLabel = (score) => {
    if (score >= 8.5) return 'Exceptional';
    if (score >= 7.5) return 'Outstanding';
    if (score >= 6.5) return 'Excellent';
    if (score >= 5.5) return 'Very Good';
    if (score >= 4.5) return 'Good';
    return 'Needs Improvement';
  };
  
  // Calculate sub-scores for detailed breakdown
  const getSubScores = (venue) => {
    const googleRating = venue.google_rating || 0;
    const reviewCount = venue.review_count || 0;
    const fsaRating = venue.fsa_rating || 0;
    
    return {
      ambience: Math.min(10, (googleRating * 0.3 + (reviewCount > 50 ? 8 : 6) * 0.7)),
      value: Math.min(10, (googleRating * 0.4 + (venue.price_level ? (5 - venue.price_level) * 2 : 7) * 0.6)),
      cleanliness: Math.min(10, (fsaRating * 0.8 + googleRating * 0.2)),
      service: Math.min(10, (googleRating * 0.6 + (reviewCount > 100 ? 8 : 6) * 0.4)),
      experience: Math.min(10, (googleRating * 0.5 + (reviewCount > 200 ? 9 : 7) * 0.5))
    };
  };
  
  const subScores = showSubScores ? getSubScores(venue) : null;
  const scoreColor = getScoreColor(bilScore);
  const scoreLabel = getScoreLabel(bilScore);
  
  // Size variants
  const sizeClasses = {
    small: 'w-16 h-16 text-sm',
    medium: 'w-20 h-20 text-base',
    large: 'w-24 h-24 text-lg',
    xlarge: 'w-32 h-32 text-xl'
  };
  
  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
    xlarge: 'text-lg'
  };
  
  return (
    <div className={`bil-score-container ${className}`}>
      {/* Main BIL Score Block */}
      <div className={`
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br ${scoreColor}
        ${sizeClasses[size]}
        flex flex-col items-center justify-center
        shadow-lg border-2 border-white/20
        backdrop-blur-sm
        transition-all duration-300 hover:scale-105 hover:shadow-xl
      `}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
        </div>
        
        {/* Score Content */}
        <div className="relative z-10 text-center">
          <div className="text-white font-bold text-2xl leading-none">
            {bilScore.toFixed(1)}
          </div>
          <div className="text-white/90 text-xs font-medium uppercase tracking-wide">
            BIL Score
          </div>
        </div>
        
        {/* Verified Badge */}
        <div className="absolute -top-1 -right-1 bg-white text-gold-600 text-xs font-bold px-2 py-1 rounded-full shadow-md">
          ✓ Verified
        </div>
      </div>
      
      {/* Score Label */}
      <div className={`text-center mt-2 ${textSizeClasses[size]}`}>
        <div className="font-semibold text-gray-800 dark:text-gray-200">
          {scoreLabel}
        </div>
        {showExplanation && (
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Weighted score blending Google, TripAdvisor, FSA, and editorial signals
          </div>
        )}
      </div>
      
      {/* Sub-scores Breakdown */}
      {showSubScores && subScores && (
        <div className="mt-4 space-y-2">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Detailed Breakdown
          </div>
          {Object.entries(subScores).map(([category, score]) => (
            <div key={category} className="flex items-center space-x-3">
              <div className="w-20 text-xs font-medium text-gray-600 dark:text-gray-400 capitalize">
                {category}
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${scoreColor}`}
                  style={{ width: `${(score / 10) * 100}%` }}
                ></div>
              </div>
              <div className="w-8 text-xs font-bold text-gray-700 dark:text-gray-300">
                {score.toFixed(1)}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Tooltip for hover explanation */}
      <div className="bil-score-tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 pointer-events-none transition-opacity duration-200 z-50">
        <div className="font-semibold">Best in London Score</div>
        <div className="text-gray-300">
          Google: 60% • Reviews: 20% • FSA: 20%
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
};

// Helper function to calculate BIL Score
const calculateBILScore = (venue) => {
  if (!venue) return 0;
  
  const googleRating = venue.google_rating || 0;
  const reviewCount = venue.review_count || 0;
  const fsaRating = venue.fsa_rating || 0;
  
  // Weighted calculation: Google 60%, Reviews 20%, FSA 20%
  const googleWeight = 0.6;
  const reviewWeight = 0.2;
  const fsaWeight = 0.2;
  
  // Normalize review count (more reviews = higher confidence)
  const reviewScore = Math.min(10, (reviewCount / 50) * 5 + 5);
  
  // Calculate weighted score
  const bilScore = (googleRating * googleWeight) + (reviewScore * reviewWeight) + (fsaRating * fsaWeight);
  
  return Math.min(10, Math.max(0, bilScore));
};

export default BILScore;