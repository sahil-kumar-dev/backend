const mongoose = require('mongoose')

const databaseConnect = async () => {
	await mongoose.connect("mongodb://127.0.0.1:27017/dummydb")
		.then((conn) => {
			console.log("Connected to db: " + conn.connection.host);
		})
		.catch(err => {
			console.log("Error cann't connect" + err.message);
		})
}


module.exports = databaseConnect