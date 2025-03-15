import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { icons } from '@/constants';
import { useDispatch, useSelector} from "react-redux";

const WeatherForecast = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, weatherData, sprayingConditions } = useSelector((state) => state.weather);
  const {user } = useSelector((state) => state.auth);

    return (
        <SafeAreaView className="flex-1 p-3 bg-yellow-500">
            {weatherData?
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="flex-row justify-between items-center mb-4">
                    <TouchableOpacity onPress={() => { router.replace("/home") }}>
                        <Image source={icons.home} className="w-6 h-6"/>
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold">{user? user.village: "India"}</Text>
                </View>
                <View className="flex-row justify-between p-4 bg-gray-200 rounded-lg mb-4">
                    <Text>TODAY  {weatherData.todayHigh}°C / {weatherData.todayLow}°C</Text>
                </View>
                <View className="mt-2">
                    {weatherData.daily.map((day, index) => (
                        <View key={index} className="flex-row justify-between p-3 bg-gray-50 rounded-lg mb-2">
                            <Text>{day.day}</Text>
                            <Image source={icons[day.icon]} className="w-8 h-8"/>
                            <Text>{day.high}°C - {day.low}°C</Text>
                        </View>
                    ))}
                </View>
                <Text className="mt-5 text-lg font-bold">Details</Text>
                <View className="mt-2 p-3 flex-row bg-gray-200 rounded-lg mb-4">
                    {weatherData.details.map((detail, index) => (
                        <View key={index} className="flex-1 items-center mr-4">
                            <Image source={icons[detail.icon]} className="w-8 h-8"/>
                            <Text>{detail.quantity}{detail.unit}</Text>
                            <Text>{detail.name}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>:
            <Text className="font-sans text-lg">loading...</Text>
            }
        </SafeAreaView>
    );
};

export default WeatherForecast;
   