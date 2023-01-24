import axios from "axios";

export async function geoLocator(lat: number, lon: number) {
  const query: string = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${process.env.MAPBOX_API}`;
  try {
    const res = await axios({
      url: query,
      method: "GET",
    });
    const loc = res?.data?.features;
    console.log("🚀 ~ file: geocoder.ts:11 ~ geoLocator ~ loc", loc);
    let place: string = loc[0].text;
    // place = place.split(",")[0];
    return place || "Not Found";
  } catch (err: any) {
    console.log(err?.message);
  }
}

export async function geoCords(place: string) {
  const query: string = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${process.env.MAPBOX_API}`;
  try {
    const res = await axios({
      url: query,
      method: "GET",
    });
    const loc = res?.data?.features;
    if (!loc || loc.length === 0) return null;
    const cords: number[] = loc[0]?.geometry?.coordinates;
    return cords;
  } catch (err: any) {
    console.log(err?.message);
  }
}
