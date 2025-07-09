import mongoose from 'mongoose';


export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URL;
        if (!mongoURI) {
            throw new Error('MONGO_URL is not defined in environment variables');
        }
        await mongoose.connect(process.env.MONGO_URL);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
}
