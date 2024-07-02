
import "dotenv/config";
import { NextFunction } from "express";

import axios from "axios";

export const getUserLocationInfo = async (next:NextFunction,clientIp?:any,) => {
  const API_KEY = process.env.LOCATION_API_KEY;
  const fields = "geo";
  const ipResponse = clientIp?`https://ipinfo.io/${clientIp}/json?token=8c85fa67ac2fa1`:`https://ipinfo.io?token=8c85fa67ac2fa1`
  const URL =clientIp?`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&fields=${fields}&ip=${clientIp}`:`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&fields=${fields}`;
try {
  const response = await axios.get(ipResponse);
  return response.data;
} catch (error) {
  next(error)
} 
};

export const getUserWeather = async (lat:number,lon:number, next: NextFunction) => {
    const API_KEY = process.env.WEATHER_API_KEY;
    
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  
    try {
      const response = await axios.get(currentWeatherURL);
      return response.data;
    } catch (error) {
      next(error);
    }
  };