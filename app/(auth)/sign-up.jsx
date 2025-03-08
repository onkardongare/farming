import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { registerUser } from "../../redux/slices/authSlice"; // Import register action
import { CustomButton, FormField } from "../../components";

const SignUp = () => {
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.auth); // Get state from Redux

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handle form submission
  const submit = () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    dispatch(registerUser(form));
  };

  // Navigate to home if registration is successful
  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [user]);

  // Show error message if registration fails
  useEffect(() => {
    if (error) {
      Alert.alert("Registration Error", error);
    }
  }, [error]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          {/* Logo */}
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

          {/* Signup Text */}
          <View className="flex-row self-start">
            <Text className="text-white text-2xl ml-3 pt-3 font-pbold">
              Signup to
            </Text>
            <Text className="text-yellow-300 text-2xl ml-2 pt-3 font-pbold">
              Lal Pari
            </Text>
          </View>

          {/* Form Fields */}
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

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
            secureTextEntry
          />

          {/* Submit Button */}
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={loading} // Use Redux state
          />

          {/* Redirect to Login */}
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
