import mongoose from "mongoose";

const connectDB=async()=>{

    try {
        const db=await mongoose.connect(process.env.URI)
        console.log(db.connection.host);
        console.log(`db is connected`);
    } catch (error) {

        
    }

}


export default connectDB;