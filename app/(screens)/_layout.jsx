import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Loader } from "../../components";

const ScreenLayout = () => {

  return (
    <>
      <Stack>
        <Stack.Screen
          name="map"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="weather"
          options={{
            headerShown: false,
          }}
        />

        {/* <Loader isLoading={loading} /> */}
        <StatusBar backgroundColor="#161622" style="light" />
      </Stack>
    </>
  );
};

export default ScreenLayout;
