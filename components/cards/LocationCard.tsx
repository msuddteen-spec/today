import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function LocationCard() {
  return (
    <Card className="mx-6 mt-6 rounded-3xl border-0 shadow-md">
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100">
            <MapPin className="text-green-600" size={20} />
          </div>

          <div>
            <p className="text-xs text-slate-500">
              ตำแหน่งปัจจุบัน
            </p>

            <h3 className="font-semibold">
              ลาดกระบัง
            </h3>
          </div>
        </div>
      </div>
    </Card>
  );
}