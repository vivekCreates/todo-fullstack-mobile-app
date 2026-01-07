import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useTodo } from '@/utils/TodoContext';

export default function SearchBar({todo,setTodo}:{todo:string,setTodo:(text:string)=>void}) {
    
    const {addTodo} = useTodo();
    return (
        <View style={{ width: "100%",   marginBottom: 40, flexDirection: "row", gap: 5,justifyContent:"center",alignItems:"center"}}>
            
            <TextInput style={{ width: "70%",color:"white", fontSize: 15,padding:15 ,borderRadius: 10,backgroundColor: "#212121"}}
                placeholder='Enter Todo...'
                placeholderTextColor={"grey"}
                value={todo}
                onChangeText={(text) => setTodo(text)}
            />
            <Pressable style={{
                height: 50,
                width: "20%",
                backgroundColor: "#4F46E5",
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
            }}
            onPress={()=>{
                addTodo(todo)
                setTodo("")
            }}
            >
                <Text style={{color:"white",fontSize:15}}>Add</Text>
            </Pressable>
        </View>

    )
}