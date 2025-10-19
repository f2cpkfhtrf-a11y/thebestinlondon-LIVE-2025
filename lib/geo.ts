export type LatLng = { lat: number; lng: number };

export function haversineKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const la1 = a.lat * Math.PI / 180;
  const la2 = b.lat * Math.PI / 180;
  const h = Math.sin(dLat/2)**2 + Math.cos(la1)*Math.cos(la2)*Math.sin(dLng/2)**2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function distanceKm(a: LatLng, b: LatLng): number {
  return haversineKm(a, b);
}

export function withinKm(a: LatLng, b: LatLng, km: number): boolean {
  return haversineKm(a, b) <= km;
}

export interface VenueWithDistance {
  distance: number;
  [key: string]: any;
}

export function filterByRadius(
  venues: any[],
  center: LatLng,
  km: number,
  getVenueCoords: (venue: any) => LatLng | null
): VenueWithDistance[] {
  const venuesWithDistance = venues.map(venue => {
    const venueCoords = getVenueCoords(venue);
    if (!venueCoords) return null;
    
    const distance = haversineKm(center, venueCoords);
    if (distance > km) return null;
    
    return { ...venue, distance };
  }).filter(Boolean) as VenueWithDistance[];

  return venuesWithDistance.sort((a, b) => a.distance - b.distance);
}

export async function safeUserLocation(): Promise<LatLng | null> {
  if (!navigator.geolocation) {
    return null;
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.warn('Geolocation denied or failed:', error.message);
        resolve(null);
      },
      {
        timeout: 10000,
        enableHighAccuracy: false,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
}
