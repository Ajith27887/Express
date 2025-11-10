import mongoose, { Schema, model } from "mongoose";


const Blog = Schema({
		user : {
			type:mongoose.Schema.Types.ObjectId,
			required : true,
			ref: 'User'
		}
	},
	{
		text: String,
        required: [true, 'Text field is required']
})

export default model("Blog", Blog);