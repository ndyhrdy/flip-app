import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import MainNavigator from "./components/MainNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
