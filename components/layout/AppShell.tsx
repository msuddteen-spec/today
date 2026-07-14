"use client";

import SkyBackground from "./SkyBackground";
import Header from "./Header";
import HeroWeather from "./HeroWeather";

import BriefCard from "@/components/cards/BriefCard";
import HourlyForecast from "@/components/cards/HourlyForecast";
import Feed from "@/components/feed/Feed";
import BottomNav from "@/components/navigation/BottomNav";

import useToday from "@/hooks/useToday";
import AIBrief from "../briefing/AIBrief";

export default function AppShell() {
  const today = useToday();

  console.log(today);

  return (
    <>
      <SkyBackground
        icon={today.icon}
        sunrise={today.sunrise}
        sunset={today.sunset}
      />

      <main className="relative z-10 mx-auto min-h-screen max-w-md px-4 pb-32 pt-6">

        <Header />

        <HeroWeather today={today} />

        <HourlyForecast
          lat={today.lat}
          lon={today.lon}
        />

        <AIBrief />

        <Feed />

        <BottomNav />

      </main>
    </>
  );
}