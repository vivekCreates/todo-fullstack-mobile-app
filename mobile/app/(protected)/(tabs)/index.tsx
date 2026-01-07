import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TodoItem from '@/components/todo-item'
import SearchBar from '@/components/search-input'
import { useTodo } from '@/utils/TodoContext'


export default function todo() {
  const [todo, setTodo] = useState("");

  const {todos} = useTodo();
  return (
    <SafeAreaView style={{padding:10,flexDirection:"column",alignItems:"center"}}>
      <Text style={{fontSize:25,fontWeight:"bold",color:"white",marginBottom:20}}>Todo Master</Text>
      <SearchBar todo={todo} setTodo={setTodo}/>

     <FlatList
      data={todos}
      keyExtractor={(todo) => todo._id}
      renderItem={({ item }) => (
       <TodoItem isCompleted={item.isCompleted} id={item._id} todo={todo} title={item.title} setTodo={setTodo}/>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
     />
   
    </SafeAreaView>
  )
}