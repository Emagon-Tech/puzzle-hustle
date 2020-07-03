import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  TouchableHighlight,
  Modal,
  Dimensions,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");
export default SettingsModalComponent = (props) => {
  console.log("in settings modal");
  const { hide } = props;
  const { lobby } = props;
  const [modalVisible, setModalVisible] = useState(true);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#d9ebe9",
      alignItems: "center",
      justifyContent: "center",
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#000000",
      opacity: 0.5,
    },
    modalView: {
      position: "absolute",
      height: height * 0.6,
      margin: 20,
      marginTop: height / 4,
      backgroundColor: "#ffffff",
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.8,
      shadowRadius: 3.84,
      borderColor: "black",
      borderWidth: 2,
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
  });
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      presentationStyle={"overFullScreen"}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View
        style={{
          backgroundColor: "red",
          height: 40,
          width: 40,
          borderRadius: 20,
          marginTop: height / 4 - 20,
          marginLeft: width - 40,
          zIndex: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            hide();
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 25,
            }}
          >
            X
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.modalView}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              height: 100,
              width: "100%",
              position: "absolute",
              alignItems: "center",
              marginVertical: 50,
            }}
          >
            <LottieView
              source={require("../assets/gears.json")}
              autoPlay
              loop={true}
              speed={1.2}
            />
          </View>
          <View
            style={{
              backgroundColor: "#d9ebe9",
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 30, textAlign: "center" }}>Settings</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 500 / 5,
            width: "100%",
          }}
        >
          <View
            style={{
              marginLeft: 25,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <View>
              <Image
                source={require("../assets/dp.jpg")}
                style={{ height: 100, width: 100, borderRadius: 50 }}
              />
              <Text style={{ fontSize: 25 }}>Angela</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                marginVertical: 20,
                marginLeft: 40,
              }}
            >
              <Text style={{ fontFamily: "bold" }}>Puzzles Solved: 15</Text>
              <Text>Level: 5</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            margin: 30,
            alignItems: "center",
            justifyContent: "space-evenly",
            backgroundColor: "#d9ebe9",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>Sound</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            alignContent: "space-between",
          }}
        >
          <TouchableHighlight
            style={{
              backgroundColor: "#d9ebe9",
              height: 50,
              width: 80,
              borderRadius: 20,
              margin: 20,
            }}
            onPress={() => {
              hide();
              lobby.navigate("Home");
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                margin: 10,
              }}
            >
              Lobby
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              backgroundColor: "#d9ebe9",
              height: 50,
              width: 80,
              borderRadius: 20,
              margin: 20,
            }}
            onPress={() => {
              hide();
            }}
          >
            <Text
              style={{
                textAlign: "center",
                margin: 10,
                fontWeight: "bold",
              }}
            >
              Resume
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};
