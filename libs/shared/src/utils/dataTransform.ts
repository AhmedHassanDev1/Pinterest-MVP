import mongoose from "mongoose";

export const convertTextToMongoID=(text:string)=>new mongoose.Types.ObjectId(text)
