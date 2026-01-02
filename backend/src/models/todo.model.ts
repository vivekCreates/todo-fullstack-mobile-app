import mongoose from "mongoose";

export interface ITodo {
    title:string;
    description:string;
    isCompleted?:boolean;
    userId:string;
}


const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
})

export const Todo = mongoose.model("Todo", todoSchema);