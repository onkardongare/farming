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
  const { loading, error, weatherData, sprayingConditions } = useSelector((state) => state.weather);

  useEffect(()=>{
    if(user){
      console.log("Fetching weather..."); // Debug log
      console.log(user)
    }
  },[user])

  useEffect(()=>{
    if(user){
      console.log("Fetching weather..."); // Debug log
      dispatch(fetchWeather({latitude: user.location.latitude, longitude: user.location.longitude}))
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
  
  // Get the current hour
  const currentHour = new Date().getHours(); // Use local time instead of UTC
  
  // Find the current hour's spraying condition
  const currentCondition = sprayingConditions?.find(condition => {
    if (!condition.time) return false; // Ensure time exists
  
        // Extract the hour from the time string
        const conditionHour = parseInt(condition.time.split(":")[0], 10);
        console.log(`Checking condition: ${condition.time} => Hour: ${conditionHour}, Current: ${currentHour}`);
        if(conditionHour > currentHour){
          return true;
        }
        
        return conditionHour === currentHour;
  });
  const getStatusSymbol = (status) => {
    switch (status) {
        case "Good":
            return "✅"; 
        case "Moderate":
            return "⚠️"; 
        case "Not Suitable":
            return "❌";
        default:
            return "";
    }
  };
  const getTime = () => {
    if(currentHour < 12){
      return `${currentHour} AM : `;
    }
    else{
      return `${currentHour} PM : `;
    }
};
  
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
            <View className="flex-row justify-between mt-2 mr-1">  
              {/* Weather Box */}
              <View className="bg-green-100 p-3 rounded-lg w-1/2 mr-1">
               <TouchableOpacity onPress={() => router.push("/(screens)/weather")}>
                <Text className="text-green-800 font-pbold">Weather </Text>
                  {weatherData && weatherData.hourly?.length > 0 ? (
                    <View>
                      <View className="flex-row items-center">
                          <Image 
                            source={icons[weatherData.hourly[0].icon]} // Matching API response with local icons
                            className="h-6 w-6"
                          />
                          <Text className="text-sm text-gray-600 ml-2"> {weatherData.hourly[0].desc}, {weatherData.hourly[0].temp}</Text>
                      </View>
                      <View className="flex-row items-center mt-1">
                          <Image 
                            source={icons.air_speed} // Matching API response with local icons
                            className="h-6 w-6"
                          />
                          <Text className="text-sm text-gray-600 ml-2"> Wind: {weatherData.hourly[0].wind_speed} m/s</Text>
                      </View>
                      <View className="flex-row items-center mt-1">
                          <Image 
                            source={icons.humidity} // Matching API response with local icons
                            className="h-6 w-6"
                          />
                          <Text className="text-sm text-gray-600 ml-2"> Humidity: {weatherData.hourly[0].humidity}%</Text>
                      </View>
                    </View>                    
                  ) : (
                    <Text className="text-sm text-gray-600">Loading weather...</Text>
                  )}
                </TouchableOpacity>
              </View>

              {/* Spraying Condition Box */}
              <View className="bg-green-100 p-3 rounded-lg w-1/2">
                  <Text className="text-green-800 font-pbold">Spraying Condition</Text>
                      {currentCondition ? (
                        <View>
                            <View className="flex-row items-center mt-1">
                              <Text className="text-sm font-pbold text-gray-950 pt-1">
                                  {getTime()}
                              </Text>
                              <Text className="text-sm text-gray-600 pt-1">
                                 {getStatusSymbol(currentCondition.status)} 
                              </Text>
                              <Text className="text-sm text-gray-600 pt-1">
                                 {currentCondition.status }
                              </Text>
                            </View>
                            <View className="flex-row items-center mt-1">
                              <Text className="text-sm font-pbold text-gray-950 pt-1">
                                  Best :{' '}
                              </Text>
                              <Text className="text-sm text-gray-600 pt-1">
                                  6AM - 10AM
                              </Text>
                            </View>
                           <Text className="text-sm font-pbold text-gray-600 pt-1">
                             ❌ Avoid strong winds/rain
                           </Text>
                        </View>
                      ) : (
                        <Text className="text-sm text-gray-600">No data available</Text>
                      )}
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
