import {  Text, TouchableOcity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar'


export default function App() {
  return (
    <>
        <View className="bg-[#03001C] h-full flex flex-col justify-center items-center" >
      <Text className="text-white" >Home</Text>
    </View>
      <StatusBar backgroundColor='#161622' style='light' />
    </>
  );
}


