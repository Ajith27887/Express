import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();


const url = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(url, {});
        console.log('Database connected to:', mongoose.connection.name);
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};	



export default connectDB;