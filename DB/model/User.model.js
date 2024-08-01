import mongoose from 'mongoose';

const userSchema = new mongoose.Schema ({
    name : {
        type:String,
        required : true
    },
    email : {
        type:String,
        required : true,
        unique : true
    },
    password : {
        type:String,
        required : true
    },
    status:{
        type:String,
        enum : ['online','offline'],
        default: 'online'
    },
    image: {
        type: Object,
        default: 'https://asset.cloudinary.com/dkaflobgm/887fe32dc703b4d02112b7bc18b0307c'|| null
    },
    
},{
    timestamps : true
})

const userModel = mongoose.model('User',userSchema)

export default userModel

