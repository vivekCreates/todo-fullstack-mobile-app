import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TodoItem from '@/components/todo-item'
import SearchBar from '@/components/search-input'

export default function todo() {
  return (
    <SafeAreaView style={{padding:10,flexDirection:"column",alignItems:"center"}}>
      <Text style={{fontSize:25,fontWeight:"bold",color:"white",marginBottom:20}}>Todo Master</Text>
      <SearchBar/>
      <TodoItem/>
    </SafeAreaView>
  )
}