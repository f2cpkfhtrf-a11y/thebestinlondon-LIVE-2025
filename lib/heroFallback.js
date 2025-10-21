const fs = require("fs");
const path = require("path");
const { normaliseArea, slugify } = require("./areas");

function resolveVenueCardOrHero(venue){
    const pub = p => path.join(process.cwd(),"public",p.replace(/^\/+/,""));
    const tryLocal = p => (p && p.startsWith("/")) && fs.existsSync(pub(p)) ? p : null;

    const card = tryLocal(venue.image_card_path || venue.cardImage);
    if (card) return card;

    const img0 = tryLocal(venue.images?.[0]?.url);
    if (img0) return img0;

    const cuisine = slugify((venue.cuisines||[])[0]||"");
    const cuisineTile = tryLocal(`/images/tiles/cuisines/${cuisine}.webp`);
    if (cuisineTile) return cuisineTile;

    const area = normaliseArea(venue.borough||venue.area||"");
    const areaTile = tryLocal(`/images/tiles/areas/${area}.webp`);
    if (areaTile) return areaTile;

    return "/images/heroes/site-default.webp";
}

module.exports = { resolveVenueCardOrHero };
