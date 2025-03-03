import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

const OnboardingScreen = () => {
  const router = useRouter();

  const handleGetStarted = async () => {
    router.replace("/features"); // Navigate to Home Screen
  };

  return (
    <View className="flex-1 items-center justify-center bg-green-100 p-6">
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

export default OnboardingScreen;
