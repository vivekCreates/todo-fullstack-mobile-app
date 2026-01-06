import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TodoItem from '@/components/todo-item'

export default function todo() {
  return (
    <SafeAreaView>
      <TodoItem/>
    </SafeAreaView>
  )
}