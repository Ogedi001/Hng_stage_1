import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { getUserLocationInfo, getUserWeather } from "../helpers/weatherInfo";
import { BadRequestError } from "../errors";

export const getClientWeatherGreeting = async (req: Request, res: Response, next: NextFunction) => {
    const { visitor_name } = req.query
    if (!visitor_name)
        throw new BadRequestError(' "Visitor_name" is a required field in the query parameters.');

    const xForwardedFor = req.headers['x-forwarded-for'];
  let clientIp = req.connection.remoteAddress; 

  if (typeof xForwardedFor === 'string') {
    clientIp = xForwardedFor.split(',')[0].trim();
  } else if (Array.isArray(xForwardedFor)) {
    clientIp = xForwardedFor[0].trim();
  }

    let locationInfo = await getUserLocationInfo(next)
    if (process.env.ENVIRONMENT==='production'){
      if (!clientIp) throw new BadRequestError('Could not determine client IP address.');
      locationInfo = await getUserLocationInfo(next, clientIp)
    }

    const weather = await getUserWeather(locationInfo.latitude, locationInfo.longitude, next)
    const temperature = weather.main.temp;
    const responseJson = {
        client_ip: clientIp,
        ip: locationInfo.ip,
        location: locationInfo.city,
        greeting: `Hello, ${visitor_name}! The temperature is ${temperature.toFixed(1)} degrees Celsius in ${weather.name}`
    };

    res.status(StatusCodes.OK).json(responseJson)
}
