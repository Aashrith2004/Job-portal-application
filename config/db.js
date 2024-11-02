import mongoose from "mongoose";
import colors from 'colors';

const connectdb = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_LOCAL_URL)
        console.log(`DB connected ${mongoose.connection.host}`.bgMagenta.white)
    }
    catch{
        console.log(`Error in DB connection ${error}`.bgCyan,white)
    }
}

export default connectdb;