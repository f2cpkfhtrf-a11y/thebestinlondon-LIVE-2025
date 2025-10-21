const fs = require("fs");
const path = require("path");

let MAP;
function initMap() {
  if (MAP) return MAP;
  const p = path.join(process.cwd(),"data/areas.json");
  const json = JSON.parse(fs.readFileSync(p,"utf8"));
  const map = new Map();
  for (const a of json.areas){
    map.set(a.slug,a.slug);
    for (const al of (a.aliases||[])){
      map.set(slugify(al), a.slug);
    }
    map.set(slugify(a.name), a.slug);
  }
  MAP = map;
  return MAP;
}

function slugify(s){
  return String(s||"").toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
}

function normaliseArea(input){
  const key=slugify(input);
  const map = initMap();
  return map.get(key) || key;
}

function areaList(){
  const p=path.join(process.cwd(),"data/areas.json");
  const json=JSON.parse(fs.readFileSync(p,"utf8"));
  return json.areas.map(a=>({slug:a.slug,name:a.name}));
}

module.exports = { slugify, normaliseArea, areaList };
