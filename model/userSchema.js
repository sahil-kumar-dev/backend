const mongoose = require('mongoose')
const bcrypt=require('bcrypt')

const { Schema } = mongoose;

const JWT = require('jsonwebtoken')

const userSchema = new Schema({
	name: {
		type: String,
		require: [true, "User name is required."],
		minLength: [5, "Name mush be at least 5 characters."],
		maxLength: [50, "Name must be leass than 50 characters."]
	},
	email: {
		type: String,
		required: [true, "User email is required."],
		unique: [true, "Already resistred."],
		lowercase: true,
	},
	password: {
		type: String,
		select:false
	},
	forgotPasswordToekn: {
		type: String,
	},
	forgotPasswordExpiryDate: {
		type: Date,
	}
}, {
	timestamps: true
})

userSchema.pre('save',async function(next){
	if(!this.isModified('password')){
		return next()
	}
	this.password=await	bcrypt.hash(this.password,10);
	return next()
})

userSchema.methods = {
	jwtToken() {
		return JWT.sign(
			{ id: this._id, email: this.email },
			process.env.SECRET,
			{ expiresIn: '24h' }
		)
	}
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel