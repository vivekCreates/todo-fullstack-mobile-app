import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useTodo } from '@/utils/TodoContext'
import Checkbox from "expo-checkbox";

export default function TodoItem({ id,isCompleted, title,todo, setTodo }: { id: string,todo:string,isCompleted:boolean, title: string, setTodo: (text: string) => void }) {
  const { deleteTodo, updateTodo, todoEditableId,setTodoEditableId } = useTodo();


  return (
    <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
      <Checkbox
              value={isCompleted}
              onValueChange={()=>updateTodo(id,title,!isCompleted)}
              color={isCompleted ? "#4630EB" : undefined}
              />
    <View style={{
      width: "90%",
      padding: 10,
      backgroundColor: "#56D18B",
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15
      
      
    }}>
           
      <TextInput
        style={{
          width: "70%",
          fontSize: 20,
          textDecorationLine: isCompleted ? "line-through" : "none",
        }}
        value={title}

      />
      <View style={{ flexDirection: "row", gap: 4 }}>
        <Pressable
          style={{ width: 30, height: 20, cursor: "pointer" }}
          onPress={() => deleteTodo(id)}
        >
          <Ionicons name={"trash-bin"} size={20} color={"red"} />
        </Pressable>
          {
            todoEditableId == id ?
              (
                <Pressable onPress={() => {
                  
                  updateTodo(id, todo);
                  setTodo("")
                }} style={{ width: 30, height: 20, cursor: "pointer" }}>
                  <Ionicons name={"checkmark"} size={20} color={"purple"} />
                </Pressable>
              ) : (
                <Pressable onPress={() => {
                  setTodoEditableId(id)
                  setTodo(title)
                }
                } style={{ width: 30, height: 20, cursor: "pointer" }}>
                  <Ionicons name={"pencil"} size={20} color={"purple"} />
                </Pressable>
              )
          }

      </View>
    </View>
    </View>
  
  )
}
