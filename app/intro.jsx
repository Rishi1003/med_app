import { StatusBar } from 'expo-status-bar';
import {useState} from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View ,Modal} from 'react-native';
import {router,} from 'expo-router';
import slide1 from "../assets/slide1.png"
import slide2 from "../assets/slide2.png"
import slide3 from "../assets/slide3.png"
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { storeData } from '../helperfunctions';

export default function App() {

  const [modalVisible, setModalVisible] = useState(false);

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


  const [img, setImg] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo0s41nYCP4j8oOYrsqt5iwZNJ3nnMJPcynw&s");

  const handleCamera = async () => {
    setModalVisible(false);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImg(result.assets[0].uri);
      console.log(result.assets[0].uri)
      storeData("url",result.assets[0].uri)
      router.push('/home')
    }
  };


  const pickImage = async () => {
    setModalVisible(false);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      setImg(result.assets[0].uri);
      console.log(result.assets[0].uri)
      storeData("url",result.assets[0].uri)
      router.push('/home');
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
        <TouchableOpacity onPress={next} className={"px-7 py-2 bg-orange-400 rounded-full mt-10 " + (slide == 3?"hidden":"")}><Text className="text-white text-4xl">{">"}</Text></TouchableOpacity>

      <View className={`${slide == 3?"":"hidden"} flex-col text-center gap-5 w-full mt-6`}>
        <TouchableOpacity onPress={() => setModalVisible(true)} className="px-7 ml-10 bg-orange-400 rounded py-6"><Text className="text-white text-lg font-[popSemiBold] text-center">Upload Image</Text></TouchableOpacity>
        {/* <TouchableOpacity onPress={prev} className="px-7 ml-10 py-6 bg-orange-400 rounded"><Text className="text-white font-[popSemiBold] text-lg text-center">Go back</Text></TouchableOpacity> */}
      </View>
      
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-[70%] p-5 bg-white rounded-lg items-center relative">
          <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="mt-2 rounded px-4 py-2 absolute right-0 top-0"
            >
              <Text className="text-white text-center"><FontAwesome name="close" size={24} color="black" /></Text>
            </TouchableOpacity>
            <Text className="mb-3 p-2 text-center text-xl font-bold">Select to Upload</Text>
            <View className="flex flex-row justify-center items-center gap-10">
            <TouchableOpacity
              onPress={handleCamera}
              className="mt-2 rounded bg-orange-400 px-4 py-2"
            >
              <Text className="text-white text-center"><AntDesign name="camera" size={30} color="black" /></Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={pickImage}
              className="mt-2 rounded bg-orange-400 px-4 py-2"
            >
              <Text className="text-white text-center"><Ionicons name="document" size={30} color="black" /></Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}


const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});