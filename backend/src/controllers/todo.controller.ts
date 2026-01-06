import { Request, Response } from "express";
import { ITodo, Todo } from "../models/todo.model";



export async function createTodo(req:Request,res:Response) {
  try {
    const {title} = req.body

    if(!title){
      return res.status(400).json({success:false,message:"Title is required"});
    }

    const newTodo = await Todo.create({
      title,
      userId: req.user?.id
    });
    return  res.status(201).json({
      message:"Todo created successfully",  
      todo:newTodo,
      success:true
    });
  } catch (error:any) {
    console.log("Error creating todo:",error?.message);
  }
}

export async function updateTodo(req:Request,res:Response) {
  try {
    const {title} = req.body 
    const {id} = req.params;

    if(!title){
      return res.status(400).json({success:false,message:"Title is required"});
    }

    const todo =  await Todo.findById(id);

    if(!todo){
        return res.status(404).json({success:false,message:"Todo not found"});
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id,{
      title,
    },{new:true});

    return  res.status(201).json({
      message:"Todo created successfully",  
      todo:updatedTodo,
      success:true
    });
  } catch (error:any) {
    console.log("Error updating todo:",error?.message);
  }
}

export async function deleteTodo(req:Request,res:Response) {
  try {
    const {id} = req.params;    
    const todo =  await Todo.findById(id);

    if(!todo){
        return res.status(404).json({success:false,message:"Todo not found"});
    }   
    await Todo.findByIdAndDelete(id);

    return  res.status(200).json({
      message:"Todo deleted successfully",  
      succuss:true
    });
  } catch (error:any) {
    console.log("Error deleting todo:",error?.message);
  } 
}

export async function getTodos(req:Request,res:Response) {
    try {
        const todos = await Todo.find({userId:req.user!.id});
        return res.status(200).json({
            message:"Todos fetched successfully",
            todos,
            success:true
        });
    } catch (error) {
        console.log("Error fetching todos:",error);
    }
}