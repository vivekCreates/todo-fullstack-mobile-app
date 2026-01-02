import { Request, Response } from "express";
import { ITodo, Todo } from "../models/todo.model";



export async function createTodo(req:Request,res:Response) {
  try {
    const {title,description} = req.body

    if(!title || !description){
      return res.status(400).json({message:"Title and Description are required"});
    }

    const newTodo = await Todo.create({
      title,
      description,
      userId: req.user?.id
    });
    return  res.status(201).json({
      message:"Todo created successfully",  
      todo:newTodo
    });
  } catch (error:any) {
    console.log("Error creating todo:",error?.message);
  }
}

export async function updateTodo(req:Request,res:Response) {
  try {
    const {title,description} = req.body 
    const {id} = req.params;

    if(!title && !description){
      return res.status(400).json({message:"Title and Description are required"});
    }

    const todo =  await Todo.findById(id);

    if(!todo){
        return res.status(404).json({message:"Todo not found"});
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id,{
      title,
      description
    },{new:true});

    return  res.status(201).json({
      message:"Todo created successfully",  
      todo:updatedTodo
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
        return res.status(404).json({message:"Todo not found"});
    }   
    await Todo.findByIdAndDelete(id);

    return  res.status(200).json({
      message:"Todo deleted successfully",  
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
            todos
        });
    } catch (error) {
        console.log("Error fetching todos:",error);
    }
}