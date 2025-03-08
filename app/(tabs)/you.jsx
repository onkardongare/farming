import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { Pencil, ShoppingBag, ScanBarcode, Info, ShieldCheck, Settings } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {images} from "../../constants"

const menuItems = [
  { id: "3", title: "About Yara", icon: <Info size={20} color="black" /> },
  { id: "4", title: "Privacy and legal", icon: <ShieldCheck size={20} color="black" /> },
  { id: "5", title: "Settings", icon: <Settings size={20} color="black" /> },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView>
      <View className="bg-green-500 min-h-screen p-4">
        <Text className="text-xl font-semibold mb-3">Profile</Text>
          {/* Profile Header */}
          <View className="bg-white rounded-lg shadow-sm p-4 items-center relative">
            <Image
              source={ images.kisan } // Replace with actual profile picture
              className="w-20 h-20 rounded-full mb-2"
            />
            <Text className="text-lg font-semibold">+91-XXXXXXXXXX</Text>

            {/* Edit Icon */}
            <TouchableOpacity className="absolute top-4 right-4">
              <Pencil size={20} color="blue" />
            </TouchableOpacity>
          </View>

          {/* Membership Card */}
          <View className="bg-blue-100 p-4 rounded-lg mt-4">
            <View className="flex-row items-center">
              <Image
                source={{ uri: "https://via.placeholder.com/50" }} // Replace with membership icon
                className="w-12 h-12 rounded-full"
              />
              <View className="ml-3 flex-1">
                <Text className="font-semibold text-blue-700">You are not a Safal Kisan Member yet</Text>
                <Text className="text-gray-600 text-sm">
                  Get quality guidance from Yara, and win exciting discounts.
                </Text>
              </View>
            </View>
            <TouchableOpacity className="bg-blue-600 p-2 rounded-lg mt-3">
              <Text className="text-white text-center font-semibold">Buy membership</Text>
            </TouchableOpacity>
          </View>

          {/* Menu List */}
          <FlatList
            data={menuItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity className="bg-white p-4 rounded-lg flex-row items-center mt-2">
                {item.icon}
                <Text className="ml-3 text-lg font-medium">{item.title}</Text>
              </TouchableOpacity>
            )}
          />
      </View>
    </SafeAreaView>
  );
}
