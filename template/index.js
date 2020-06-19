import React from "react";
require("react-native").unstable_enableLogBox();
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { HomeStackScreen } from "./src/navigation";
import { Store } from "./src/store/store";
import { name as appName } from "./app.json";

const hermes = global.HermesInternal;

export const App = () => {
    return (
        <NavigationContainer>
        <Store>
        <HomeStackScreen />
        </Store>
        </NavigationContainer>
);
};

AppRegistry.registerComponent(appName, () => App);
