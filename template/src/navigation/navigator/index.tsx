import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import StartupScreen from "../../screens/StartupScreen";

const HomeStack = createStackNavigator();
export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      headerMode={"none"}
      keyboardHandlingEnabled={true}
      screenOptions={(props) => ({
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      })}
    >
      <HomeStack.Screen
        name="Startup"
        component={StartupScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};
