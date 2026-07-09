import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const uri : (string | undefined) = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI environment variable is required');
        }

        await mongoose.connect(uri);
        console.log('MongoDB Connected !');
    } catch (error) {
        console.log('MongoDB connection error: ', error);
        process.exit(1);
    }
}