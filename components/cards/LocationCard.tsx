import GlassCard from "./GlassCard";

export default function LocationCard(){
  return (
    <GlassCard>
      <p className="text-xs text-slate-500">ตำแหน่งปัจจุบัน</p>
      <h3 className="mt-2 text-2xl font-bold">กำลังค้นหา...</h3>
    </GlassCard>
  );
}
