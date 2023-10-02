const mongoose=require('mongoose')

const MONGODB_URL=process.env.MONGO_URL

const databaseConnect=()=>{
	mongoose.connect(MONGODB_URL)
	.then((conn)=>{
		console.log("Connected to db: "+ conn.connection.host);
	})
	.catch(err=>{
		console.log("Error: "+err.message);
	})
}

module.exports=databaseConnect