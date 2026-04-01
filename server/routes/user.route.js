import express from "express"
import { getOtherUsers, login, logout, register } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const userRouter = express.Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.get("/logout",logout);
userRouter.get("/",isAuthenticated,getOtherUsers);


export default userRouter;
