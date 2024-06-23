import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to store data
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`Data stored successfully for key: ${key}`);
  } catch (error) {
    console.error(`Error storing data for key ${key}:`, error);
  }
};

// Function to retrieve data
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(`Retrieved data for key ${key}:`, value);
      return value;
    } else {
      console.log(`No data found for key ${key}`);
      return null;
    }
  } catch (error) {
    console.error(`Error retrieving data for key ${key}:`, error);
    return null;
  }
};

// Function to clear data for a specific key
export const clearData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Data cleared successfully for key: ${key}`);
  } catch (error) {
    console.error(`Error clearing data for key ${key}:`, error);
  }
};

// Function to clear all data
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    console.log('All data cleared successfully');
  } catch (error) {
    console.error('Error clearing all data:', error);
  }
};


const OpenAI = require('openai');
import * as FileSystem from 'expo-file-system';

// Initialize OpenAI instance with your API key
const Key = ''; // Replace with your actual API key
const openai = new OpenAI({ apiKey });

// Function to encode an image file to base64 format
export async function encodeImage(imagePath) {
    try {
      const fileInfo = await FileSystem.readAsStringAsync(imagePath, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return fileInfo;
    } catch (error) {
      console.error('Error encoding image:', error);
      throw error;
    }
  }

// Helper function to get medicines from image
export async function getMedicinesFromImage(imagePath) {
  try {
    const base64Image = await encodeImage(imagePath);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { "type": "json_object" },
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "get me all the medicines in the image in a json format {medicines:['med1','med2','med3']}" },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`, // Include base64 image here
              },
            },
          ],
        },
      ],
    });

    const jsonResponse = JSON.parse(response.choices[0].message.content);
    return jsonResponse;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}