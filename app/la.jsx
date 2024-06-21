import { StatusBar } from 'expo-status-bar';
import {useState} from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Slot} from 'expo-router';
import slide1 from "../assets/slide1.png"
import slide2 from "../assets/slide2.png"
import slide3 from "../assets/slide3.png"


export default function App() {

  const images = [slide1, slide2, slide3];
  const text = [
    "Get your prescription from the doctor",
    "Upload the prescription",
    "Get reminders"
  ]

  const [slide, setSlide] = useState(1)

  const next = ()=>{
    if(slide<=2)
      setSlide(prev=>prev+1)
  }
  
  const prev = ()=>{
    if(slide>1)
    {
      setSlide(prev=>prev-1)
    }
  }

  let startX = 0;

  const handleTouchStart = (e) => {
    startX = e.nativeEvent.pageX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.nativeEvent.pageX;
    if (startX - endX > 50) {
      next();
    } else if (endX - startX > 50) {
      prev();
    }
  };


  return (
    <View 
      onStartShouldSetResponder={() => true}
      onResponderStart={handleTouchStart}
      onResponderRelease={handleTouchEnd}
      className="flex-col flex-1 items-center justify-center bg-[#03001C]">
      
      <Image source={images[(slide-1)]} resizeMethod="contain" className="h-64 w-full"/>
      
      <Text className="text-white font-[popSemiBold] mx-2 mt-8 text-center text-3xl">{text[slide - 1]}</Text>
      
      <View className={`flex-row gap-5 mt-8 items-center ${slide == 3?"":""}`}>
        {/* <TouchableOpacity onPress={prev} className={`px-7 ml-10 py-2 bg-orange-400 rounded ${slide == 1 ? "bg-orange-300":"bg-orange-400"}`}><Text className="text-white text-lg">Prev</Text></TouchableOpacity> */}
        <View className={`w-3 h-3 rounded-full ${slide == 1?"bg-orange-500":"bg-white"} ${slide==3?"":""}`}/>
        <View className={`w-3 h-3 rounded-full ${slide == 2?"bg-orange-500":"bg-white"} ${slide==3?"":""}`}/>
        <View className={`w-3 h-3 rounded-full ${slide == 3?"bg-orange-500":"bg-white"} ${slide==3?"":""}`}/>
      </View>
        {/* <TouchableOpacity onPress={next} className={"px-7 py-2 bg-orange-400 rounded-full mt-10 " + (slide == 3?"hidden":"")}><Text className="text-white text-4xl">{">"}</Text></TouchableOpacity> */}

      <View className={`${slide == 3?"":"hidden"} flex-col text-center gap-5 w-full mt-6`}>
        <TouchableOpacity className="px-7 ml-10 bg-orange-400 rounded py-6"><Text className="text-white text-lg font-[popSemiBold] text-center">Upload Image</Text></TouchableOpacity>
        {/* <TouchableOpacity onPress={prev} className="px-7 ml-10 py-6 bg-orange-400 rounded"><Text className="text-white font-[popSemiBold] text-lg text-center">Go back</Text></TouchableOpacity> */}
      </View>

    </View>
  );
}