import {  Image, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import {useEffect, useState} from "react";
import { encodeImage, getData, getMedicinesFromImage, storeData } from '../../helperfunctions';

export default function App() {

  const [img, setImg] = useState("")
  const [data, setData] = useState({})

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
      <Text>Loading data....</Text>
    )
  }
  return (
    <>
      <View className="bg-[#03001C] h-full flex flex-col justify-center items-center">
        <StatusBar backgroundColor='#161622' style='light' />
        <Text style={{ color: 'white', marginBottom: 10 }}>List of Medicines:</Text>
        <View style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 8, width: '90%' }}>
          {data.medicines.map((medicine, index) => (
            <Text key={index} style={{ marginBottom: 5 }}>{medicine}</Text>
          ))}
        </View>
      </View>
    </>
  );
}


