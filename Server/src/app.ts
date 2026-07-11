import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes"
export const app=express();
app.use(
  cors({
    origin: [
      "http://localhost:7000",
      "https://smart-crm-importer-six.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.get("/",(req,res)=>{
    res.json({
        status:1,
        success:true,
        message:"Smart CRM Importer API is running"
    })
})
app.use("/api",uploadRoutes)