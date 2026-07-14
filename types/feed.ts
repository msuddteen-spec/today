export type FeedType =
  | "weather"
  | "traffic"
  | "fuel"
  | "warning"
  | "promotion";

export interface FeedItem {
  id: number;
  type: FeedType;
  title: string;
  subtitle: string;
  priority: number;
}