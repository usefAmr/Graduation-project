export const asyncHandler=(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(err=>{
            return next(new Error(err.message));
        })
    }
}
export const globalErrorHandling=(err,req,res,next)=>{
if(err){
    if(process.env.MOOD=="DEV"){
        return res.json({message:err.message,err,stack:err.stack});
    }
    return res.json({message:err.message});
}
}
