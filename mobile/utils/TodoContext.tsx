import { APIURL } from "@/constants/api";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";


interface Todo {
    _id: string;
    title: string;
    isCompleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface TodoContextTpye {
    todos: Todo[];
    addTodo: (todo: string) => void;
    updateTodo: (id: string, todo: string) => void;
    deleteTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextTpye | null>({
    todos: [],
    addTodo: (todo: string) => { },
    updateTodo: (id: string, title: string) => { },
    deleteTodo: (id: string) => { }
});



export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
    const [todos, setTodos] = useState<Todo[] | []>([]);
    const {token} = useAuth();

    useEffect(()=>{
         if (!token) return;

        const getTodos = async()=>{
        try {
            console.log("TOken: ",token)
            const response = await fetch(`${APIURL}/todos/all`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`${token}`
                }
            })
            console.log("response: ",response)
            if(!response.ok){
                throw new Error("Failed to fetching todos ")
            }
            const data  = await response.json();
            console.log("data:",data)
            if (data.success){
                setTodos(data.todos)
            }
        } catch (error:any) {
            console.log("Error while fetching todos: ",error?.message);
        }
    }
        getTodos();
    },[token])

    const addTodo = async (title: string) => {
        const tempId = Date.now().toString();

        setTodos((prev:Todo[]) => ([
            {
                _id: tempId,
                title,
                isCompleted: false,
            },
            ...prev,
        ]));

        try {
            const response = await fetch(`${APIURL}/todos/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`
                },
                body: JSON.stringify({ title }),
            });

            if (!response.ok) {
                throw new Error("Failed to add todo");
            }
            const data = await response.json();
            const realTodo = data.todo;

            setTodos(prev =>
                prev.map(todo =>
                    todo._id === tempId ? realTodo : todo
                )
            );

        } catch (error) {
            setTodos(prev => prev.filter(todo => todo._id !== tempId));
        }
    };
    const updateTodo = async(id:string,title:string)=>{
        setTodos(prev=>(
            prev.map(todo=>(
                todo._id == id ? {...todo,title}:todo
            ))
        ))
        try {
            const response = await fetch(`${APIURL}/todos/update/${id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `${token}`
                },
                body:JSON.stringify({title})

            });

            if(!response.ok){
                throw new Error("Failed to update todo");
            }

            const data = await response.json();

            setTodos(prev=>(
                prev.map(todo=>(
                    todo._id == id ? data.todo : todo
                ))
            ))
        } catch (error:any) {
            console.log("Todo update: ",error?.message)
        }
    };
    const deleteTodo = async(id:string)=>{
        const todoToDelete = todos.find(todo=>todo._id==id);

        setTodos(prev=>(
            prev.filter(todo=>(
                todo._id != id
            ))
        ))
        try {
            const response = await fetch(`${APIURL}/todos/delete/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `${token}`
                },

            });

            if(!response.ok){
                if(todoToDelete){
                    setTodos((prev:Todo[])=>([...prev,todoToDelete]))
                }
                throw new Error("Failed to delete todo");
            }

            const data = await response.json();
            if(data.success){
                console.log("Todo deleted successfully!");
            }
        } catch (error:any) {
            console.log("Todo delete: ",error?.message)
        }
    };
    

    return (
        <TodoContext.Provider value={{todos,addTodo,updateTodo,deleteTodo}}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodo must be inside TodoProvider");
  return ctx;
};