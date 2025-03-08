import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Leaf, BarChart2, Users } from "lucide-react-native";
import { images } from "../constants";

const pages = [
  {
    id: 1,
    title: "Welcome to GreenHarvest! 🌱",
    text: "Your journey to organic farming starts here.",
    subtext: "Grow naturally, thrive sustainably.",
    icon: Leaf,
    image: images.slide1,
  },
  {
    id: 2,
    title: "Track Your Crops 📈",
    text: "Watch your plants grow day by day.",
    subtext: "Monitor progress with ease.",
    icon: BarChart2,
    image: images.slide2,
  },
  {
    id: 3,
    title: "Learn & Connect 🌍",
    text: "Master organic techniques and join our community.",
    subtext: "Ready to plant your first seed?",
    icon: Users,
    image: images.slide3,
  },
];

const { width } = Dimensions.get("window");

export default function OnboardingScreens() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const scrollViewRef = useRef(null);

  const handleNext = () => {
    if (index < pages.length - 1) {
      setIndex(index + 1);
      scrollViewRef.current?.scrollTo({ x: width * (index + 1), animated: true });
    } else {
      router.replace("/home");
    }
  };

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / width);
    setIndex(newIndex);
  };

  return (
    <View className="flex-1 bg-green-100">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={200}
        contentContainerStyle={{ width: width * pages.length }}
      >
        {pages.map((page, i) => (
          <View key={page.id} className="w-full" style={{ width: width }}>
            <View className="flex-1 items-center justify-center p-4">
              <View className="w-full max-w-md items-center">
                <View className="absolute top-0 right-0 opacity-10">
                  <Leaf size={100} color="green" />
                </View>
                <View className="bg-white rounded-2xl p-4 items-center shadow-lg">
                  <Image source={page.image} className="w-64 h-64 object-contain rounded-xl" />
                  <View className="flex-row items-center mb-2">
                    <View className="w-10 h-10 bg-green-200 rounded-full items-center justify-center">
                      <page.icon size={20} color="green" />
                    </View>
                    <Text className="text-2xl font-bold text-green-700 ml-2">
                      {page.title}
                    </Text>
                  </View>
                  <Text className="text-lg text-gray-700 text-center mb-1">
                    {page.text}
                  </Text>
                  <Text className="text-sm text-gray-500 italic text-center mb-5">
                    {page.subtext}
                  </Text>
                  <View className="flex-row justify-center mb-3">
                    {pages.map((_, dotIndex) => (
                      <View
                        key={dotIndex}
                        className={`w-${
                          dotIndex === index ? "4" : "2"
                        } h-2 rounded-full bg-${
                          dotIndex === index ? "green-600" : "gray-300"
                        } mx-1`}
                      />
                    ))}
                  </View>
                  <TouchableOpacity
                    onPress={handleNext}
                    className="bg-green-600 p-3 rounded-xl w-44 items-center "
                  >
                    <Text className="text-white text-lg font-bold">
                      {index === pages.length - 1 ? "Get Started" : "Next"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => router.push("/sign-in")}
                    className="p-3 rounded-xl w-44 items-center"
                  >
                    <Text className="text-blue-500 text-lg">Skip</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}