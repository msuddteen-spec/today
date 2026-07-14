import { WeatherData } from "@/types/weather";

export async function getWeather(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const key = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=th&appid=${key}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Weather API Error");
  }

  const json = await res.json();

  return {
    temp: Math.round(json.main.temp),
    feelsLike: Math.round(json.main.feels_like),
    humidity: json.main.humidity,
    wind: Math.round(json.wind.speed),
    pressure: json.main.pressure,
    description: json.weather[0].description,
    icon: json.weather[0].icon,
    sunrise: json.sys.sunrise,
    sunset: json.sys.sunset,
  };
}