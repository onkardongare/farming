import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { images, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const OnboardingScreen = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace("/features"); // Navigate to Features Screen
  };

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <View className="flex-row pt-10 items-start justify-center">
        <Image source={icons.logo} className="w-11 h-11" />
        <Text className="text-2xl font-bold m-2 text-green-600">
          Organic Mitr!
        </Text>
      </View>
      <View className="flex-1 items-center pt-8 px-5">
        <View className="w-[200px] h-[200px] rounded-full overflow-hidden mb-[30px] items-center justify-center">
          <Image source={images.first} className="w-full h-full" resizeMode="cover" />
        </View>
        <Text className="text-2xl font-bold mb-4 text-center text-[#22c55e]">
          Welcome to the Organic Mitr! 🌱
        </Text>
        <Text className="text-center text-[#6b7280] mb-10 text-base leading-6">
          Learn about modern farming techniques and manage your organic farm efficiently.
        </Text>
        <TouchableOpacity onPress={handleGetStarted} className="bg-green-500 py-3 px-[30px] rounded-[8px]">
          <Text className="text-white text-lg font-semibold">Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
