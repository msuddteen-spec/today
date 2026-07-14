"use client";

import { useEffect, useState } from "react";

import GlassCard from "@/components/ui/GlassCard";
import useToday from "@/hooks/useToday";
import { getAIBrief } from "@/services/ai";

import {
  buildCacheKey,
  getCachedBrief,
  saveCachedBrief,
  clearCachedBrief,
} from "@/lib/aiCache";

export default function AIBrief() {
  const today = useToday();

  const [brief, setBrief] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (today.loading) return;

    async function generate() {
      setLoading(true);

      try {
        const cacheKey = buildCacheKey({
          temp: today.temp ?? 0,
          feelsLike: today.feelsLike ?? 0,
          humidity: today.humidity ?? 0,
          aqi: today.aqi ?? 0,
          pm25: today.pm25 ?? 0,
          icon: today.icon,
          district: today.district,
          province: today.province,
        });

        // ใช้ Cache ก่อน
        const cache = getCachedBrief(cacheKey);

        if (cache) {
          setBrief(cache);
          return;
        }

        const requestData = {
          location: {
            subdistrict: today.subdistrict,
            district: today.district,
            province: today.province,
          },

          weather: {
            temp: today.temp ?? 0,
            feelsLike: today.feelsLike ?? 0,
            humidity: today.humidity ?? 0,
            wind: today.wind ?? 0,
            description: today.description,
            icon: today.icon,
          },

          air: {
            aqi: today.aqi ?? 0,
            pm25: today.pm25 ?? 0,
            pm10: today.pm10 ?? 0,
          },

          forecast: [],

          datetime: new Date().toLocaleString("th-TH"),
        };

        const result = await getAIBrief(requestData);

        saveCachedBrief(cacheKey, result);

        setBrief(result);
      } finally {
        setLoading(false);
      }
    }

    generate();
  }, [
    today.loading,
    today.temp,
    today.feelsLike,
    today.humidity,
    today.aqi,
    today.pm25,
    today.icon,
    today.district,
    today.province,
  ]);

  async function refreshAI() {
    setLoading(true);

    try {
      clearCachedBrief();

      const cacheKey = buildCacheKey({
        temp: today.temp ?? 0,
        feelsLike: today.feelsLike ?? 0,
        humidity: today.humidity ?? 0,
        aqi: today.aqi ?? 0,
        pm25: today.pm25 ?? 0,
        icon: today.icon,
        district: today.district,
        province: today.province,
      });

      const requestData = {
        location: {
          subdistrict: today.subdistrict,
          district: today.district,
          province: today.province,
        },

        weather: {
          temp: today.temp ?? 0,
          feelsLike: today.feelsLike ?? 0,
          humidity: today.humidity ?? 0,
          wind: today.wind ?? 0,
          description: today.description,
          icon: today.icon,
        },

        air: {
          aqi: today.aqi ?? 0,
          pm25: today.pm25 ?? 0,
          pm10: today.pm10 ?? 0,
        },

        forecast: [],

        datetime: new Date().toLocaleString("th-TH"),
      };

      const result = await getAIBrief(requestData);

      saveCachedBrief(cacheKey, result);

      setBrief(result);
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlassCard className="mt-6 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">
          🤖 AI Brief
        </h3>

        <button
          onClick={refreshAI}
          className="
            rounded-full
            bg-white/10
            px-3
            py-1
            text-xs
            text-white/70
            transition
            hover:bg-white/20
          "
        >
          รีเฟรช
        </button>
      </div>

      {loading ? (
        <div className="rounded-2xl bg-white/5 p-5">
          <p className="animate-pulse leading-7 text-white/80">
            🤖 AI กำลังวิเคราะห์ข้อมูล...
          </p>
        </div>
      ) : (
        <div
          className="
            rounded-2xl
            bg-white/5
            p-5
            leading-8
            text-white/90
            whitespace-pre-line
          "
        >
          {brief}
        </div>
      )}
    </GlassCard>
  );
}