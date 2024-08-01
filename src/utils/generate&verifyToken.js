import jwt from 'jsonwebtoken';

export const generateToken=({payload,signature=process.env.TOKEN_SIGNATURE,expiresIn=60*60*24*365}={})=>{
    const token =jwt.sign(payload,signature,{expiresIn});
    return token;
}
export const verifyToken=({token,signature=process.env.TOKEN_SIGNATURE}={})=>{
    const decodded =jwt.verify(token,signature);
    return decodded;
}