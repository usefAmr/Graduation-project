import userModel from "../../DB/model/User.model.js";
import { asyncHandler } from "../utils/errorHandling.js";
import { verifyToken } from "../utils/generate&verifyToken.js";

export const auth =asyncHandler( async (req, res, next) => {

        const { authorization } = req.headers;
        if (!authorization) {
           return next(new Error("Authorization is required"));
        }
        if (!authorization.startsWith(process.env.BEARER_KEY)) {
            return next(new Error ("IN-Valid Bearer key"));
        }
        const token = authorization.split(process.env.BEARER_KEY)[1];
        if (!token) {
           return next(new Error("Token is required"));
        }
        const decodded = verifyToken({ token, signature: process.env.TOKEN_SIGNATURE });
        if (!decodded?.id ) {
           return next (new Error("IN-Valid Token Payload"));
        }
        const authUser = await userModel.findById(decodded.id);
        if (!authUser) {
           return next(new Error("Account is Not Registered"));
        }
        req.user = authUser;
        return next();
})
