import mongoose from "mongoose";
import { constants } from "../utils/constants.js";
export const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGOD_DB_URL}/${constants.DB_NAME}`)
        console.log("Database COnnected Successfully on host: ",connectionInstance.connection.host)
    } catch (error) {
        console.log("Mongoose Connection Error",error)
        process.exit(1)
    }
}