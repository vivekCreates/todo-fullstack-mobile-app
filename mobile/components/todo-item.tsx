import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function TodoItem() {
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
      value='todo'
      />
      <View style={{flexDirection:"row",gap:4}}>
        <View
        style={{width:30,height:20,cursor:"pointer"}}
        >

      <Ionicons name={"trash-bin"} size={20} color={"red"}/>
        </View>
        <View style={{width:30,height:20,cursor:"pointer"}}>
      <Ionicons name={"pencil"} size={20} color={"purple"}/>
        </View>
      </View>
    </View>
  )
}