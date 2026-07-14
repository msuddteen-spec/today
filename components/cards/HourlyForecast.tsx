"use client";

import GlassCard from "@/components/ui/GlassCard";
import WeatherIcon from "@/components/weather/WeatherIcon";
import useForecast from "@/hooks/useForecast";

interface Props {
  lat: number | null;
  lon: number | null;
}

export default function HourlyForecast({
  lat,
  lon,
}: Props) {
  const forecast = useForecast(
    lat ?? undefined,
    lon ?? undefined
  );

  return (
    <GlassCard className="mt-6 p-5">

      <h3 className="mb-4 text-lg font-semibold text-white">
        📅 พยากรณ์รายชั่วโมง
      </h3>

      {forecast.length === 0 ? (

        <div className="py-8 text-center text-white/60">
          กำลังโหลดข้อมูล...
        </div>

      ) : (

        <div className="scroll-x flex gap-4 pb-2">

          {forecast.map((hour, index) => (

            <div
              key={index}
              className="
                min-w-[88px]
                snap-start
                rounded-2xl
                border
                border-white/10
                bg-white/10
                p-3
                text-center
                backdrop-blur-xl
                transition-all
                duration-300
                hover:bg-white/15
              "
            >

              {index === 0 ? (

                <span
                  className="
                    inline-block
                    rounded-full
                    bg-cyan-500/20
                    px-2
                    py-0.5
                    text-[11px]
                    font-semibold
                    text-cyan-300
                  "
                >
                  Now
                </span>

              ) : (

                <p className="text-xs font-medium text-white/70">
                  {hour.time}
                </p>

              )}

              <div className="my-3 flex justify-center">

                <WeatherIcon
                  icon={hour.icon}
                  size={36}
                />

              </div>

              <p className="text-xl font-bold text-white">
                {hour.temp}°
              </p>

            </div>

          ))}

        </div>

      )}

    </GlassCard>
  );
}