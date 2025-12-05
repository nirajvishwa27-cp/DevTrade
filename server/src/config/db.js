import mongoose from 'mongoose'


export const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "DevTrade",
        })
        console.log("Database connected - MongoDB");
    } catch (error) {
        console.error("Connection failed - MongoDB", error.message);
        process.exit(1);
    }
}