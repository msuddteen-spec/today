"use client";

import { useEffect, useState } from "react";

import { getWeather } from "@/services/weather";
import { getAirQuality } from "@/services/air";
import { reverseLocation } from "@/services/location";

interface TodayData {
  loading: boolean;

  lat: number | null;
  lon: number | null;

  temp: number | null;
  feelsLike: number | null;
  humidity: number | null;
  wind: number | null;

  description: string;
  icon: string;

  sunrise: number;
  sunset: number;

  // Air Quality
  aqi: number | null;
  pm25: number | null;
  pm10: number | null;
  co: number | null;
  no2: number | null;

  // Location
  subdistrict: string;
  district: string;
  province: string;
}

export default function useToday() {

  const [today, setToday] =
    useState<TodayData>({

      loading: true,

      lat: null,
      lon: null,

      temp: null,
      feelsLike: null,
      humidity: null,
      wind: null,

      description: "",
      icon: "",

      sunrise: 0,
      sunset: 0,

      aqi: null,
      pm25: null,
      pm10: null,
      co: null,
      no2: null,

      subdistrict: "",
      district: "",
      province: "",

    });

  useEffect(() => {

    if (!navigator.geolocation) {

      setToday((prev) => ({
        ...prev,
        loading: false,
      }));

      return;

    }

    navigator.geolocation.getCurrentPosition(

      async ({ coords }) => {

        try {

          const {
            latitude,
            longitude,
          } = coords;

        const results = await Promise.allSettled([

  getWeather(
    latitude,
    longitude
  ),

  getAirQuality(
    latitude,
    longitude
  ),

  reverseLocation(
    latitude,
    longitude
  ),

]);

const weather =
  results[0].status === "fulfilled"
    ? results[0].value
    : null;

const air =
  results[1].status === "fulfilled"
    ? results[1].value
    : null;

            const location =
           results[2].status === "fulfilled"
             ? results[2].value
            : {
               subdistrict: "",
                district: "",
                province: "",
              };

              if (!weather) {
               throw new Error("Weather service unavailable");
              }
                    setToday({

            loading: false,

            lat: latitude,
            lon: longitude,

            temp: weather.temp,
            feelsLike: weather.feelsLike,
            humidity: weather.humidity,
            wind: weather.wind,

            description: weather.description,
            icon: weather.icon,

            sunrise: weather.sunrise,
            sunset: weather.sunset,

            aqi: air?.aqi ?? null,
            pm25: air?.pm25 ?? null,
            pm10: air?.pm10 ?? null,
            co: air?.co ?? null,
            no2: air?.no2 ?? null,

            subdistrict: location.subdistrict,
            district: location.district,
            province: location.province,

          });

        } catch (error) {

          console.error("useToday:", error);

          setToday((prev) => ({
            ...prev,
            loading: false,
          }));

        }

      },

      (error) => {

        console.error("Geolocation:", error);

        setToday((prev) => ({
          ...prev,
          loading: false,
        }));

      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }

    );

  }, []);

  return today;

}