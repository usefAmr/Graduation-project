import mongoose from "mongoose"
export const connectDB = async () => {
  return await mongoose.connect(`mongodb+srv://sohilasayed:${process.env.MONGO_PASSWORD}@ums.wqtvsgg.mongodb.net/SoilTypeDetection`).then(result=>{console.log("mongoose connected")})
  .catch(err=>{console.log(`mongoose err ${err}`)})  
  };

export default connectDB