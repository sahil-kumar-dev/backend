require('dotenv').config()
const databaseConnect = require('./config/databaseConfig')
const mongoose=require('mongoose')

const PORT = process.env.PORT || 3300

const app = require('./app')

databaseConnect()

app.listen(PORT, () => {
	console.log("Server is listening on PORT " + PORT)
})