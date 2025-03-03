import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const pages = [
  { 
    id: 1, 
    text: "Welcome to [App Name]! 🌱\nYour journey to organic farming starts here.", 
    subtext: "Grow naturally, thrive sustainably." 
  },
  { 
    id: 2, 
    text: "Track Your Crops 📈\nWatch your plants grow day by day.", 
    subtext: "Monitor progress with ease." 
  },
  { 
    id: 3, 
    text: "Learn & Connect 🌍\nMaster organic techniques and join our community.", 
    subtext: "Ready to plant your first seed?" 
  },
];

const OnboardingScreens = () => {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (index < pages.length - 1) {
      setIndex(index + 1);
    } else {
      router.replace("/(tabs)/home");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-[#F5F7F2]">
      {/* Main Heading */}
      <Text className="text-2xl font-bold text-[#2E7D32] text-center px-4 mb-2">
        {pages[index].text}
      </Text>

      {/* Subtext */}
      <Text className="text-base text-gray-600 text-center px-6 mb-6">
        {pages[index].subtext}
      </Text>

      {/* Progress Dots */}
      <View className="flex-row mb-8">
        {pages.map((page, i) => (
          <View
            key={page.id}
            className={`h-2 w-2 rounded-full mx-1 ${
              i === index ? "bg-[#2E7D32]" : "bg-gray-300"
            }`}
          />
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity
        onPress={handleNext}
        className="bg-[#4CAF50] px-6 py-3 rounded-full mb-4"
      >
        <Text className="text-white text-lg font-bold">
          {index === pages.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>

      {/* Skip Button */}
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-in")}
        className="bg-transparent border border-[#4CAF50] px-6 py-2 rounded-full"
      >
        <Text className="text-[#4CAF50] text-lg font-medium">Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreens;