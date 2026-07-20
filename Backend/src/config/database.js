import mongoose from "mongoose";


async function connectDB(){
    const conn = await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected to database");
    })
}

export default connectDB;