export const isValidFsaScore = (n?: number): boolean => {
  return typeof n === 'number' && n > 0 && n <= 5;
};

export const getFsaDisplayValue = (fsaScore?: number): string | null => {
  if (!isValidFsaScore(fsaScore)) return null;
  return `${fsaScore}/5`;
};

export const shouldShowFsaBadge = (venue: any): boolean => {
  const fsaScore = venue.fsa_rating || venue.fsa?.rating;
  return isValidFsaScore(fsaScore);
};
