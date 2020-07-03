import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import Modal from "react-native-modal";

import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("screen");
const ModelLoading = (props) => {
  const { showmodal } = props;
  const [modalVisible, setModalVisible] = useState(true);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      alignItems: "center",
      justifyContent: "center",
    },
    centeredView: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: "#ffffff",
      width: "100%",
      height: height / 4,
      borderRadius: 50,
    },
    modalView: {
      margin: 20,
      height: height,
      width: width,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.6,
      shadowRadius: 3.84,
      opacity: 0.8,
    },
  });
  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
      }}
      presentationStyle="overFullScreen"
    >
      <ImageBackground
        style={{
          height: height,
          width: width,
          margin: -20,
          position: "absolute",
        }}
        source={require("../img/background.png")}
      />
      <View style={styles.centeredView}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Please Be Patient
        </Text>
        <View
          style={{
            height: height / 3 - 10,
            width: width / 3 - 10,
            position: "absolute",
          }}
        >
          <LottieView
            source={require("../assets/dog-loading.json")}
            autoPlay
            loop
          />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 100 }}>
          Fetching data...
        </Text>
      </View>
    </Modal>
  );
};
export default ModelLoading;
