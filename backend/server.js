// file used for setting up the application settings to run on a server 

// import modules to be used in file
import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"

// name of app
const app = express()

// middleware app uses
app.use(cors())
app.use(express.json())
 
// app routes
app.use("/api/v1/restaurants", restaurants)
app.use("*", (req,res) => res.status(404).json({error: "Not found"}))

// export the app as a module to be used in other files
export default app 