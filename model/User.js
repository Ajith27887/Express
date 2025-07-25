import mongoose, { model } from "mongoose";

const userSchema = mongoose.Schema({
	name: {
		type: String,
		require : [true, "Please add a name"]
	}, 
	email: {
		type: String,
		require: [true, "Please add a email"]
	},
	password:{
		type: String,
		require: [true, "Please add a password"]
	}
},{
	timestamps : true
})

export default model("User", userSchema);