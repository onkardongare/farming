import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import {useDispatch, useSelector } from 'react-redux'
import {loginUser} from "../../redux/slices/authSlice";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";


const SignIn = () => {
  const dispatch = useDispatch();
  const {loading, error, user} = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const userData = await dispatch(loginUser({ email: form.email, password: form.password })).unwrap();
      console.log("User logged in:", userData);
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Error", error.message || "Something went wrong.");
    } 
  };

  //Redirect if user is logged in
  useEffect(()=>{
    if(user){
      console.log("nothing")
      Alert.alert("Success", "User signed in successfully");
      router.replace("/home")
    }
  },[user]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <View className="flex-row self-start">
            <Image
              source={images.logo_bg}
              className="w-[70px] h-[80px] mb-2 ml-2"
              resizeMode="contain"
            />
            <Text className="text-yellow-300 text-4xl ml-4 pt-8 font-pbold">
              Lal Pari
            </Text>
          </View>

          <View className="flex-row self-start ">
            <Text className="text-white text-2xl ml-3 pt-3 font-pbold">
              Sign In to
            </Text>
            <Text className="text-yellow-300 text-2xl ml-2 pt-3 font-pbold">
              Lal Pari
            </Text>
          </View>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={loading}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
