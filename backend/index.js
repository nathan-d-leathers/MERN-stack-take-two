// driver code for application

import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv" 
import RestaurantsDAO from "./dao/restaurantsDAO.js"

// configure dotenv for use
dotenv.config()
// create variable to access MongoDB connection
const MongoClient = mongodb.MongoClient
// create variable to access server port
const port = process.env.PORT || 8000

// setup MongoDB connection, catch errors, then console log the connection details
MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI, {
        maxPoolSize: 50,
        wtimeoutMS: 5000,
        useNewURLParser: true,
    }
)
.catch((err) => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
// line 29 throwing error
    await RestaurantsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
})

