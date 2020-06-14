import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Components/HomeScreen";
import Game from "./Components/Game";

import SinglePlayerMode from "./Components/SinglePlayer";
import Modelnamed from "./Components/modaling";
import BoardScr from "./Components/Board";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "rgba(52, 52, 52, 0.1)",
            },
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GameScreen"
          component={Game}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SinglePlayerScreen"
          options={{
            headerShown: false,
          }}
          component={SinglePlayerMode}
        />
        <Stack.Screen name="Models" component={Modelnamed} />
        <Stack.Screen name="BoardScreen" component={BoardScr} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MyStack;
