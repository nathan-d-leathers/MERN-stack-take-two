install node in backend
npm init -y (creates package.json file)
npm install express mongodb cord dotenv

cors (cross origin resource sharing): allows ajax requests to skip same origin policy and access resources from remote hosts

dotenv loads enviromental variables from a hidden dotenv file (for securing api keys)

install globally nodemon (watches for changes in file and upodates site in real time)

package json: add "type": "module",

backend: touch server.js (this is where we will configure the express server and cors middleware)

express has body parser for json built in
a route of "\*" means any path not specificed

route prefix
/api/v1/restaurants

errror:
Cannot find module '/Users/nathanleathers/Desktop/MERN stack take two/backend/api/restaurants/route.js' imported from /Users/nathanleathers/Desktop/MERN stack take two/backend/server.js

<!-- fixed: solution was changing depreciated wtimeout -->

Runs but only on port 8000

DAO: Data Access Object

MongoServerSelectionError: connection <monitor> to 23.21.65.129:27017 closed
at Timeout.\_onTimeout (/Users/nathanleathers/Desktop/MERN stack take two/backend/node_modules/mongodb/lib/sdam/topology.js:277:38)
at listOnTimeout (node:internal/timers:573:17)
at process.processTimers (node:internal/timers:514:7)
