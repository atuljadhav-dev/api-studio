import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URI = 'mongodb://localhost:27017';
const DATABASE_NAME = 'api_studio';
export async function connectDatabase() {
	try {
		await mongoose.connect(MONGODB_URI, { dbName: DATABASE_NAME });

		console.log('MongoDB Connected');
	} catch (error) {
		console.error('MongoDB Connection Failed');
		console.error(error);
		process.exit(1);
	}
}
