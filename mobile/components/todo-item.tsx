import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useTodo } from '@/utils/TodoContext'

export default function TodoItem({id,title}:{id:string,title:string}) {
  const {deleteTodo} = useTodo();
  return (
    <View style={{
      width:"90%",
      padding:10,
      backgroundColor:"#56D18B",
      flexDirection:"row",
      alignItems:'center',
      justifyContent:"space-between",
      paddingHorizontal:10,
      paddingVertical:5,
      borderRadius:15
      }}>
      <TextInput 
      style={{
        width:"70%",
        fontSize:20,
      }}
      value={title}
      readOnly
      />
      <View style={{flexDirection:"row",gap:4}}>
        <Pressable
        style={{width:30,height:20,cursor:"pointer"}}
        onPress={()=>deleteTodo(id)}
        
        >

      <Ionicons name={"trash-bin"} size={20} color={"red"}/>
        </Pressable>
        <Pressable style={{width:30,height:20,cursor:"pointer"}}>
      <Ionicons name={"pencil"} size={20} color={"purple"}/>
        </Pressable>
      </View>
    </View>
  )
}