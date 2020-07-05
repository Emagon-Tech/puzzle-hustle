import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Components/HomeScreen";
import Game from "./Components/Game";
import LottieView from "lottie-react-native";
import SinglePlayerMode from "./Components/SinglePlayer";

import BoardScr from "./Components/Board";
import { View, Button } from "react-native";

import SettingsModalView from "./Components/SettingsModal";
import ImagePicker from "./Components/ImagePicker";
var navigator;
const Stack = createStackNavigator();
const SplashScreen = ({ navigation }) => {
  navigator = navigation;
  setTimeout(() => {
    navigation.replace("Home");
  }, 3000);
  return (
    <View
      style={{
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <LottieView
        source={require("./assets/fastpuzzle.json")}
        autoPlay
        loop={false}
        speed={2}
      />
    </View>
  );
};
function MyStack() {
  const [showmodal, setshowmodal] = React.useState(false);
  const hidemodal = () => {
    setshowmodal(!showmodal);
  };
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              title: "",
              headerShown: false,
            }}
          />
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
              headerTitle: "HELLO",
              headerRight: () => (
                <Button
                  onPress={() => {
                    hidemodal();
                  }}
                  title="|||"
                  color="#00cc00"
                />
              ),
            }}
          />
          <Stack.Screen
            name="imagePicker"
            component={ImagePicker}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "rgba(52, 52, 52, 0.1)",
              },
              headerShown: false,
            }}
          />
          <Stack.Screen name="BoardScreen" component={BoardScr} />
        </Stack.Navigator>
      </NavigationContainer>
      {showmodal && <SettingsModalView hide={hidemodal} lobby={navigator} />}
    </>
  );
}
export default MyStack;
