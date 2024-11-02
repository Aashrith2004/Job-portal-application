import mongoose from "mongoose";
import colors from 'colors';

const connectdb = async () => {
    try {
        // Validate the MongoDB URI
        if (!process.env.MONGO_LOCAL_URL) {
            throw new Error("MongoDB connection string is not defined in the environment variables.");
        }

        // Connect to the MongoDB database with options
        const conn = await mongoose.connect(process.env.MONGO_LOCAL_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true, // Optional: if you are using indexes
            useFindAndModify: false // Optional: prevents deprecation warnings
        });
        
        console.log(`DB connected: ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`Error in DB connection: ${error.message}`.bgCyan.white);
    }
};

export default connectdb;
