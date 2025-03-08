import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {Image, Text, View} from "react-native";

import { icons } from "../../constants";
import { Loader } from "../../components";

const TabIcon = ({icon, color, name, focused}) => {
  return(
    <View className = "items-center justify-center gap-2 space-y-1 w-60 pt-4">
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-regular"} text-xs`}
        style={{color: color}}
      >
        {name}
      </Text>
    </View>
  )
}

const TabLayout = () => {

  // if (!loading && !isLogged) return <Redirect href= "sign-in" />;

  return(
  <>
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: "#FFA001",
      tabBarInactiveTintColor: "#CDCDE0",
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#161622",
        borderTopWidth: 1,
        borderTopColor: "#232533",
        height: 55,
      },
    }}
    >
      <Tabs.Screen
        name = "home"
        options = {{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({color, focused}) =>(
            <TabIcon
              icon={icons.home}
              color = {color}
              name = "Home"
              focused = {focused}
            />
          )
        }}
      />
      <Tabs.Screen
        name = "fields"
        options = {{
          title: "Your Fields",
          headerShown: false,
          tabBarIcon: ({color, focused}) =>(
            <TabIcon
              icon = {icons.crop}
              color = {color}
              name = "Your Fields"
              focused={ focused}
            />
          )
        }}
      />
      <Tabs.Screen
        name = "organic"
        options = {{
          title: "Organic",
          headerShown: false,
          tabBarIcon: ({color, focused}) =>(
            <TabIcon
              icon={icons.organic}
              color = {color}
              name = "Organic"
              focused = {focused}
            />
          )
        }}
      />
      <Tabs.Screen
        name = "news"
        options = {{
          title: "News",
          headerShown: false,
          tabBarIcon: ({color, focused}) =>(
            <TabIcon
              icon = {icons.news}
              color = {color}
              name = "News"
              focused={ focused}
            />
          )
        }}
      />
      <Tabs.Screen
        name = "you"
        options = {{
          title: "You",
          headerShown: false,
          tabBarIcon: ({color, focused}) =>(
            <TabIcon
              icon = {icons.profile}
              color = {color}
              name = "You"
              focused={ focused}
            />
          )
        }}
      />
    </Tabs>
    <StatusBar backgroundColor="#161622" style="light" />
    </>  
  )
}

export default TabLayout;