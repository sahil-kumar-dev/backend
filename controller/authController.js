const userModel = require("../model/userSchema");

const signup = async (req, res, next) => {
	const { name, email, password, confirmPassword } = req.body;
	console.log(name, email, password, confirmPassword);

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

module.exports = {
	signup
}