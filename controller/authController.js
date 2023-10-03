const userModel = require("../model/userSchema");
const axios = require('axios')

const signup = async (req, res, next) => {
	const { name, email, password, confirmPassword } = req.body;
	console.log(name,email,password,confirmPassword);
	try {
		const userInfo = new userModel(req.body)

		const result = await userInfo.save()

		return res.status(200).json({
			success: true,
			data: result
		})
	}
	catch (err) {
		if (err.code === 11000) {
			return res.status(400).json({
				success: false,
				message: "Account already exists"
			})
		}
		return res.status(400).json({
			success: false,
			message: err.message
		})
	}
}

const userData = {
	name: "Rahul kumar",
	email: "rahulmehta@gmail.com",
	password: "rahul1234",
	confirmPassword: "rahul1234"
}

axios.post('http://localhost:8080/api/auth/signup', userData)
	.then(response => {
		console.log(response.data);
	})
	.catch(error => {
		console.error(error);
	});

module.exports = {
	signup
}