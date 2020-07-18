import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("screen");

const OfflineModalComponent = (props) => {
  const { start } = props;
  const { back } = props;

  const [modalVisible, setModalVisible] = useState(true);
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
      marginTop: 22,
      backgroundColor: "#000000",
      opacity: 0.5,
    },
    modalView: {
      justifyContent: "center",
      alignItems: "center",
      height: height * 0.5,
      margin: 20,
      marginTop: height / 3 - height * 0.1,
      backgroundColor: "black",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      borderWidth: 20,
      borderColor: "#000000",
      shadowOpacity: 0.6,
      shadowRadius: 3.84,
      elevation: 5,
    },
    modalButton: {
      //backgroundColor: "silver",
      height: 50,
      width: 100,
      borderRadius: 20,
      margin: 20,
      //   borderWidth: 1,
      //   borderColor: "#07031a",
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
        //Alert.alert("Modal has been closed.");
      }}
    >
      <View style={{ opacity: 0.9 }}>
        <View style={styles.modalView}>
          <View style={{ height: height, width: width, position: "absolute" }}>
            <LottieView
              source={require("../assets/confetti-cannon.json")}
              autoPlay
              loop={true}
              speed={0.8}
            />
          </View>
          <View style={{ top: 150, width: "100%", position: "absolute" }}>
            <Text style={{ color: "white", fontSize: 22, textAlign: "center" }}>
              {" "}
              Keep Practicing
            </Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 30, color: "white" }}>
              Congratulations
            </Text>
          </View>
          <View
            style={{
              marginTop: 150,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "space-between",
            }}
          >
            <TouchableWithoutFeedback
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                back();
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Icon name="home" size={30} color="white" />
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Home
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                start();
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Icon name="repeat" size={30} color="white" />
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Play Again
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default OfflineModalComponent;
