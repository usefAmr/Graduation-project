import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";



// GET ALL USERS
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await userModel.find();
  res.json({ message: "Done", users })
})

// USER PROFILE
export const profile = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const user = await userModel.findOne({ _id: req.user._id,status:'online'});
  return user ? res.status(200).json({ message: "Done", user })
    : next(new Error("IN-Valid account or you logged out", { cause: 404 }))
})

// DELETE USER
export const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await userModel.findOneAndDelete({ _id: req.user._id});
    return user ? res.status(200).json({ message: "Done", user }) : next(new Error("Not Exist User", { cause: 400 }))
  })

  // UPDATE 
export const updateUser = asyncHandler(async (req, res, next) => {
    const {_id, name,  email ,gender} = req.body;
    const updatedUser = await userModel.findOneAndUpdate({ _id: _id},{name:name , email : email ,gender},{new:true})
    return res.status(200).json({ message: "Done", user: updatedUser })
}) 
