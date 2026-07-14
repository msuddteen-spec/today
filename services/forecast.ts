export interface HourForecast {
  time: string;
  temp: number;
  icon: string;
}

export async function getHourlyForecast(
  lat: number,
  lon: number
): Promise<HourForecast[]> {
  const key = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=th&appid=${key}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Forecast API Error");
  }

  const json = await res.json();

  return json.list.slice(0, 8).map((item: any) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temp: Math.round(item.main.temp),
    icon: item.weather[0].icon,
  }));
}