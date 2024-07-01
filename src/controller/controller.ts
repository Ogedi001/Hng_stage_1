import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { getUserLocationInfo, getUserWeather } from "../helpers/weatherInfo";
import { BadRequestError } from "../errors";

export const getClientWeatherGreeting = async (req: Request, res: Response, next: NextFunction) => {
    const { visitor_name } = req.query
    if (!visitor_name)
        throw new BadRequestError(' "Visitor_name" is a required field in the query parameters.');

    const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress;

  // Check if clientIp is an array (it can be in some cases)
  const ip = Array.isArray(clientIp) ? clientIp[0] : clientIp;

  // Log the client's IP address (for demonstration purposes)
  console.log('Client IP Address:', ip);

  if (!ip) {
    throw new BadRequestError('Could not determine client IP address.');
  }
    const locationInfo = await getUserLocationInfo(ip, next)

    const weather = await getUserWeather(locationInfo.latitude, locationInfo.longitude, next)
    const temperature = weather.main.temp;
    const responseJson = {
        client_ip: clientIp,
        location: locationInfo.city,
        greeting: `Hello, ${visitor_name}! The temperature is ${temperature.toFixed(1)} degrees Celsius in ${weather.name}`
    };

    res.status(StatusCodes.OK).json(responseJson)
}
