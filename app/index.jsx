import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link, router } from 'expo-router';
import { getData } from '../helperfunctions';
import {useEffect} from "react"

export default function App() {

  useEffect(()=>{
    getData("tablets").then(token=>{
      if(token)
      {
        router.navigate("/home")
      }
    })
  },[])

  const [fontsLoaded] = useFonts({
    'popBlack': require('../assets/fonts/Poppins-Black.ttf'),
    'popBold': require('../assets/fonts/Poppins-Bold.ttf'),
    'popExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'popRegular': require('../assets/fonts/Poppins-Regular.ttf'),
    'popSemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });


  if(!fontsLoaded)
  {
    return(<Text>Loading...</Text>)  
  }

  return (
    <View style={styles.container} className="px-7">
      
      <Image source={require('../assets/landing.png')} className="w-64 h-64" resizeMode="contain"/>
      <Text className="text-center text-[#B6EADA] font-['popBold'] font-bold text-5xl">Amrutham Gamaya</Text>
      <Text  className="text-[#B6EADA] font-['popRegular'] text-lg text-center">Never forget your medicine again</Text>
      <Link href="/intro" asChild><TouchableOpacity className="bg-orange-500 px-4 py-2 rounded mt-5"><Text className="text-white font-[popRegular] text-2xl">Get Started</Text></TouchableOpacity></Link>
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    gap:3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#03001C",
  }
});
