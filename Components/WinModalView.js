import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import Icon from "react-native-vector-icons/FontAwesome";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("screen");
const ModalComponent = (props) => {
  const { start } = props;
  const { back } = props;
  const { nextpuzzle } = props;
  const { netstat } = props;
  const [modalVisible, setModalVisible] = useState(true);
  const [regmodalvisible, setregmodalvisibile] = useState(false);
  const [value, onChangeText] = useState();
  const [user, setuser] = useState({});
  const [msg, setmsg] = useState("");
  const [issignedup, setissignedup] = useState(false);
  const [username, setusername] = useState();
  const storeuser = async (userjson) => {
    await AsyncStorage.setItem("current_user", JSON.stringify(userjson));
  };
  useEffect(() => {
    console.log("in useeffect of modal");
    getuser();
  }, []);
  const getuser = async () => {
    const current_user = await AsyncStorage.getItem("current_user");
    if (current_user) {
      console.log(current_user);
      setissignedup(true);
      setusername(current_user.username);
    }
  };
  const registerusername = async () => {
    let data = {
      method: "POST",
      mode: "same-origin",
      body: JSON.stringify({
        username: value,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Connection: "keep-Alive",
      },
    };
    await fetch("http://192.168.0.50:4000/users/register", data)
      .then((response) => response.json()) // promise
      .then((response) => {
        if (response.message) {
          setmsg(response.message);
        } else {
          setuser(response);
          setmsg("Signed up Sucessfully as" + response.username);
          storeuser(response);
          setissignedup(true);
        }
      })
      .catch((err) => console.log(err));
  };
  // await fetch('http://localhost:4000/users/register',{method:"POST"})
  // .then((res)=>{console.log(res)})
  // .catch((err)=>{console.log(err)})

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
    regmodalView: {
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={regmodalvisible}
        presentationStyle={"overFullScreen"}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
        }}
      >
        <View style={{ opacity: 1 }}>
          <View style={styles.regmodalView}>
            <View style={{ top: -100, left: 150 }}>
              <TouchableWithoutFeedback
                onPress={() => setregmodalvisibile(false)}
              >
                <Icon name="close" size={30} color="white" />
              </TouchableWithoutFeedback>
            </View>
            <Text style={{ color: "white", top: -50 }}>{msg}</Text>
            <Text style={{ color: "white", top: -10 }}>
              Enter a Unique Username
            </Text>
            <TextInput
              style={{
                height: 40,
                width: 200,
                borderColor: "gray",
                borderWidth: 1,
                backgroundColor: "white",
              }}
              onChangeText={(text) => onChangeText(text)}
              value={value}
            />
            <TouchableOpacity onPress={registerusername}>
              <View
                style={{
                  backgroundColor: "white",
                  height: 50,
                  width: 100,
                  borderRadius: 20,
                  top: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    alignItems: "center",
                    top: 10,
                    fontSize: 18,
                  }}
                >
                  Submit
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ opacity: 0.9 }}>
        <View style={styles.modalView}>
          <View style={{ height: 500, width: 700, position: "absolute" }}>
            <LottieView
              source={require("../assets/coin.json")}
              autoPlay
              loop={false}
              speed={0.8}
            />
          </View>
          <View style={{ height: height, width: width, position: "absolute" }}>
            <LottieView
              source={require("../assets/confetti-cannon.json")}
              autoPlay
              loop={true}
              speed={0.8}
            />
          </View>
          <View style={{ height: 200, width: 200, position: "absolute" }}>
            <LottieView
              source={require("../assets/piggy-bank.json")}
              autoPlay
              loop={true}
              speed={0.8}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 25, color: "white" }}>
              Congratulations {username}
            </Text>
            <Text style={{ fontSize: 25, color: "white" }}>
              Coins Earned: 100
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
            {netstat && (
              <TouchableWithoutFeedback
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  nextpuzzle();
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Icon name="forward" size={30} color="white" />
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Solve Next
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
          {!issignedup && (
            <View style={{ top: 10 }}>
              <Text style={{ color: "white" }}>
                your progress might not be saved.
              </Text>
              <TouchableWithoutFeedback
                onPress={() => {
                  setregmodalvisibile(true);
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: 90,
                    height: 20,
                    alignItems: "center",
                    left: 60,
                    borderRadius: 10,
                    top: 5,
                  }}
                >
                  <Text style={{ color: "black" }}>Save it Here</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
