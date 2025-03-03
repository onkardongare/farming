import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { Calendar, ThumbsUp } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const posts = [
  {
    id: "1",
    image: "https://via.placeholder.com/400x200", // Replace with actual image URL
    date: "26 Jan 2025",
    likes: 34,
    title: "Happy Republic Day!",
    description:
      "May the peace reign everyday in every part of the country. Yara FarmCare® wishes you a very happy republic day.",
    author: "Yara FarmCare",
  },
  {
    id: "2",
    image: "https://via.placeholder.com/400x200", // Replace with actual image URL
    date: "14 Jan 2025",
    likes: 22,
    title: "Happy Makar Sankranti",
    description:
      "May this Makar Sankranti bring joy, peace, and prosperity to everyone.",
    author: "Yara FarmCare",
  },
];

export default function Organic() {
  return (
    <SafeAreaView>
      <View className="p-4 bg-gray-100 min-h-screen">
            <Text className="text-xl font-semibold mb-3">Newsfeed</Text>
    
            <FlatList
              data={posts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="bg-white rounded-lg shadow-sm mb-4">
                  {/* Post Image */}
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-40 rounded-t-lg"
                  />
    
                  {/* Post Content */}
                  <View className="p-3">
                    {/* Date & Likes */}
                    <View className="flex-row justify-between items-center text-gray-500">
                      <View className="flex-row items-center">
                        <Calendar size={16} color="gray" />
                        <Text className="ml-1 text-gray-500">{item.date}</Text>
                      </View>
                      <View className="flex-row items-center">
                        <ThumbsUp size={16} color="gray" />
                        <Text className="ml-1 text-gray-500">{item.likes} Likes</Text>
                      </View>
                    </View>
    
                    {/* Title & Description */}
                    <Text className="text-lg font-semibold mt-2">{item.title}</Text>
                    <Text className="text-gray-600 mt-1">{item.description}</Text>
    
                    {/* Author & Read More */}
                    <View className="flex-row justify-between items-center mt-2">
                      <Text className="text-gray-500">By {item.author}</Text>
                      <TouchableOpacity>
                        <Text className="text-blue-500 font-semibold">Read More</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
      </View>
    </SafeAreaView>
  );
}