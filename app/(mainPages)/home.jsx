import {  Animated,Easing,Image, Text, TouchableOpacity, View,FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import {useEffect, useState, useRef} from "react";
import { encodeImage, getData, getMedicinesFromImage, storeData,clearData } from '../../helperfunctions';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';




const Card = ({ data ,handleDelete}) => {
console.log(data)
  return (
    <View className="bg-white flex flex-row justify-between m-3 px-3 py-4 rounded-md border-orange-400 border-4" >
      <Text className="text-black text-xl font-semibold ">{data}</Text>
      <TouchableOpacity onPress={()=>handleDelete(data)} ><AntDesign name="delete" size={20} color="red" /></TouchableOpacity>
    </View>
  );
};

export default function App() {

  const scaleValue = useRef(new Animated.Value(1)).current;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: 200,
    },
  });

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 0.9,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };

    animate();
  }, [scaleValue]);


  const [img, setImg] = useState("")
  const [data, setData] = useState({})


  const handleDelete = async (name) => {
    try {
      const updatedMedicines = data.medicines.filter((item) => item !== name);
      setData({ ...data, medicines: updatedMedicines });
      await storeData("tablets", JSON.stringify({ ...data, medicines: updatedMedicines }));
      if(updatedMedicines.length ===0){
        console.log("hjfhkjdashfjdajfgdsafhdsghgah")
        await storeData("tablets", null);
        router.navigate("/intro")
      }
    } catch (error) {
      console.error(`Error updating data:`, error);
    }
  };


  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imgUrl = await getData("url");
        setImg(imgUrl);
      } catch (error) {
        console.error('Error fetching data:', error);
        setImg(null); // or set a default image URL
      }
    };

    fetchImage();
  }, []);

  useEffect(() => {
    const fetchTabletData = async () => {
      try {
        const tablets = await getData("tablets");
        if (tablets === null) {
          console.log("Fetching tablet data...");
          const data = await getMedicinesFromImage(img);
          setData(data);
          await storeData("tablets", JSON.stringify(data));
        } else {
          console.log("Setting data from AsyncStorage...");
          setData(JSON.parse(tablets));
        }
      } catch (error) {
        console.log('Error in useEffect:', error);
      }
    };

    if (img !== "") {
      fetchTabletData();
    }

  }, [img]);


  if(img === null){
    return(
      <Text>Loading...</Text>
    )
  }

  if(Object.keys(data).length === 0)
  {
    return(
      <View className="flex h-full bg-[#03001c] justify-center items-center px-10">
        <Animated.Image
        source={require('../../assets/landing.png')}
        className="w-20 h-20"
        resizeMethod="contain"
        style={[styles.image, { transform: [{ scale: scaleValue }] }]}
        
      />
        <Text className="text-xl text-[#B6EADA] text-center mt-5 font-[popSemiBold]">Analyzing Prescription</Text>
      </View>
    )
  }

  return (
    <> 
      <SafeAreaView className="bg-[#03001C] h-full flex flex-col px-4 py-2" >
      <FlatList  
        data = {data.medicines}
        keyExtractor={(item,index)=>index.toString()}
        renderItem={({ item, index }) => (
          <Card key={index} data={item} handleDelete={handleDelete} />
        )}
        ListHeaderComponent={() => (
          <View className="flex text-left my-6 px-4 space-y-6">
            <Text className="text-white text-3xl">Hello, Recipient</Text>
          </View>
        )}
      />
      </SafeAreaView>
      <StatusBar backgroundColor='#161622' style='light' />
    </>
  );
}

