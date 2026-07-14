import { Card } from "@/components/ui/card";
import { briefData } from "@/services/mockBrief";
import BriefItem from "@/components/briefing/BriefItem";

export default function BriefCard() {
  return (
    <Card className="mx-6 mt-6 rounded-3xl border-0 shadow-md">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              🤖 AI Brief
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              AI สรุปสิ่งที่คุณควรรู้ก่อนออกจากบ้าน
            </p>
          </div>

          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            อ่าน 12 วินาที
          </div>
        </div>

        <div className="my-5 h-px bg-slate-200" />

        <div className="space-y-2">
          {briefData.map((item) => (
            <BriefItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Card>
  );
}