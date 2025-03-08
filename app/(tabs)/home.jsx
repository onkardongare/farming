import { View, Text, Image, ScrollView, Pressable, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { icons, images } from "../../constants";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "@/redux/slices/weatherSlice";

export default function HomeScreen() {

  const dispatch = useDispatch()
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const {user} = useSelector((state) => state.auth)
  const {loading, error, weather} = useSelector((state) => state.weather)

  useEffect(()=>{
    if(user){
      console.log("Fetching weather..."); // Debug log
      dispatch(fetchWeather({latitude:72.877426, longitude:19.076090}))
    }
  },[user])

  const tools = [
    { name: "Locate Farm", icon: images.map, router:'/(screens)/map'},
    { name: "Fertiliser Calculator", icon: images.calculator, router:'/(screens)/fertilizer' },
    { name: "Stores Near you", icon: images.store, router:'/(screens)/stores' },
    { name: "Digital Leaf Color Chart", icon: images.leaf, router:'/(screens)/colorChart' },
  ];

  const newsfeed = [{ image: images.news1 }, { image: images.news2 }];

  function closeMenu() {
    if (menuOpen) {
      setMenuOpen(false);
    }
  }

  return (
    // <TouchableWithoutFeedback onPress={closeMenu}>
      <SafeAreaView className="flex-1 relative">
        {/* Dim Background when Menu is Open */}
        {/* {menuOpen && <View className="absolute inset-0 bg-black opacity-80 z-30" />} */}

        <ScrollView className="bg-white p-4">
          {/* Header */}
          <View className="relative">
            <View className="flex-row justify-between items-center">
              <Text className="text-xl text-green-600 font-pbold">Welcome!</Text>
              <Pressable onPress={() => setMenuOpen(!menuOpen)}>
                <Image source={icons.menu} className="w-6 h-6" />
              </Pressable>
            </View>

            {/* Menu Options */}
            {menuOpen && (
              <View className="absolute right-0 mt-2 bg-blue-200 shadow-lg rounded-lg p-4 w-48 h-auto z-20 pb-10">
                <View className="flex-row justify-between">
                  <TouchableOpacity onPress={() => router.push("/you")}>
                    <Text className="p-2 text-lg">Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={closeMenu}>
                    <Image source={icons.next} className="w-10 h-10" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => router.push("/(screens)/weather")}>
                  <Text className="p-2 text-lg">Weather</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/settings")}>
                  <Text className="p-2 text-lg">Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("Logout")}>
                  <Text className="p-2 text-lg text-red-500">Logout</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Other Content */}
          <View className="mt-4">
            <Text className="text-lg font-pbold">Weather Information</Text>
            <View className="flex-row justify-between mt-2">
              
              {/* Weather Box */}
              <View className="bg-blue-100 p-3 rounded-lg w-1/2">
                <Text className="text-blue-800 font-pbold">Weather</Text>
                <ScrollView className="h-20">
                <TouchableOpacity onPress={() => router.push("/(screens)/weather")}>
                  
                  {/* <Text className="text-sm text-gray-600">
                    ☀️ Sunny, 30°C{"\n"}
                    💨 Wind: 10 km/h NE{"\n"}
                    🌧️ Rain: 10% chance
                  </Text> */}
                </TouchableOpacity>
                </ScrollView>
              </View>

              {/* Spraying Condition Box */}
              <View className="bg-green-100 p-3 rounded-lg w-1/2 ml-2">
                <Text className="text-green-800 font-pbold">Spraying Condition</Text>
                <ScrollView className="h-20">
                  <Text className="text-sm text-gray-600">
                    ✅ Suitable for spraying{"\n"}
                    🕒 Best: 6 AM - 10 AM{"\n"}
                    ❌ Avoid strong winds/rain
                  </Text>
                </ScrollView>
              </View>
              
            </View>
          </View>

          {/* Features Section */}
          <Text className="text-lg font-pbold mt-2 pt-3">Features</Text>
          <View className="flex-wrap flex-row gap-8 pt-3">
            {tools.map((tool, index) => (
              <TouchableOpacity key={index} onPress={() => router.push(tool.router)} activeOpacity={0.3} className="w-20 items-center">
                <Image source={tool.icon} className="w-12 h-12" />
                <Text className="text-xs text-center">{tool.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Banner */}
          <View className="mt-6 flex-row justify-between">
            <Text className="text-lg font-pbold">Government Scheme's</Text>
            <View className="flex-row">
              <Text className="text-blue-500">View all</Text>
              <Image source={icons.next} className="w-6 h-6" />
            </View>
          </View>
          <Image source={images.banner} className="w-full h-26 rounded-lg mt-3"/>

          {/* Newsfeed */}
          <View className="mt-6 flex-row justify-between">
            <Text className="text-lg font-pbold">Top News</Text>
            <View className="flex-row">
              <Text className="text-blue-500">View all</Text>
              <Image source={icons.next} className="w-6 h-6" />
            </View>
          </View>
          <View className="flex-row gap-3 mt-3 pb-6">
            {newsfeed.map((news, index) => (
              <Image key={index} source={news.image} className="w-40 h-20 rounded-lg" />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    // </TouchableWithoutFeedback>
  );
}
