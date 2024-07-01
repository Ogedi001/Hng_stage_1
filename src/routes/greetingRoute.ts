import { Router } from "express";
import { getClientWeatherGreeting } from "../controller/controller";


const router = Router()
router.route('/').get(getClientWeatherGreeting)

export { router as helloRoute }