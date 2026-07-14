import { BriefItem } from "@/types/brief";

export const briefData: BriefItem[] = [
  {
    id: 1,
    type: "weather",
    title: "ฝนจะตกในอีก 35 นาที",
    description: "พกร่มก่อนออกจากบ้าน",
  },
  {
    id: 2,
    type: "traffic",
    title: "มอเตอร์เวย์เริ่มหนาแน่น",
    description: "เพิ่มเวลาเดินทางประมาณ 18 นาที",
  },
  {
    id: 3,
    type: "fuel",
    title: "PT บางนา ถูกกว่า",
    description: "ราคาน้ำมันต่ำกว่าพื้นที่ใกล้เคียง 0.70 บาท",
  },
  {
    id: 4,
    type: "warning",
    title: "ระวังมิจฉาชีพ",
    description: "มีการแจ้งเบอร์โทรหลอกลวงในพื้นที่",
  },
];