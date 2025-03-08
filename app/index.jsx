import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {images} from '../constants'
import { useEffect } from 'react';


const OnboardingScreen = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace("/features"); // Navigate to Features Screen
  };

  return (
    <View className="flex-1 items-center justify-center bg-green-100 p-6 pt-0">
      <View style={styles.imageContainer}>
        <Image
          source={images.first} // Replace with your image path
          style={styles.image}
        />
      </View>
      <Text className="text-2xl font-bold mb-4">Welcome to the Farming App! 🌱</Text>
      <Text className="text-center text-gray-700 mb-6">
        Learn about modern farming techniques and manage your polyhouse efficiently.
      </Text>
      <TouchableOpacity onPress={handleGetStarted} className="bg-green-500 px-6 py-3 rounded-lg">
        <Text className="text-white text-lg">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 250, // Adjust size as needed
    height: 250, // Adjust size as needed
    borderRadius: 125, // Half of width/height for a circle
    overflow: 'hidden', // Clip image to circle
    marginBottom: 20, // Space between image and text
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Or 'contain' depending on your needs
  },
});

export default OnboardingScreen;
