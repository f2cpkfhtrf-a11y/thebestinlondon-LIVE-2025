export function appendVersion(url: string): string {
  const v = process.env.NEXT_PUBLIC_ASSET_VERSION || process.env.ASSET_VERSION || '1';
  return url.includes('?') ? `${url}&v=${v}` : `${url}?v=${v}`;
}
