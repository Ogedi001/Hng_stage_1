import { Request,Response,NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { getUserLocationInfo, getUserWeather } from "../helpers/weatherInfo";
import { BadRequestError } from "../errors";

export const getClientWeatherGreeting = async(req:Request, res:Response,next:NextFunction) =>{
const {visitor_name}= req.query
if (!visitor_name)
    throw new BadRequestError(' "Visitor_name" is a required field in the query parameters.');
const locationInfo = await getUserLocationInfo(next)
const weather = await getUserWeather(locationInfo.latitude,locationInfo.longitude,next)
const temperature = weather.main.temp;
const responseJson = {
    client_ip: locationInfo.ip,
    location: weather.name,
    greeting: `Hello, ${visitor_name}! The temperature is ${temperature.toFixed(1)} degrees Celsius in ${weather.name}`
  };

res.status(StatusCodes.OK).json(responseJson)
}
