"use client";

import {
  Thermometer,
  Droplets,
  Wind,
  Trees,
} from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";
import WeatherIcon from "@/components/Weather/WeatherIcon";
import RainLayer from "@/components/Weather/RainLayer";

interface HeroWeatherProps {
  today: {
    loading: boolean;

    temp: number | null;
    feelsLike: number | null;
    humidity: number | null;
    wind: number | null;

    description: string;
    icon: string;

    aqi: number | null;
    pm25: number | null;
    pm10: number | null;
    co: number | null;
    no2: number | null;

    subdistrict: string;
    district: string;
    province: string;
  };
}

export default function HeroWeather({
  today,
}: HeroWeatherProps) {

  const {
    loading,

    temp,
    feelsLike,
    humidity,
    wind,

    description,
    icon,

    aqi,
    pm25,
    pm10,

    subdistrict,
    district,
    province,

  } = today;

  const air = (() => {

    switch (aqi) {

      case 1:
        return {
          text: "ดีมาก",
          color: "text-green-600",
          bg: "bg-green-100",
        };

      case 2:
        return {
          text: "ดี",
          color: "text-lime-600",
          bg: "bg-lime-100",
        };

      case 3:
        return {
          text: "ปานกลาง",
          color: "text-yellow-600",
          bg: "bg-yellow-100",
        };

      case 4:
        return {
          text: "เริ่มมีผล",
          color: "text-orange-600",
          bg: "bg-orange-100",
        };

      case 5:
        return {
          text: "อันตราย",
          color: "text-red-600",
          bg: "bg-red-100",
        };

      default:
        return {
          text: "--",
          color: "text-slate-500",
          bg: "bg-slate-100",
        };

    }

  })();
const hour = new Date().getHours();

let greeting = "Good Morning ☀️";

if (hour >= 12 && hour < 17) {
  greeting = "Good Afternoon 🌤️";
} else if (hour >= 17 && hour < 20) {
  greeting = "Good Evening 🌇";
} else if (hour >= 20 || hour < 5) {
  greeting = "Good Night 🌙";
}
  return (

    <GlassCard className="hero-float relative mt-6 min-h-[520px] overflow-hidden p-8">

      {/* Background Glow */}

      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />

      <div className="relative z-10 flex items-center justify-between">

        {/* LEFT */}

        <div className="max-w-[180px]">

          <p className="text-sm font-medium text-white/70">
  {greeting}
</p>

          <h2 className="fade-up mt-3 text-[72px] font-black leading-none tracking-tight">
            {loading ? "--" : `${temp}°`}
          </h2>

          <p className="mt-4 text-lg font-medium text-slate-700">
            {description}
          </p>

          <div className="mt-3 flex items-start gap-2 text-sm text-slate-500">

            <span className="mt-0.5">📍</span>

            <div className="leading-5">

              {subdistrict && (
                <p>
                  {subdistrict
                    .replace(/^ตำบล/, "ต.")
                    .replace(/^แขวง/, "แขวง")}
                </p>
              )}

              {district && (
                <p>
                  {district
                    .replace(/^อำเภอ/, "อ.")
                    .replace(/^เขต/, "เขต")}
                </p>
              )}

              {province && (
                <p>
                  {province
                    .replace(/^จังหวัด/, "จ.")
                    .replace(/^กรุงเทพมหานคร$/, "กทม.")}
                </p>
              )}

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative flex items-center justify-center">

          {(icon.startsWith("01") || icon.startsWith("02")) && (
            <div
              className="
                sun-glow
                absolute
                h-52
                w-52
                rounded-full
                bg-yellow-300/20
                blur-3xl
              "
            />
          )}

          <WeatherIcon
            icon={icon}
            size={180}
            className="cloud-float relative z-10 opacity-95 drop-shadow-2xl"
          />

          {(icon.startsWith("09") ||
            icon.startsWith("10")) && (
            <RainLayer />
          )}

          {icon.startsWith("11") && (
            <div
              className="
                lightning
                absolute
                inset-0
                rounded-full
                bg-white
                opacity-0
              "
            />
          )}

        </div>

      </div>

      {/* ===== Weather Cards ===== */}

      <div className="fade-up mt-8 grid grid-cols-2 gap-4">
              <GlassCard className="p-4 text-center">

          <Thermometer
            className="mx-auto mb-2 text-red-500"
            size={20}
          />

          <p className="text-xs text-slate-500">
            Feels Like
          </p>

          <p className="mt-2 text-2xl font-bold">
            {loading ? "--" : `${feelsLike}°`}
          </p>

        </GlassCard>

        <GlassCard className="p-4 text-center">

          <Droplets
            className="mx-auto mb-2 text-blue-500"
            size={20}
          />

          <p className="text-xs text-slate-500">
            Humidity
          </p>

          <p className="mt-2 text-2xl font-bold">
            {loading ? "--" : `${humidity}%`}
          </p>

        </GlassCard>

        <GlassCard className="p-4 text-center">

          <Wind
            className="mx-auto mb-2 text-cyan-500"
            size={20}
          />

          <p className="text-xs text-slate-500">
            Wind
          </p>

          <p className="mt-2 text-2xl font-bold">
            {loading ? "--" : `${wind} m/s`}
          </p>

        </GlassCard>

        <GlassCard className="p-4 text-center">

          <Trees
            className={`mx-auto mb-2 ${air.color}`}
            size={20}
          />

          <p className="text-xs text-slate-500">
            AQI
          </p>

          <p className={`mt-2 text-2xl font-bold ${air.color}`}>
            {loading ? "--" : aqi}
          </p>

          <span
            className={`
              mt-2
              inline-block
              rounded-full
              px-2
              py-1
              text-xs
              font-semibold
              ${air.bg}
              ${air.color}
            `}
          >
            {air.text}
          </span>

        </GlassCard>

      </div>

      {/* ===== Air Quality Detail ===== */}

      <div className="mt-5 grid grid-cols-2 gap-3">

        <GlassCard className="p-3 text-center">

          <p className="text-xs text-slate-500">
            PM2.5
          </p>

          <p className="mt-2 text-xl font-bold">
            {loading ? "--" : pm25}
          </p>

        </GlassCard>

        <GlassCard className="p-3 text-center">

          <p className="text-xs text-slate-500">
            PM10
          </p>

          <p className="mt-2 text-xl font-bold">
            {loading ? "--" : pm10}
          </p>

        </GlassCard>

      </div>

    </GlassCard>

  );

}