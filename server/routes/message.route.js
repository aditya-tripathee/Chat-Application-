import express from "express"
import { sendMessage } from "../controllers/messageController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const messageRouter = express.Router();

messageRouter.post("/send/:id",isAuthenticated,sendMessage);

export default messageRouter;