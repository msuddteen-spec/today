import { Card } from "@/components/ui/card";
import { feed } from "@/services/feed";
import FeedCard from "./FeedCard";

export default function Feed() {

  const sortedFeed = [...feed].sort(
    (a, b) => b.priority - a.priority
  );

  return (
    <Card className="mx-6 mt-6 rounded-3xl border-0 shadow-md">

      <div className="p-6">

        <h2 className="text-xl font-bold">
          🔥 Smart Feed
        </h2>

        <p className="mb-6 text-sm text-slate-500">
          AI จัดเรียงสิ่งสำคัญให้แล้ว
        </p>

        {sortedFeed.map((item) => (
          <FeedCard
            key={item.id}
            item={item}
          />
        ))}

      </div>

    </Card>
  );
}