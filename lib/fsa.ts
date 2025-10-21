export function isValidFsaScore(s?: number): boolean {
  return Number.isFinite(s) && s! > 0 && s! <= 5;
}

export const getFsaDisplayValue = (fsaScore?: number): string | null => {
  if (!isValidFsaScore(fsaScore)) return null;
  return `${fsaScore}/5`;
};

export const shouldShowFsaBadge = (venue: any): boolean => {
  const fsaScore = venue.fsa_rating || venue.fsa?.rating;
  return isValidFsaScore(fsaScore);
};
