import express from "express";
import "dotenv/config";
import emailRoutes from "./routes/emailRoutes";
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())
 

console.log("Current folder:", process.cwd());
console.log("Key exists:", Boolean(process.env.GROQ_API_KEY));



app.get("/", (req,res) => {
    res.json("Welcome to the Smart Email Generator API")
})

app.use("/api/emails", emailRoutes)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})