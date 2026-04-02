import express from "express"
import { getMessage, sendMessage } from "../controllers/messageController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const messageRouter = express.Router();

messageRouter.post("/send/:id",isAuthenticated,sendMessage);
messageRouter.get("/:id",getMessage);


export default messageRouter;