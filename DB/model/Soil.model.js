import mongoose from 'mongoose';

const soilSchema = new mongoose.Schema ({
    name : {
        type:String,
        required : true
    },
    image: {
        type: Object,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    confidence : {
        type : Number
    },
    history:{
        type:Boolean
    }
},{
    timestamps : true
})

const soilModel = mongoose.model('Soil',soilSchema)

export default soilModel

