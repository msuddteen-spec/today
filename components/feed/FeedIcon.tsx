import {
  CloudRain,
  Car,
  CircleDollarSign,
  TriangleAlert,
  Gift,
} from "lucide-react";

export default function FeedIcon({
  type,
}: {
  type: string;
}) {
  switch (type) {
    case "weather":
      return <CloudRain className="h-5 w-5 text-blue-500" />;

    case "traffic":
      return <Car className="h-5 w-5 text-orange-500" />;

    case "fuel":
      return (
        <CircleDollarSign className="h-5 w-5 text-green-500" />
      );

    case "warning":
      return (
        <TriangleAlert className="h-5 w-5 text-red-500" />
      );

    case "promotion":
      return <Gift className="h-5 w-5 text-pink-500" />;

    default:
      return null;
  }
}