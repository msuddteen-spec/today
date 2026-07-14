"use client";

import {
  createContext,
  useContext,
  useMemo,
  ReactNode,
} from "react";

export type ThemeType =
  | "morning"
  | "day"
  | "sunset"
  | "night"
  | "rain"
  | "storm"
  | "snow"
  | "fog";

interface ThemeContextType {
  theme: ThemeType;
  isNight: boolean;
}

const ThemeContext =
  createContext<ThemeContextType>({
    theme: "day",
    isNight: false,
  });

interface Props {
  children: ReactNode;

  icon?: string;

  sunrise?: number;

  sunset?: number;
}

export function ThemeProvider({
  children,
  icon = "01d",
  sunrise,
  sunset,
}: Props) {

  const now = Math.floor(Date.now() / 1000);

  const value = useMemo(() => {

    let theme: ThemeType = "day";

    // Night
    if (
      sunrise &&
      sunset &&
      (now < sunrise || now > sunset)
    ) {
      theme = "night";
    }

    // Morning
    else if (
      sunrise &&
      now < sunrise + 7200
    ) {
      theme = "morning";
    }

    // Sunset
    else if (
      sunset &&
      now > sunset - 7200
    ) {
      theme = "sunset";
    }

    // Rain
    if (
      icon.startsWith("09") ||
      icon.startsWith("10")
    ) {
      theme = "rain";
    }

    // Storm
    if (icon.startsWith("11")) {
      theme = "storm";
    }

    // Snow
    if (icon.startsWith("13")) {
      theme = "snow";
    }

    // Fog
    if (icon.startsWith("50")) {
      theme = "fog";
    }

    return {

      theme,

      isNight:
        theme === "night" ||
        theme === "storm",

    };

  }, [
    icon,
    sunrise,
    sunset,
    now,
  ]);

  return (

    <ThemeContext.Provider value={value}>

      {children}

    </ThemeContext.Provider>

  );

}

export function useTheme() {

  return useContext(
    ThemeContext
  );

}