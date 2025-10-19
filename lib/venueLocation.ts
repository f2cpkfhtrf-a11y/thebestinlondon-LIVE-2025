import venuesData from "../public/venues.json";

type VenuesData = {
  venues: Array<{
    lat?: number;
    lng?: number;
    coordinates?: { lat: number; lng: number };
    location?: { lat: number; lng: number };
    [key: string]: any;
  }>;
};

type Venue = VenuesData["venues"][number];

export type { Venue };

export function getVenueLatLng(v: Venue) {
  // Check multiple possible coordinate fields
  if (v.lat && v.lng) return { lat: v.lat, lng: v.lng };
  
  // Check if coordinates object exists
  if (v.coordinates?.lat && v.coordinates?.lng) {
    return { lat: v.coordinates.lat, lng: v.coordinates.lng };
  }
  
  // Check if location object exists
  if (v.location?.lat && v.location?.lng) {
    return { lat: v.location.lat, lng: v.location.lng };
  }
  
  return null;
}
