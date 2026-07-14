const CACHE_KEY = "today-ai-brief";
const CACHE_TIME = 15 * 60 * 1000;

export interface CachedBrief {
  key: string;
  brief: string;
  timestamp: number;
}

export function buildCacheKey(data: {
  temp: number;
  feelsLike: number;
  humidity: number;
  aqi: number;
  pm25: number;
  icon: string;
  district: string;
  province: string;
}) {
  return [
    data.temp,
    data.feelsLike,
    data.humidity,
    data.aqi,
    data.pm25,
    data.icon,
    data.district,
    data.province,
  ].join("|");
}

export function getCachedBrief(
  key: string
): string | null {

  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem(CACHE_KEY);

  if (!raw) return null;

  try {

    const cache =
      JSON.parse(raw) as CachedBrief;

    if (cache.key !== key) {
      return null;
    }

    if (
      Date.now() - cache.timestamp >
      CACHE_TIME
    ) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return cache.brief;

  } catch {
    return null;
  }
}

export function saveCachedBrief(
  key: string,
  brief: string
) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      key,
      brief,
      timestamp: Date.now(),
    })
  );
}

export function clearCachedBrief() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(CACHE_KEY);
}