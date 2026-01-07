import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@/utils/AuthContext'
import { useTodo } from '@/utils/TodoContext'

export default function account() {
  const {user} = useAuth()
  const {todos} = useTodo()
  const completedTodos = todos.filter(todo=>todo.isCompleted===true);
  console.log("Completed: ",completedTodos)
  return (
    <SafeAreaView style={{width:"100%",padding:10}}>
      <View style={{flexDirection:"row",gap:20,alignItems:"center"}}>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",width:100,height:100,borderRadius:100,backgroundColor:"grey"}}>
        <Text style={{color:"white",fontSize:50}}>{user?.username.charAt(0)}</Text>
      </View>
      <Text style={{color:"white",fontSize:20}}>{user?.username}</Text>
      </View>
      <Text style={{fontSize:20,color:"white",marginTop:30}}>Todos: {todos.length}</Text>
      <Text style={{fontSize:20,color:"white",marginTop:30}}>Completed: {completedTodos.length}</Text>
    </SafeAreaView>
  )
}