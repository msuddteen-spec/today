"use client";

import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudRain,
  CloudLightning,
  CloudFog,
  Snowflake,
} from "lucide-react";

interface Props {
  icon?: string;
  size?: number;
  className?: string;
}

export default function WeatherIcon({
  icon = "01d",
  size = 150,
  className = "",
}: Props) {
  switch (icon) {
    // Clear
    case "01d":
      return (
        <Sun
          size={size}
          className={`text-yellow-400 drop-shadow-2xl ${className}`}
        />
      );

    case "01n":
      return (
        <Moon
          size={size}
          className={`text-indigo-300 drop-shadow-2xl ${className}`}
        />
      );

    // Few clouds
    case "02d":
      return (
        <CloudSun
          size={size}
          className={`text-yellow-400 drop-shadow-2xl ${className}`}
        />
      );

    case "02n":
      return (
        <CloudSun
          size={size}
          className={`text-indigo-300 drop-shadow-2xl ${className}`}
        />
      );

    // Clouds
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      return (
        <Cloud
          size={size}
          className={`text-slate-400 drop-shadow-xl ${className}`}
        />
      );

    // Rain
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      return (
        <CloudRain
          size={size}
          className={`text-sky-500 drop-shadow-xl ${className}`}
        />
      );

    // Thunder
    case "11d":
    case "11n":
      return (
        <CloudLightning
          size={size}
          className={`text-yellow-500 drop-shadow-xl ${className}`}
        />
      );

    // Snow
    case "13d":
    case "13n":
      return (
        <Snowflake
          size={size}
          className={`text-cyan-400 drop-shadow-xl ${className}`}
        />
      );

    // Fog
    case "50d":
    case "50n":
      return (
        <CloudFog
          size={size}
          className={`text-slate-400 drop-shadow-xl ${className}`}
        />
      );

    default:
      return (
        <CloudSun
          size={size}
          className={`text-yellow-400 drop-shadow-xl ${className}`}
        />
      );
  }
}