import React, { useEffect, useContext, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Animated,
  View,
  AppState,
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import { SoundContext } from "./Context";

import Sound from "react-native-sound";

var SPRING_CONFIG = { tension: 1, friction: 3 };

const Home = ({ navigation }) => {
  let panP = new Animated.ValueXY();
  let panU = new Animated.ValueXY();
  let panZ2 = new Animated.ValueXY();
  let panE = new Animated.ValueXY();
  let panR = new Animated.ValueXY();
  let togglebutton = new Animated.Value(0);
  let lsound, rsound;
  const [username, setRegisteredUsername] = useState();
  const [issignedup, setIsSigneUp] = useState();
  const { state, dispatch } = useContext(SoundContext);
  state.puzzlesound.play();
  state.puzzlesound.setNumberOfLoops(-1);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    getuser();
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);
  const getuser = async () => {
    console.log("HERE");
    const CURRENT_USER = await AsyncStorage.getItem("CURRENT_USER");
    console.log(CURRENT_USER, "=========\n");
    if (CURRENT_USER) {
      setIsSigneUp(true);
      const userData = JSON.parse(CURRENT_USER);
      setRegisteredUsername(userData.username);
    } else {
      setIsSigneUp(false);
    }
  };
  const _handleAppStateChange = (nextAppState) => {
    console.log("state of in tiles", state.intiles);
    if (state.sound) {
      console.log("releasing sound");
      state.sound.release();
    }
    if (lsound) {
      console.log("releasing lsound");
      lsound.release();
    }
    if (state.puzzlesound) {
      state.puzzlesound.release();
    }
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("app is foreground");
      if (state.intiles) {
        rsound = new Sound(require("../assets/puzzlebg.mp3"), (error) => {
          if (error) {
            alert("audio error" + error);
            return;
          }

          rsound.play();
          rsound.setNumberOfLoops(-1);
          dispatch({ type: "update puzzlesound", payload: rsound });
        });
      } else {
        lsound = new Sound(require("../assets/puzzlebg.mp3"), (error) => {
          if (error) {
            alert("audio error" + error);
            return;
          }
          console.log("sound  loaded");
          lsound.play();
          lsound.setNumberOfLoops(-1);
          dispatch({ type: "update bgsound", payload: lsound });
        });
      }
    } else {
      console.log("app is in background");
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    // console.log("AppState", appState.current);
  };
  const animate = () => {
    Animated.sequence([
      Animated.spring(panP, {
        ...SPRING_CONFIG,
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }),
      Animated.spring(panU, {
        ...SPRING_CONFIG,
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }),
      Animated.spring(panZ2, {
        ...SPRING_CONFIG,
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }),
      Animated.spring(panE, {
        ...SPRING_CONFIG,
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }),
      Animated.spring(panR, {
        ...SPRING_CONFIG,
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }),
      Animated.spring(panU, {
        ...SPRING_CONFIG,
        toValue: { x: 0, y: 30 },
        useNativeDriver: false,
      }),
      Animated.spring(panZ2, {
        ...SPRING_CONFIG,
        toValue: { x: 0, y: -30 },
        useNativeDriver: false,
      }),
      Animated.spring(panP, {
        ...SPRING_CONFIG,
        toValue: { x: 0, y: -30 },
        useNativeDriver: false,
      }),
      Animated.spring(panU, {
        ...SPRING_CONFIG,
        toValue: { x: 60, y: 30 },
        useNativeDriver: false,
      }),
      Animated.spring(panP, {
        ...SPRING_CONFIG,
        toValue: { x: 30, y: -30 },
        useNativeDriver: false,
      }),
      Animated.spring(panE, {
        ...SPRING_CONFIG,
        toValue: { x: 0, y: -30 },
        useNativeDriver: false,
      }),
      Animated.spring(panZ2, {
        ...SPRING_CONFIG,
        toValue: { x: -90, y: -30 },
        useNativeDriver: false,
      }),
      Animated.spring(panR, {
        ...SPRING_CONFIG,
        toValue: { x: -30, y: 0 },
        useNativeDriver: false,
      }),
      Animated.spring(panP, {
        ...SPRING_CONFIG,
        toValue: { x: 30, y: 0 },
        useNativeDriver: false,
      }),
      Animated.spring(panE, {
        ...SPRING_CONFIG,
        toValue: { x: 30, y: -30 },
        useNativeDriver: false,
      }),
      Animated.spring(panU, {
        ...SPRING_CONFIG,
        toValue: { x: 60, y: 0 },
        useNativeDriver: false,
      }),
      Animated.spring(panE, {
        ...SPRING_CONFIG,
        toValue: { x: 30, y: 0 },
        useNativeDriver: false,
      }),
      Animated.spring(panZ2, {
        ...SPRING_CONFIG,
        toValue: { x: -90, y: 0 },
        useNativeDriver: false,
      }),
    ]).start(() => animate());
  };
  useEffect(() => {
    animate();
  });
  // useEffect(() => {
  //   togglebutton = !togglebutton;
  // }, [togglebutton]);

  return (
    <ImageBackground
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
      source={require("../img/background.png")}
    >
      <View>
        <View style={styles.animcontainer}>
          <Animated.View
            style={{
              transform: panP.getTranslateTransform(),
              height: 30,
              width: 30,
              backgroundColor: "red",
            }}
          >
            <Text style={styles.Textin}>P</Text>
          </Animated.View>
          <Animated.View
            style={{
              transform: panU.getTranslateTransform(),
              height: 30,
              width: 30,
              backgroundColor: "red",
            }}
          >
            <Text style={styles.Textin}>U</Text>
          </Animated.View>
          <Animated.View
            style={{
              height: 30,
              width: 30,
              backgroundColor: "red",
            }}
          >
            <Text style={styles.Textin}>Z</Text>
          </Animated.View>
          <Animated.View
            style={{
              transform: panZ2.getTranslateTransform(),
              height: 30,
              width: 30,
              backgroundColor: "red",
            }}
          >
            <Text style={styles.Textin}>Z</Text>
          </Animated.View>
          <Animated.View
            style={{
              height: 30,
              width: 30,
              backgroundColor: "red",
            }}
          >
            <Text style={styles.Textin}>L</Text>
          </Animated.View>
          <Animated.View
            style={{
              transform: panE.getTranslateTransform(),
              height: 30,
              width: 30,
              backgroundColor: "red",
            }}
          >
            <Text style={styles.Textin}>E</Text>
          </Animated.View>
          <Animated.View
            style={{
              transform: panR.getTranslateTransform(),
              height: 30,
              width: 30,
              backgroundColor: "red",
            }}
          >
            <Text style={styles.Textin}>R</Text>
          </Animated.View>
        </View>

        <View style={styles.container1}>
          <Animated.View
            style={{
              transform: panP.getTranslateTransform(),
              height: 30,
              width: 30,
              backgroundColor: "red",
            }}
          >
            <Text style={styles.Textin}>H</Text>
          </Animated.View>
          <Animated.View
            style={{
              transform: panU.getTranslateTransform(),
              height: 30,
              width: 30,
              backgroundColor: "red",
            }}
          >
            <Text style={styles.Textin}>U</Text>
          </Animated.View>
          <Animated.View
            style={{
              height: 30,
              width: 30,
              backgroundColor: "red",
            }}
          >
            <Text style={styles.Textin}>Z</Text>
          </Animated.View>
          <Animated.View
            style={{
              transform: panZ2.getTranslateTransform(),
              height: 30,
              width: 30,
              backgroundColor: "red",
            }}
          >
            <Text style={styles.Textin}>Z</Text>
          </Animated.View>
          <Animated.View
            style={{
              height: 30,
              width: 30,
              backgroundColor: "red",
            }}
          >
            <Text style={styles.Textin}>L</Text>
          </Animated.View>
          <Animated.View
            style={{
              transform: panE.getTranslateTransform(),
              height: 30,
              width: 30,
              backgroundColor: "red",
            }}
          >
            <Text style={styles.Textin}>E</Text>
          </Animated.View>
          <Animated.View
            style={{
              transform: panR.getTranslateTransform(),
              height: 30,
              width: 30,
              backgroundColor: "red",
            }}
          >
            <Text style={styles.Textin}>R</Text>
          </Animated.View>
        </View>
      </View>
      <View>
        {issignedup && (
          <Text style={{ color: "white", textAlign: "center" }}>
            Welcome back, {username}!
          </Text>
        )}
      </View>
      <Animated.View
        style={{
          marginTop: togglebutton.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 50],
          }),
        }}
      >
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.navigate("imagePicker")}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Play
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button1: {
    backgroundColor: "white",
    height: 70,
    width: 200,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
    // marginVertical: 5,
    marginLeft: 100,
    marginBottom: 200,
    shadowOffset: { width: 5, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    elevation: 3,
  },
  animcontainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 300,
  },
  container1: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 50,
    marginTop: 30,
  },
  Textin: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
    marginBottom: 12,
  },
});
export default Home;
