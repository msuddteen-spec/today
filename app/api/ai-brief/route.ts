import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

interface AIBriefRequest {
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

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AIBriefRequest;

    const {
      location,
      weather,
      air,
      forecast,
      datetime,
    } = body;

    const forecastText =
      forecast.length === 0
        ? "ไม่มีข้อมูลพยากรณ์"
        : forecast
            .map(
              (f) =>
                `${f.time} ${f.temp}°C ${f.description}`
            )
            .join("\n");

    const prompt = `
คุณคือ TODAY AI

TODAY AI คือผู้ช่วยอัจฉริยะของแอป "วันนี้"

เป้าหมายของคุณคือ

ช่วยให้ผู้ใช้ออกจากบ้านได้อย่างมั่นใจ

คุณไม่ได้เป็นนักพยากรณ์อากาศ

แต่เป็น AI ที่ช่วยตัดสินใจ

==========================

กฎการตอบ

- ตอบเป็นภาษาไทย
- สุภาพ เป็นธรรมชาติ
- กระชับ อ่านจบภายใน 20-30 วินาที
- ไม่เกิน 180 คำ
- ห้ามใช้ Markdown
- ห้ามแต่งข้อมูล
- ถ้าข้อมูลไม่พอ ให้ข้าม
- ห้ามเดา
- ห้ามใส่ Emoji
- ส่งกลับเป็นข้อความธรรมดาเท่านั้น

==========================

ลำดับการคิด

1 วิเคราะห์ภาพรวมของวันนี้

2 วิเคราะห์สภาพอากาศ

3 วิเคราะห์คุณภาพอากาศ

4 วิเคราะห์ความเสี่ยง

5 สรุปสิ่งที่ผู้ใช้ควรรู้

6 ให้คำแนะนำที่นำไปใช้ได้ทันที

==========================

วันเวลา

${datetime}

==========================

พื้นที่

ตำบล ${location.subdistrict || "-"}

อำเภอ ${location.district || "-"}

จังหวัด ${location.province || "-"}

==========================

สภาพอากาศ

อุณหภูมิ ${weather.temp}°C

รู้สึกเหมือน ${weather.feelsLike}°C

ความชื้น ${weather.humidity}%

ความเร็วลม ${weather.wind} m/s

สภาพอากาศ ${weather.description}

==========================

คุณภาพอากาศ

AQI ${air.aqi}

PM2.5 ${air.pm25}

PM10 ${air.pm10}

==========================

พยากรณ์

${forecastText}

==========================

รูปแบบคำตอบ

เริ่มต้นด้วยสรุปภาพรวมของวันนี้ 1 ประโยค

หากมีความเสี่ยงให้เตือนก่อนเสมอ

หากอากาศดีให้แนะนำกิจกรรม

หากอากาศร้อนให้แนะนำการดูแลตัวเอง

หาก AQI สูงให้แนะนำการป้องกัน

หากมีฝนให้แนะนำการเดินทาง

ปิดท้ายด้วยคำแนะนำสำหรับการออกจากบ้าน 1 ประโยค

ตอบเหมือนผู้ช่วยส่วนตัวที่ดูแลผู้ใช้ทุกเช้า
`;

    const completion =
      await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        temperature: 0.4,

        top_p: 0.9,

        max_tokens: 280,

        messages: [
          {
            role: "system",
            content: `
คุณคือ TODAY AI

AI ประจำแอป "วันนี้"

หน้าที่ของคุณคือ

- วิเคราะห์ข้อมูลจากโลกจริง
- เชื่อมโยงข้อมูลที่ได้รับ
- สรุปเฉพาะสิ่งที่สำคัญ
- ช่วยให้ผู้ใช้ตัดสินใจได้ดีขึ้น
- ตอบแบบผู้ช่วยส่วนตัว
- ตอบสั้น กระชับ เข้าใจง่าย
- ห้ามแต่งข้อมูล
- ห้ามเดา
- หากไม่มีข้อมูล ให้ตอบเฉพาะสิ่งที่ทราบ
`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const ai =
      completion.choices[0]?.message?.content?.trim() ??
      "ขออภัย ไม่สามารถวิเคราะห์ข้อมูลได้ในขณะนี้";

    return NextResponse.json(
      {
        success: true,
        brief: ai,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("TODAY AI Error:", error);

    return NextResponse.json(
      {
        success: false,
        brief:
          "ขออภัย ขณะนี้ TODAY AI ไม่สามารถวิเคราะห์ข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
      },
      {
        status: 500,
      }
    );
  }
}