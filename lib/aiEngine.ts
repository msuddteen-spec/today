export interface AIInput {
  temp: number | null;
  feelsLike: number | null;
  humidity: number | null;
  wind: number | null;

  aqi: number | null;
  pm25: number | null;

  icon: string;
}

export function buildAIBrief(data: AIInput): string[] {
  const brief: string[] = [];

  if (
    data.temp !== null &&
    data.feelsLike !== null
  ) {
    const diff = data.feelsLike - data.temp;

    if (diff >= 3) {
      brief.push(
        `🌡 รู้สึกร้อนกว่าอุณหภูมิจริง ${diff}°`
      );
    }
  }

  if (
    data.humidity !== null &&
    data.humidity >= 75
  ) {
    brief.push(
      "💧 ความชื้นสูง อาจรู้สึกอบอ้าว"
    );
  }

  if (
    data.wind !== null &&
    data.wind >= 8
  ) {
    brief.push(
      "💨 ลมแรง ควรระวังสิ่งของปลิว"
    );
  }

  if (
    data.icon.startsWith("09") ||
    data.icon.startsWith("10")
  ) {
    brief.push(
      "☔ อย่าลืมพกร่ม"
    );
  }

  if (data.icon.startsWith("11")) {
    brief.push(
      "⛈ มีโอกาสเกิดพายุฝนฟ้าคะนอง"
    );
  }

  if (data.aqi !== null) {

    if (data.aqi <= 50) {

      brief.push(
        "😄 AQI ดีมาก เหมาะกับกิจกรรมกลางแจ้ง"
      );

    } else if (data.aqi <= 100) {

      brief.push(
        "🙂 คุณภาพอากาศอยู่ในเกณฑ์ดี"
      );

    } else if (data.aqi <= 150) {

      brief.push(
        "😷 ควรลดกิจกรรมกลางแจ้ง"
      );

    } else {

      brief.push(
        "🚨 คุณภาพอากาศแย่ ควรสวมหน้ากาก"
      );

    }

  }

  if (
    data.pm25 !== null &&
    data.pm25 > 37
  ) {
    brief.push(
      "🌫 PM2.5 เริ่มสูง ควรหลีกเลี่ยงฝุ่น"
    );
  }

  return brief.slice(0, 4);
}