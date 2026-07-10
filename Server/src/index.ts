import dotenv from "dotenv";
dotenv.config();
const result = dotenv.config();

console.log(result);
console.log("API KEY:", process.env.GEMINI_API_KEY);
import {app} from "./app";
const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
