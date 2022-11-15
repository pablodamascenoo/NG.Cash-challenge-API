import { Router } from "express";
import accountController from "../controllers/accountController.js";
import verifyToken from "../middlewares/tokenValidator.js";

const accountRouter = Router();

accountRouter.get("/balance", verifyToken, accountController.getBalance);

export default accountRouter;
