import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        if(mongoose.connections[0].readyState) return;
        await mongoose.connect(process.env.MONGODB_URI as string);
    } catch (error) {
        console.error("Unable to connect to database: ", error);
    }
}