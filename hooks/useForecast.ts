"use client";

import { useEffect, useState } from "react";
import { getHourlyForecast } from "@/services/forecast";

export default function useForecast(
  lat?: number,
  lon?: number
) {
  const [forecast, setForecast] = useState<any[]>([]);

  useEffect(() => {
    if (!lat || !lon) return;

    getHourlyForecast(lat, lon)
      .then(setForecast)
      .catch(console.error);
  }, [lat, lon]);

  return forecast;
}