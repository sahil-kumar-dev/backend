const userModel = require("../model/userSchema");
const bcrypt = require('bcrypt')
const emailValidator=require('email-validator')

const signUp = async (req, res, next) => {
	const { name, email, password, confirmPassword } = req.body;

	if (!name || !email || !password || !confirmPassword) {
		return res.status(400).json({
			success: false,
			message: "Every field is required"
		});
	}

	const validEmail = emailValidator.validate(email);
	if (!validEmail) {
		return res.status(400).json({
			success: false,
			message: "Please provide a valid email address 📩"
		});
	}

	try {
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "password and confirm Password does not match ❌"
			});
		}

		const userInfo = new userModel(req.body);

		const result = await userInfo.save();
		return res.status(200).json({
			success: true,
			data: result
		});
	} catch (error) {
		/// send the message of the email is not unique.
		if (error.code === 11000) {
			return res.status(400).json({
				success: false,
				message: `Account already exist with the provided email ${email} 😒`
			});
		}

		return res.status(400).json({
			message: error.message
		});
	}
};

const signIn = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({
			success: false,
			message: "email and password are required"
		});
	}

	try {
		const user = await userModel
			.findOne({
				email
			})
			.select("+password");
		console.log(user);
		if (!user || !(await bcrypt.compare(password,user.password))) {
			// bcrypt.compare returns boolean value
			return res.status(400).json({
				success: false,
				message: "invalid credentials"
			});
		}

		const token = user.jwtToken();
		user.password = undefined;

		const cookieOption = {
			maxAge: 24 * 60 * 60 * 1000, //24hr
			httpOnly: true //  not able to modify  the cookie in client side
		};

		res.cookie("token", token, cookieOption);
		res.status(200).json({
			success: true,
			data: user
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: error.message
		});
	}
};


const getUser = async (req,res) => {
	const userId = req.user.id;

	try{
		const user= await userModel.findById(userId);
		return res.status(200).json({
			success:true,
			data:user
		})
	}catch(e){
		return res.status(400).json({
			success:false,
			message:e.message
		})
	}
}

const logout=(req,res)=>{
	try{
		const cookieOption={
			expires:new Date(),
			httpOnly:true
		}
		req.cookie('token',null,cookieOption)

		return res.status(200).json({
			success:true,
			message:"Logged Out"
		})
	}catch(e){
		return res.status(400).json({
			success:false,
			message:e.message
		})
	}
}

module.exports = {
	signUp,
	signIn,
	getUser,
	logout
}