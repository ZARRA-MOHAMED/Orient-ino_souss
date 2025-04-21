import { Router } from "express";
import creerController from "../controllers/careerController";
import verifyToken from "../middlewares/verifyToken";




const Route = Router();


Route.get('/career/getCareer',verifyToken, creerController);

export default Route;