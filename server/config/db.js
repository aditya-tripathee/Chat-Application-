import mongoose from "mongoose";

// export const connectDB = async()=>{
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("Database connected successfully!")
//     } catch (error) {
//         console.error(`Database connection error `,error);
//     }
// };

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected successfully!");
    })
    .catch((err) => {
      console.log(`Database connection error`, err);
    });
};
