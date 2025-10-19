import venuesData from "../public/venues.json";
import { halalOnly } from "./dietary";

type VenuesData = {
  venues: Array<{
    cuisine_slug?: string;
    cuisines?: string[];
    area_slug?: string;
    area?: string;
    neighborhood?: string;
    borough?: string;
    halal_verified?: boolean;
    dietary_tags?: { halal?: boolean };
    [key: string]: any;
  }>;
};

export function getLiveStats() {
  const data = venuesData as VenuesData;
  const venues = data.venues || [];
  
  const total = venues.length;
  const cuisines = new Set(
    venues.map(v => v.cuisine_slug || (v.cuisines && v.cuisines[0]?.toLowerCase())).filter(Boolean)
  ).size;
  
  const areas = new Set(
    venues.map(v => v.area_slug || v.area || v.neighborhood || v.borough).filter(Boolean)
  ).size;
  
  const halal = halalOnly(venues).length;
  
  return { total, cuisines, areas, halal };
}
