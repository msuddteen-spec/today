import {
  CloudRain,
  Car,
  CircleDollarSign,
  TriangleAlert,
} from "lucide-react";

import { BriefItem as Item } from "@/types/brief";

export default function BriefItem({
  item,
}: {
  item: Item;
}) {
  const icon = {
    weather: <CloudRain className="h-5 w-5 text-blue-500" />,
    traffic: <Car className="h-5 w-5 text-orange-500" />,
    fuel: <CircleDollarSign className="h-5 w-5 text-green-500" />,
    warning: <TriangleAlert className="h-5 w-5 text-red-500" />,
    food: <span className="text-xl">🍗</span>,
  };

  return (
    <div className="flex items-start gap-4 rounded-2xl p-3 transition hover:bg-slate-50">
      <div className="mt-1">
        {icon[item.type]}
      </div>

      <div>
        <h4 className="font-semibold">
          {item.title}
        </h4>

        <p className="text-sm text-slate-500">
          {item.description}
        </p>
      </div>
    </div>
  );
}