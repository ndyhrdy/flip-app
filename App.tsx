import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Lato_400Regular,
  Lato_700Bold,
  useFonts,
} from "@expo-google-fonts/lato";

import MainNavigator from "./components/MainNavigator";

const App = () => {
  const [fontsReady] = useFonts({ Lato_400Regular, Lato_700Bold });

  if (!fontsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
