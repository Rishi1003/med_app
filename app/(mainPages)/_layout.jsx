import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export const MainLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name='home' options={{headerShown:false}}  />
      </Stack>
      <StatusBar backgroundColor='#161622' style='light' />
    </>
  )
}
