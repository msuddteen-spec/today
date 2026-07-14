export interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  pressure: number;

  description: string;
  icon: string;

  sunrise: number;
  sunset: number;

  // Air Quality
  aqi: number;
  pm25: number;
  pm10: number;
  co: number;
  no2: number;
}