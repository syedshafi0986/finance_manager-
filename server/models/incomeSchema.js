import mongoose from "mongoose";
import usermodel from "./authschema.js";

const incomeSchema = mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:usermodel,
            required:true
        },
        amount:{
            type:Number,
            required:true,


        },
        source:{
            type:String,
            required:true,
        },
        date:{
            type:Date,
            default:Date.now
        }
    }
)

const incomeModel = mongoose.model("income",incomeSchema)

export default incomeModel