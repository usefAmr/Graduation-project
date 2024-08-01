
import userModel from '../../../../DB/model/User.model.js'
import { asyncHandler } from '../../../utils/errorHandling.js';
import {generateToken,verifyToken } from '../../../utils/generate&verifyToken.js';
import { compare, hash } from '../../../utils/hash&compare.js';
import generator from 'generate-password';
import {sendEmail} from '../../../utils/sendEmail.js'
import QRCode from 'qrcode'

export const signUp =asyncHandler (
async(req,res,next)=>{

    try{
        const {name,email,password,cPassword,gender}=req.body
        console.log({name,email,password,cPassword,gender});
    
        const checkUser =  await userModel.findOne({email})
        if(checkUser){
            res.status(409);
    
            return next(new Error('Email Exist' , {cause:409}))
        }
        else{
            const hashPassword = hash({
            plainText :password
        })
    
    
        const user =  await userModel.create({name,email,password:hashPassword,gender})
        return res.status(201).json({message : "Done",user : user})
        }
    }
    catch (error) {
        res.status(400);
        return next(new Error( error, {cause:400}))
    }
})

export const login =asyncHandler(
async(req,res,next)=>{

    const {email,password}=req.body
    console.log({email,password});
    const checkUser =  await userModel.findOne({email})
    if(!checkUser){
        res.status(409) 
        return next(new Error('Email not Exist' , {cause:404}))
    }

    const matchPassword = compare({
        plainText :password,
        hashValue : checkUser.password
    })
    if(!matchPassword){
        return next(new Error('In-valid Password' , {cause:400}))

    }
    console.log(process.env.TOKEN_SIGNATURE)
    const token = generateToken({
        payload : {id : checkUser._id , name :checkUser.name,email:checkUser.email},
        signature: process.env.TOKEN_SIGNATURE,
        expiresIn :60*60*24
    })
    checkUser.status = 'online'
    checkUser.save()
    return res.status(201).json({message : "Done",token,user:checkUser})
})

export const logout =asyncHandler(
    async(req,res,next)=>{

        const {token}=req.body;
        const decodded = verifyToken({ token, signature: process.env.TOKEN_SIGNATURE })

        const user = await userModel.findOneAndUpdate({email : decodded.email},{status : 'offline'},{new : true})
        console.log("Logout");
        return res.status(201).json({message : "logout",user})
    })


function generateRandomPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|;:,.<>?";
    let password = "";
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // Pattern for password validation
  
    do {
      password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
    } while (!pattern.test(password)); // Regenerate password until it meets the pattern
  
    return password;
}

export const forgetPassword = asyncHandler( async(req,res,next)=>{

    const randomPassword = generateRandomPassword(12);

    try {
        if(!req.body.email)
        {
            res.status(409);
            return next(new Error('Email is Required' , {cause:409}))
        }
        const {email}= req.body;
        const checkUser =  await userModel.findOne({email})
        if(!checkUser){
            res.status(409);

            return next(new Error('Email not Exist' , {cause:409}))
        }
        else{
            const hashPassword = hash({
                plainText :randomPassword
            })
            await userModel.findOneAndUpdate({email},{password : hashPassword})
    
            await sendEmail({to : email ,  subject: "Reset password ✔",text: `Password is Sent`,html: `<b>Your new password is: ${randomPassword}</b>`})
            return res.status(200).json({message: 'Password sent successfully'})
        }
        }
    catch (error) {
        res.status(400);
        return next(new Error( error, {cause:400}))
    }
})

