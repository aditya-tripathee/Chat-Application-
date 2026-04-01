import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.route.js";


const app = express();
const PORT = process.env.PORT;

// middlewares 
app.use(cors({
    origin:"",
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


// database 
connectDB();


// Router 
app.use("/api/v1/user",userRouter);


// server 
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
   
});
