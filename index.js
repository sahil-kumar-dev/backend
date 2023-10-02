require('dotenv').config()

const PORT=process.env.PORT || 3300

const app=require('./app')

app.listen(PORT,()=>{
	console.log("Server is listening on PORT " + PORT)
})