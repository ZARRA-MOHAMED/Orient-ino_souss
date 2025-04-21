import { Router } from "express";
import diagController from "../controllers/diagnosticsController";
import verifyToken from "../middlewares/verifyToken";




const Route = Router();

Route.post('/:diagName', verifyToken, diagController);


export default Route;
