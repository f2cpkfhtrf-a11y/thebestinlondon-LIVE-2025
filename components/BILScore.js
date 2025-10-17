import { useState } from 'react';

export default function BILScore({ 
  score, 
  venue, 
  size = 'card', // 'card' | 'detail'
  showBreakdown = false,
  className = ''
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Calculate BIL score (0-10 scale)
  const bilScore = Math.min(10, Math.max(0, (score || 0) * 2));
  const scorePercentage = (bilScore / 10) * 100;
  
  // Determine score category and styling
  const getScoreCategory = (score) => {
    if (score >= 8.5) return 'high';
    if (score >= 6) return 'mid';
    return 'low';
  };
  
  const category = getScoreCategory(bilScore);
  
  const getScoreColor = (category) => {
    switch (category) {
      case 'high': return 'score-high';
      case 'low': return 'score-low';
      default: return 'score-mid';
    }
  };
  
  const getScoreLabel = (score) => {
    if (score >= 9) return 'Exceptional';
    if (score >= 8.5) return 'Outstanding';
    if (score >= 8) return 'Excellent';
    if (score >= 7) return 'Very Good';
    if (score >= 6) return 'Good';
    return 'Needs Improvement';
  };
  
  // Calculate sub-scores (mock data for now)
  const subScores = {
    ambience: Math.min(10, (venue?.rating || 4) * 2 + Math.random()),
    value: Math.min(10, (venue?.rating || 4) * 2 + Math.random()),
    cleanliness: Math.min(10, (venue?.fsa_rating || 4) * 2 + Math.random()),
    service: Math.min(10, (venue?.rating || 4) * 2 + Math.random()),
    experience: Math.min(10, (venue?.rating || 4) * 2 + Math.random())
  };
  
  if (size === 'card') {
    return (
      <div className={`relative ${className}`}>
        {/* Compact ring for cards */}
        <div 
          className={`bil-score-ring ${getScoreColor(category)}`}
          style={{
            background: `conic-gradient(from 0deg, var(--tw-color-${getScoreColor(category)}), ${scorePercentage * 3.6}deg, transparent ${scorePercentage * 3.6}deg)`
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div className="text-center">
            <div className="text-lg font-bold text-warmWhite">
              {bilScore.toFixed(1)}
            </div>
            <div className="text-xs text-grey font-nav">
              BIL
            </div>
          </div>
        </div>
        
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute top-full right-0 mt-2 bg-charcoal-light border border-gold/20 rounded-lg p-3 shadow-charcoal-lg z-50 min-w-48">
            <div className="text-sm font-semibold text-warmWhite mb-1">
              BIL Verified Score
            </div>
            <div className="text-xs text-grey mb-2">
              {getScoreLabel(bilScore)} • {bilScore.toFixed(1)}/10
            </div>
            <div className="text-xs text-grey-light">
              Weighted score blending Google, TripAdvisor, FSA, and editorial signals.
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Detail page layout
  return (
    <div className={`bil-score-card ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
              <span className="text-charcoal font-bold text-lg">BIL</span>
            </div>
            <div>
              <h3 className="text-xl font-serif font-semibold text-warmWhite">
                BIL Verified Score
              </h3>
              <p className="text-sm text-grey">
                {getScoreLabel(bilScore)} • Weighted score blending Google, TripAdvisor, FSA, and editorial signals
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-4xl font-bold text-warmWhite mb-1">
            {bilScore.toFixed(1)}
          </div>
          <div className="text-sm text-grey">out of 10</div>
        </div>
      </div>
      
      {showBreakdown && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-warmWhite mb-3">Category Breakdown</h4>
          {Object.entries(subScores).map(([category, score]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-sm text-grey capitalize">
                {category.replace('_', ' ')}
              </span>
              <div className="flex items-center gap-2 w-32">
                <div className="bil-score-mini-bar flex-1">
                  <div 
                    className={`bil-score-mini-fill ${
                      score >= 8.5 ? 'bil-score-mini-fill-high' : 
                      score < 6 ? 'bil-score-mini-fill-low' : ''
                    }`}
                    style={{ width: `${(score / 10) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-grey w-8 text-right">
                  {score.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Accessibility */}
      <div className="sr-only">
        Best in London score {bilScore.toFixed(1)} out of 10. {getScoreLabel(bilScore)} rating.
      </div>
    </div>
  );
}
