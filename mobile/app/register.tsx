import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, useRouter } from 'expo-router'
import { APIURL } from '@/constants/api'


type UserRegType = {
    username: string;
    email: string;
    password: string;
}

export default function register() {

    const [user, setUser] = useState<UserRegType>({
        username: "",
        email: "",
        password: ""
    })
    const router = useRouter()

    const handleChange = (key: keyof UserRegType, value: string) => {
        setUser((prev) => ({
            ...prev,
            [key]: value
        }))
    }


    const handleSubmit = async () => {
        try {
            const response = await fetch(`${APIURL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username:user.username,
                    email:user.email,
                    password:user.password
                })
            })
            console.log("response: ",response)
            if(!response.ok){
                throw new Error("Rregistration failed")
            }

            const data = await response.json();
            if(data.success){
                router.push("/login");
            }
            
        } catch (error:any) {
            console.log("Registration error: ",error.message)
        }
    }


    return (
        <SafeAreaView style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
            <View style={{ width: "100%", height: "100%", flexDirection: "column", gap: 10, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "white", marginBottom: 10, fontSize: 25, fontWeight: "semibold" }}>Register to TodoMaster</Text>
               
                <TextInput
                    style={style.input}
                    placeholder='Enter your username'
                    placeholderTextColor={"grey"}
                    onChangeText={(text) => handleChange("username", text)}
                    value={user.username}
                />
                <TextInput
                    style={style.input}
                    placeholder='Enter your email'
                    placeholderTextColor={"grey"}
                    onChangeText={(text) => handleChange("email", text)}
                    value={user.email}
                />
                <TextInput
                    style={style.input}
                    placeholder='Enter your password'
                    placeholderTextColor={"grey"}
                    onChangeText={(text) => handleChange("password", text)}
                    value={user.password}
                />
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
                    }}>Register</Text>
                </Pressable>

                <Text style={{ color: "white", }}>If you already have an account please <Link style={{ color: "skyblue" }} href={"/login"} replace>login</Link></Text>
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