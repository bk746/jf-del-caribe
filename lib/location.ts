/** Coordenadas y enlaces Google Maps — Av. Chemuyil, Playa del Carmen. */
export const COMPANY_ADDRESS = {
  line1: "Av. Chemuyil",
  line2: "77725 Playa del Carmen",
  region: "Quintana Roo, México",
  display: "Av. Chemuyil, 77725 Playa del Carmen, Quintana Roo",
  mapsQuery: "Av. Chemuyil, 77725 Playa del Carmen, Quintana Roo, Mexico",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Av.+Chemuyil,+77725+Playa+del+Carmen,+Quintana+Roo,+Mexico",
} as const;

export function getGoogleMapsEmbedUrl(query = COMPANY_ADDRESS.mapsQuery) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=es&z=15&output=embed`;
}

export const LOCATION = {
  name: "JF Caribe",
  city: "Playa del Carmen",
  region: "Quintana Roo",
  country: "México",
  addressLine: `${COMPANY_ADDRESS.line1}, ${COMPANY_ADDRESS.line2}, ${COMPANY_ADDRESS.region}`,
  latitude: 20.6296,
  longitude: -87.0739,
  zoom: 15,
} as const;

export const GOOGLE_MAPS_URL = COMPANY_ADDRESS.mapsUrl;
export const GOOGLE_MAPS_EMBED_URL = getGoogleMapsEmbedUrl();
