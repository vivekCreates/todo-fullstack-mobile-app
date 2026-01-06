import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TodoItem from '@/components/todo-item'
import SearchBar from '@/components/search-input'
import { useTodo } from '@/utils/TodoContext'


export default function todo() {
  const {todos} = useTodo();
  return (
    <SafeAreaView style={{padding:10,flexDirection:"column",alignItems:"center"}}>
      <Text style={{fontSize:25,fontWeight:"bold",color:"white",marginBottom:20}}>Todo Master</Text>
      <SearchBar/>
     <FlatList
      data={todos}
      keyExtractor={(todo) => todo._id}
      renderItem={({ item }) => (
       <TodoItem title={item.title}/>
      )}
     />
    </SafeAreaView>
  )
}