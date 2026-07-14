export interface AIRequest {

  location: {
    subdistrict: string;
    district: string;
    province: string;
  };

  weather: {
    temp: number;
    feelsLike: number;
    humidity: number;
    wind: number;
    description: string;
    icon: string;
  };

  air: {
    aqi: number;
    pm25: number;
    pm10: number;
  };

  forecast: {
    time: string;
    temp: number;
    description: string;
  }[];

  datetime: string;

}

export async function getAIBrief(
  data: AIRequest
): Promise<string> {

  try {

    const res = await fetch(
      "/api/ai-brief",
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),

      }
    );

    if (!res.ok) {

      throw new Error(
        "AI API Error"
      );

    }

    const json = await res.json();

    return (
      json.brief ??
      "ไม่สามารถสร้าง AI Brief ได้"
    );

  } catch (error) {

    console.error(error);

    return "ไม่สามารถเชื่อมต่อ AI ได้";

  }

}