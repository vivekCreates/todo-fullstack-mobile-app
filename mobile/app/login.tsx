import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'


export default function login() {
  return (
    <SafeAreaView style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
      <View style={{ width: "100%", height: "100%", flexDirection: "column", gap: 10, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white", marginBottom: 10, fontSize: 25, fontWeight: "semibold" }}>Login to TodoMaster</Text>
        <TextInput style={style.input} placeholder='Enter your email' placeholderTextColor={"grey"} />
        <TextInput style={style.input} placeholder='Enter your password' placeholderTextColor={"grey"} />
        <Pressable style={{
          height: 48,
          width:"80%",
          backgroundColor: "#4F46E5",
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Text style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "500",
          }}>Login</Text>
        </Pressable>

        <Text style={{color:"white"}}>If you dont have an account please <Link style={{color:"skyblue"}} href={"/register"} replace>register</Link></Text>
      </View>
    </SafeAreaView>
  )
}



const style = StyleSheet.create({
    input: {
        backgroundColor: "#212121",
        color: "white",
        fontSize: 15,
        padding: 15,
        borderRadius: 10,
        width: "80%",
        marginBottom: 10
    }
})