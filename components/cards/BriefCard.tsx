import GlassCard from "./GlassCard";

export default function BriefCard(){
  return (
    <GlassCard>
      <h2 className="text-xl font-bold">🤖 AI Brief</h2>
      <ul className="mt-4 space-y-3 text-sm">
        <li>🌧️ ฝนอาจตกใน 30 นาที</li>
        <li>🚗 รถติดกว่าปกติ 18 นาที</li>
        <li>⛽ ราคาน้ำมันอัปเดตแล้ว</li>
      </ul>
    </GlassCard>
  );
}
