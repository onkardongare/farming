import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { icons, images } from "../../constants";
import { registerUser } from "../../redux/slices/authSlice"; // Import register action
import { CustomButton, FormField } from "../../components";

const SignUp = () => {
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.auth); // Get state from Redux

  const [form, setForm] = useState({
    username: "",
    email: "",
    mobile: "",
    village: "",
    taluka: "",
    pincode: "",
    state: "",
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
          className="w-full flex justify-center h-full px-4"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          {/* Logo */}
          <View className="flex-row self-start">
            <Image
              source={icons.logo}
              className="w-[70px] h-[80px] mb-2 ml-2"
              resizeMode="contain"
            />
            <Text className="text-yellow-300 text-4xl ml-4 pt-8 font-pbold">
            Organic Mitr
            </Text>
          </View>

          {/* Signup Text */}
          <View className="flex-row self-start">
            <Text className="text-white text-lg ml-1 pt-1 font-pbold">
              Fill Below Inforamtion
            </Text>
          </View>

          {/* Form Fields */}
          <FormField
            title="Username *"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-3"
          />

          <FormField
            title="Email *"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-3"
            keyboardType="email-address"
          />

          <FormField
            title="Mobile No. *"
            value={form.mobile}
            handleChangeText={(e) => {
              const numericValue = e.replace(/[^0-9]/g, ' ').slice(0, 10); // Max 10 digits
              setForm({ ...form, mobile: numericValue });
            }}
            otherStyles="mt-3"
            keyboardType="phone-pad"
          />
          <FormField
            title="Pin Code *"
            value={form.pincode}
            handleChangeText={(e) => {
              const numericValue = e.replace(/[^0-9]/g, ' ').slice(0, 6); // Max 10 digits
              setForm({ ...form, pincode: numericValue });
            }}
            otherStyles="mt-3"
            keyboardType="phone-pad"
          />

          <FormField
            title="Village *"
            value={form.village}
            handleChangeText={(e) => setForm({ ...form, village: e })}
            otherStyles="mt-3"
          />

          <FormField
          title="Taluka *"
          value={form.taluka}
          handleChangeText={(e) => setForm({ ...form, taluka: e })}
          otherStyles="mt-3"
          />
          <FormField
            title="State *"
            value={form.state}
            handleChangeText={(e) => setForm({ ...form, state: e })}
            otherStyles="mt-3"
          />

          <FormField
            title="Password *"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-3"
            secureTextEntry
          />

          {/* Submit Button */}
          <CustomButton
            title="Submit"
            handlePress={submit}
            containerStyles="mt-7 mb-6"
            isLoading={loading} // Use Redux state
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
