export type BriefType =
  | "weather"
  | "traffic"
  | "fuel"
  | "warning"
  | "food";

export interface BriefItem {
  id: number;
  type: BriefType;
  title: string;
  description: string;
}