import { View, Text, Image, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images} from "../../constants"
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const tools = [
    { name: "Locate Farm", icon: images.map },
    { name: "Fertiliser Calculator", icon: images.calculator },
    { name: "Stores Near you", icon: images.store },
    { name: "Digital Leaf Color Chart", icon: images.leaf },
  ];

  const newsfeed = [
    { image: images.news1 },
    { image: images.news2 },
  ];


  function handlePress(tool){
    router.push("/(tabs)/map")
  }

  return (
  <SafeAreaView>
    <ScrollView className="bg-white p-4">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <Text className="text-xl text-green-600 font-pbold">Welcome!</Text>
        <Image source= {icons.menu} className="w-6 h-6" />
      </View>

      {/* Weather Section */}
      <View className="mt-4">
        <Text className="text-lg font-pbold">Weather Information</Text>
        <View className="flex-row justify-between mt-2">
          
          {/* Weather Box */}
          <View className="bg-blue-100 p-3 rounded-lg w-1/2">
            <Text className="text-blue-800 font-pbold">Weather</Text>
            <ScrollView className="h-20">
              <Text className="text-sm text-gray-600">
                ☀️ Sunny, 30°C{"\n"}
                💨 Wind: 10 km/h NE{"\n"}
                🌧️ Rain: 10% chance
              </Text>
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

      {/* Tools Section */}
      <Text className="text-lg font-pbold mt-2 pt-3">Features</Text>
      <View className="flex-wrap flex-row gap-8 pt-3">
        {tools.map((tool, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(tool)} activeOpacity={0.3} className="w-20 items-center">
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
      <Image source={images.banner} className="w-full h-24 rounded-lg mt-3" />

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
  );
}
