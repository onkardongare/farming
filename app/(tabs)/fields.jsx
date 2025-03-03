import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { MapPin, Edit3 } from "lucide-react-native";
import {icons, images} from '../../constants'
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FieldDetails() {
  const router = useRouter();

 function handlePress(){
   console.log("something");
   router.push("/(screens)/map")
 }

  const fields = [
    {crop:"Tomato", location:"Nashik Division, Pangari, Maharashtra", uri:"https://via.placeholder.com/400x200", area:"0.6 acre"},
    {crop:"Cabbage", location:"Nashik Division, Pangari, Maharashtra", uri:"https://via.placeholder.com/400x200", area:"0.6 acre"},
    {crop:"Cucumber", location:"Nashik Division, Pangari, Maharashtra", uri:"https://via.placeholder.com/400x200", area:"0.6 acre"}
  ]

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-4 bg-green-500 min-h-screen">
        <Text className="text-xl text-gray-950 font-pbold">Your Farms</Text>
          {/* Map Image & Details */}
          {fields.map((field, index) =>(
            <View key={index} className="bg-white mt-3 border-b-2 rounded-lg overflow-hidden shadow-sm">
              <Image
                source={{ uri: "https://via.placeholder.com/400x200" }} // Replace with actual map image
                className="w-full h-40"
              />
              <View className="p-3">
                {/* Location */}
                <View className="flex-row items-center">
                  <MapPin size={18} color="gray" />
                  <Text className="text-gray-600 ml-2">
                    Nashik Division, Pangari, Maharashtra
                  </Text>
                </View>

                {/* Field Details */}
                <View className="flex-row justify-between mt-3">
                  <View className="flex-row items-center">
                    <Image
                      source={images.area_icon} // Replace with actual icon
                      className="w-6 h-6"
                    />
                    <Text className="ml-2 text-gray-700">0.62 acre</Text>
                  </View>
                  <TouchableOpacity>
                    <Edit3 size={18} color="gray" />
                  </TouchableOpacity>
                </View>

                {/* Crop Type */}
                <View className="flex-row items-center mt-2">
                  <Image
                    source={images.crop_icon} // Replace with actual icon
                    className="w-6 h-6"
                  />
                  <Text className="ml-2 text-gray-700">Tomato</Text>
                </View>
              </View>
            </View>
          ))}

          {/* Add Field */}
          <TouchableOpacity onPress = {handlePress} className="bg-white mt-4 p-3 border-2 rounded-lg shadow-sm items-center justify-centerr"
                style={{ borderColor: "blue", borderStyle: "dashed", borderWidth: 2}}>
            <Text className="text-3xl text-blue-700">+</Text>
            <Text className="text-lg font-semibold text-blue-600 mt-1">Add Field</Text>
          </TouchableOpacity>


          {/* Fertilizer Plan */}
          <View className="bg-white mt-4 p-3 rounded-lg shadow-sm">
            <Text className="text-lg font-semibold">Fertiliser plan</Text>
            <View className="flex-row items-center mt-2">
              <Image
                source={images.fertilizer_icon} // Replace with actual image
                className="w-14 h-14"
              />
              <View className="ml-3 flex-1">
                <Text className="text-black font-semibold">Know the right plan</Text>
                <Text className="text-gray-600 text-sm">
                  Improve your yield with a personalised fertiliser plan for your
                  field.
                </Text>
              </View>
            </View>
            <TouchableOpacity className="bg-blue-500 p-2 rounded-lg mt-3">
              <Text className="text-white text-center font-semibold">Make a plan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
