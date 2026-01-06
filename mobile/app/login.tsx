import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, useRouter } from 'expo-router'
import { APIURL } from '@/constants/api'
import { useAuth } from '@/utils/AuthContext'



type UserLoginType = {
  email: string;
  password: string;
}

export default function login() {
  const { login } = useAuth()

  const [user, setUser] = useState<UserLoginType>({
    email: "",
    password: ""
  })
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleChange = (key: keyof UserLoginType, value: string) => {
    setUser((prev) => ({
      ...prev,
      [key]: value
    }))
  }


  const handleSubmit = async () => {
    try {
      const response = await fetch(`${APIURL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password
        })
      })
      console.log("response: ", response)
      if (!response.ok) {
        setMessage("Registration failed")
        throw new Error("Registration failed")
      }

      const data = await response.json();
      if (data.success) {
        login(data.token, data.user)
        router.push("/(protected)/(tabs)");
      }

    } catch (error: any) {
      console.log("Registration error: ", error.message)
    }
  }

  return (
    <SafeAreaView style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
      <View style={{ width: "100%", height: "100%", flexDirection: "column", gap: 10, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white", marginBottom: 10, fontSize: 25, fontWeight: "semibold" }}>Login to TodoMaster</Text>
        <TextInput style={style.input} placeholder='Enter your email' placeholderTextColor={"grey"} value={user.email} onChangeText={(text) => handleChange("email", text)} />
        <TextInput style={style.input} placeholder='Enter your password' placeholderTextColor={"grey"} value={user.password} onChangeText={(text) => handleChange("password", text)} />
        {
          message &&
          (
            <Text style={{ color: "white", marginBottom: 10, fontSize: 10 }}>{message}</Text>
          )
        }
        <Pressable style={{
          height: 48,
          width: "80%",
          backgroundColor: "#4F46E5",
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
          onPress={handleSubmit}
        >
          <Text style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "500",
          }}>Login</Text>
        </Pressable>

        <Text style={{ color: "white" }}>If you dont have an account please <Link style={{ color: "skyblue" }} href={"/register"} replace>register</Link></Text>
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