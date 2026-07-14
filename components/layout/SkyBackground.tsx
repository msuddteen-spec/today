"use client";

import { useEffect, useState } from "react";

interface Props {
  icon?: string;
  sunrise?: number;
  sunset?: number;
}

export default function SkyBackground({
  icon = "01d",
  sunrise,
  sunset,
}: Props) {
  const [now, setNow] = useState(() =>
    Math.floor(Date.now() / 1000)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 60000); // อัปเดตทุก 1 นาที

    return () => clearInterval(timer);
  }, []);

  let theme = "theme-day";

  // 🌙 Night
  if (sunrise && sunset && (now < sunrise || now > sunset)) {
    theme = "theme-night";
  }

  // 🌅 Morning (2 ชั่วโมงหลังพระอาทิตย์ขึ้น)
  else if (sunrise && now < sunrise + 7200) {
    theme = "theme-morning";
  }

  // 🌇 Sunset (2 ชั่วโมงก่อนพระอาทิตย์ตก)
  else if (sunset && now > sunset - 7200) {
    theme = "theme-sunset";
  }

  // 🌧 Rain
  if (icon.startsWith("09") || icon.startsWith("10")) {
    theme = "theme-rain";
  }

  // ⛈ Storm
  if (icon.startsWith("11")) {
    theme = "theme-storm";
  }

  // ❄ Snow
  if (icon.startsWith("13")) {
    theme = "theme-snow";
  }

  // 🌫 Fog
  if (icon.startsWith("50")) {
    theme = "theme-fog";
  }

  const isNight =
    !!sunrise &&
    !!sunset &&
    (now < sunrise || now > sunset);

  return (
    <>
      {/* Background */}
      <div
        className={theme}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -30,
          transition: "all 1.2s ease",
        }}
      />

      {/* Sun / Moon Glow */}
      <div
        className={isNight ? "moon-glow" : "sunrise-glow"}
        style={{
          position: "fixed",
          top: -100,
          right: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: isNight
            ? "rgba(180,210,255,.18)"
            : "rgba(255,255,210,.35)",
          filter: "blur(80px)",
          zIndex: -29,
        }}
      />

      {/* Bottom Glow */}
      <div
        style={{
          position: "fixed",
          left: -150,
          bottom: -150,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: isNight
            ? "rgba(40,80,180,.15)"
            : "rgba(255,255,255,.18)",
          filter: "blur(120px)",
          zIndex: -29,
        }}
      />

      {/* Stars */}
      {isNight && (
        <>
          <div className="star" />
          <div className="star" />
          <div className="star" />
          <div className="star" />
          <div className="star" />
          <div className="shooting-star" />
        </>
      )}
    </>
  );
}