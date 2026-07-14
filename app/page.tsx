import Header from "@/components/layout/Header";
import LocationCard from "@/components/cards/LocationCard";
import BriefCard from "@/components/cards/BriefCard";
import Feed from "@/components/feed/Feed";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-md pb-20">
      <Header />
      <LocationCard />
      <BriefCard />
      <Feed />
    </main>
  );
}