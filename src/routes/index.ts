import { Router } from "express";
import { helloRoute } from "./greetingRoute";


const router = Router()
router.use('/hello',helloRoute)
export { router as ApplicationRoute }