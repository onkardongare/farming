import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const WeatherForecast = () => {
  const router = useRouter()
  const forecastData = {
    location: 'Akole',
    todayHigh: 36,
    todayLow: 19,
    sunrise: '06:48',
    sunset: '18:38',
    hourly: [
      { time: '23:00', temp: 27, icon: 'moon-outline' },
      { time: '00:00', temp: 26, icon: 'moon-outline' },
      { time: '01:00', temp: 25, icon: 'moon-outline' },
      { time: '02:00', temp: 24, icon: 'moon-outline' },
      { time: '03:00', temp: 22, icon: 'moon-outline' },
      { time: '04:00', temp: 21, icon: 'cloud-outline' },
      { time: '05:00', temp: 21, icon: 'moon-outline' },
    ],
    details: [
      { name: 'Feels like', quantity: 27, unit:'°C', icon: 'moon-outline' },
      { name: 'Humidity', quantity: 45, unit:'%', icon: 'moon-outline' },
      { name: 'Force', quantity: 1, unit:'NW', icon: 'moon-outline' },
      { name: 'Air Pressure', quantity: 1013, unit:'hPa', icon: 'moon-outline' },
    ],
    daily: [
      { date: new Date(), day: 'Tomorrow', high: 36, low: 16, icon: 'weather-partly-cloudy' },
      { date: new Date(Date.now() + 86400000), day: 'Thu', high: 36, low: 15, icon: 'weather-fog' },
      { date: new Date(Date.now() + 2 * 86400000), day: 'Fri', high: 36, low: 16, icon: 'weather-fog' },
      { date: new Date(Date.now() + 3 * 86400000), day: 'Sat', high: 37, low: 17, icon: 'weather-fog' },
      { date: new Date(Date.now() + 4 * 86400000), day: 'Sun', high: 35, low: 20, icon: 'weather-partly-cloudy' },
      { date: new Date(Date.now() + 5 * 86400000), day: 'Mon', high: 39, low: 21, icon: 'weather-partly-cloudy' },
      { date: new Date(Date.now() + 6 * 86400000), day: 'Tue', high: 39, low: 22, icon: 'thermometer-high' },
    ],
  };

  return (
    <SafeAreaView className="flex-1 p-3 bg-yellow-500">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold">{forecastData.location}</Text>
          <TouchableOpacity onPress={()=>{router.replace("/home")}} className="flex-row space-x-4">
            <MaterialCommunityIcons name="home-city-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between p-4 bg-gray-200 rounded-lg mb-4">
          <Text>TODAY {forecastData.todayHigh}°C / {forecastData.todayLow}°C</Text>
          <Text>🌄 {forecastData.sunrise} 🌇 {forecastData.sunset}</Text>
        </View>

        <ScrollView horizontal className="mt-2 p-3 bg-gray-200 rounded-lg mb-4">
          {forecastData.hourly.map((hour, index) => (
            <View key={index} className="items-center mr-4">
              <Text>{hour.temp}°C</Text>
              <Ionicons name={hour.icon} size={24} color="black" />
              <Text>{hour.time}</Text>
            </View>
          ))}
        </ScrollView>

        <View className="mt-2">
          {forecastData.daily.map((day, index) => (
            <View key={index} className="flex-row justify-between p-3 bg-gray-50 rounded-lg mb-2">
              <View className="flex-row justify-between">
                <Text>{format(day.date, 'MM/dd')}</Text>
                <Text className="pl-2">{day.day}</Text>
              </View>
              <View className="flex-row justify-between pl-5">
                <MaterialCommunityIcons name={day.icon} size={24} color="black" />
                <Text className="ml-7">{day.high} - {day.low}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text className="mt-5 text-lg font-bold">Details</Text>
        <View horizontal className="mt-2 p-3 flex-row bg-gray-200 rounded-lg mb-4">
          {forecastData.details.map((detail, index) => (
            <View key={index} className="flex-1 items-center mr-4">
              <Ionicons name={detail.icon} size={24} color="black" />
              <Text>{detail.quantity}{detail.unit}</Text>
              <Text>{detail.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WeatherForecast;
