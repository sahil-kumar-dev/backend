const mongoose=require('mongoose')

const {Schema}=mongoose;

const userSchema=new Schema({
	 name:{
		type:String,
		require:[true,"User name is required."],
		minLength:[5,"Name mush be at least 5 characters."],
		maxLength:[50,"Name must be leass than 50 characters."]
	 },
	 email:{
		type:String,
		required:[true,"User email is required."],
		unique:[true,"Already resistred."],
		lowercase:true,
	 },
	 password:{
		type:String,
	 },
	 forgotPasswordToekn:{
		type:String,
	 },
	 forgotPasswordExpiryDate:{
		type:Date,
	 }
},{
	timestamps:true
})

const userModel = mongoose.model('user',userSchema)

module.exports=userModel