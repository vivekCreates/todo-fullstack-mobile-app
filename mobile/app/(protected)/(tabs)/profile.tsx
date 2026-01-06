import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@/utils/AuthContext'

export default function account() {
  const {user} = useAuth()
  return (
    <SafeAreaView>
      <Text style={{color:"white"}}>{user?.username}</Text>
    </SafeAreaView>
  )
}