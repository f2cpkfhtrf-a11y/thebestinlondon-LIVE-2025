import venuesData from "../public/venues.json";
import overridesData from "../data/dietary_overrides.json";

type VenuesData = {
  venues: Array<{
    slug?: string;
    id?: string;
    halal_verified?: boolean;
    halal_source?: string;
    vegetarian_options?: boolean;
    vegan_friendly?: boolean;
    gluten_free_options?: boolean;
    dietary_tags?: {
      halal?: boolean;
      vegetarian?: boolean;
      vegan?: boolean;
      gluten_free?: boolean;
    };
    [key: string]: any;
  }>;
};

type OverridesData = {
  [key: string]: {
    halal_verified?: boolean;
    halal_source?: string;
    vegetarian_options?: boolean;
    vegan_friendly?: boolean;
    gluten_free_options?: boolean;
  };
};

const venues = (venuesData as VenuesData).venues;
const overrides = (overridesData as OverridesData);

export function withDietary(venue: any) {
  const overrideKey = venue.slug || venue.id;
  const ov = overrideKey ? (overrides[overrideKey] || {}) : {};
  return { ...venue, ...ov };
}

export function halalOnly(list: any[]) {
  return list.map(withDietary).filter(v => v.halal_verified === true || v.dietary_tags?.halal === true);
}

export function dietaryFlags(venue: any) {
  const v = withDietary(venue);
  return {
    halal: v.halal_verified === true || v.dietary_tags?.halal === true,
    vegetarian: v.vegetarian_options === true || v.dietary_tags?.vegetarian === true,
    vegan: v.vegan_friendly === true || v.dietary_tags?.vegan === true,
    gluten_free: v.gluten_free_options === true || v.dietary_tags?.gluten_free === true
  };
}
