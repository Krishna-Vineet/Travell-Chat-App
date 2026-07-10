import dotenv from "dotenv";
import { connectDB } from "./src/config/database.ts";
import app from "./src/app.ts";
dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log('App running at http://localhost:3000');
    })
})