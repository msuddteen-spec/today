export interface LocationData {
  subdistrict: string;
  district: string;
  province: string;
}

export async function reverseLocation(
  lat: number,
  lon: number
): Promise<LocationData> {
  try {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 6000);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&accept-language=th&lat=${lat}&lon=${lon}`,
      {
        cache: "no-store",
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          "User-Agent": "TODAY Weather App",
        },
      }
    );

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error("Reverse geocode failed");
    }

    const json = await res.json();
    const a = json.address ?? {};

    const subdistrict =
      a.suburb ||
      a.city_district ||
      a.quarter ||
      a.neighbourhood ||
      a.village ||
      a.hamlet ||
      "";

    const district =
      a.county ||
      a.municipality ||
      a.state_district ||
      a.town ||
      a.city ||
      "";

    const province =
      a.state ||
      a.province ||
      "";

    return {
      subdistrict,
      district,
      province,
    };

  } catch (error) {

    console.warn("reverseLocation:", error);

    return {
      subdistrict: "",
      district: "",
      province: "",
    };

  }
}