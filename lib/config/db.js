import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://edwyn4:cMqipYzJUJuSxr4n@cluster0.waqzf.mongodb.net/blogger')
    console.log('DB Is Connected')
}