import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URL = process.env.MONGODB_URI;

const connectdb = async () => {
	try {
		const connect = await mongoose.connect(URL,{});
		console.log(`db connected ${mongoose.connection.name}`);
		
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

export default connectdb;