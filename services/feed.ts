import { FeedItem } from "@/types/feed";

export const feed: FeedItem[] = [
  {
    id: 1,
    type: "weather",
    title: "ฝนจะตกในอีก 35 นาที",
    subtitle: "พกร่มก่อนออกจากบ้าน",
    priority: 100,
  },
  {
    id: 2,
    type: "traffic",
    title: "มอเตอร์เวย์เริ่มหนาแน่น",
    subtitle: "ใช้เวลาเพิ่มประมาณ 18 นาที",
    priority: 90,
  },
  {
    id: 3,
    type: "fuel",
    title: "PT บางนา ราคาถูกกว่า",
    subtitle: "ประหยัดประมาณ 0.70 บาท/ลิตร",
    priority: 70,
  },
  {
    id: 4,
    type: "promotion",
    title: "Amazon ลด 20%",
    subtitle: "เฉพาะสาขาใกล้คุณ",
    priority: 60,
  },
];