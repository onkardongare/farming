import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const ScreenLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  return (
    <>
      <Stack>
        <Stack.Screen
          name="map"
          options={{
            headerShown: false,
          }}
        />

        <Loader isLoading={loading} />
        <StatusBar backgroundColor="#161622" style="light" />
      </Stack>
    </>
  );
};

export default ScreenLayout;
