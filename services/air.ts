import { AirData } from "@/types/weather";

export async function getAirQuality(
  lat: number,
  lon: number
): Promise<AirData> {

  const key = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Air API Error");
  }

  const json = await res.json();

  return {
    aqi: json.list[0].main.aqi,
    pm25: Math.round(json.list[0].components.pm2_5),
    pm10: Math.round(json.list[0].components.pm10),
    co: Math.round(json.list[0].components.co),
    no2: Math.round(json.list[0].components.no2),
  };
}