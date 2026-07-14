import FeedIcon from "./FeedIcon";
import { FeedItem } from "@/types/feed";

interface FeedCardProps {
  item: FeedItem;
}

export default function FeedCard({ item }: FeedCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-2xl p-4 transition-all hover:bg-slate-50 hover:shadow-md">
      <FeedIcon type={item.type} />

      <div>
        <h3 className="font-semibold">{item.title}</h3>

        <p className="text-sm text-slate-500">
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}