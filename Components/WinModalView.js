import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  Image,
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
  const { reward } = props;
  const [modalVisible, setModalVisible] = useState(true);
  const [registerModalVisibility, setRegisterModalVisibility] = useState(false);
  const [user, setUser] = useState({});
  const [msg, setMessage] = useState("");
  const [issignedup, setIsSignedUp] = useState(false);
  const [username, setUsername] = useState();
  const [usernameInput, setUsernameInput] = useState("");

  const storeUser = async (userjson) => {
    await AsyncStorage.setItem("CURRENT_USER", JSON.stringify(userjson));
  };
  const mergeUpdatedUser = async (updateduserjson) => {
    await AsyncStorage.mergeItem(
      "CURRENT_USER",
      JSON.stringify(updateduserjson)
    );
  };
  useEffect(() => {
    console.log("in useeffect of modal");
    getUser();
  }, []);
  const getUser = async () => {
    const CURRENT_USER = await AsyncStorage.getItem("CURRENT_USER");
    if (CURRENT_USER) {
      console.log(CURRENT_USER);
      setIsSignedUp(true);
      setUsername(CURRENT_USER.username);
      updateCoins();
    }
  };
  const registerUsername = async () => {
    let data = {
      method: "POST",
      mode: "same-origin",
      body: JSON.stringify({
        username: usernameInput,
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
        console.log("---------\n", response);
        if (response.error) {
          setMessage(response.error);
        } else {
          setMessage("Signed up Sucessfully as " + response.username);
          storeUser(response);
          setIsSignedUp(true);
          setRegisterModalVisibility(false);
          updateCoins();
        }
      })
      .catch((err) => console.log(err));
  };
  const updateCoins = async () => {
    const USER_JSON = await AsyncStorage.getItem("CURRENT_USER");
    const USER = JSON.parse(USER_JSON);
    let data = {
      method: "PUT",
      mode: "same-origin",
      body: JSON.stringify({
        addCoins: reward,
      }),
      headers: {
        Authorization: `Bearer ${USER.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        Connection: "keep-Alive",
      },
    };
    await fetch(`http://192.168.0.50:4000/users/${USER.id}`, data)
      .then((response) => response.json()) // promise
      .then((response) => {
        console.log("---------\n", response);
        if (response.error) {
          console.log("in response. message");
          setMessage(response.error);
        } else {
          console.log("coins in update function ", response.coins);
          let updateduser = user;
          updateduser.coins = response.coins;
          console.log(user);
          mergeUpdatedUser(updateduser);
        }
      })
      .catch((err) => console.log(err));
  };
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
        visible={registerModalVisibility}
        presentationStyle={"overFullScreen"}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
        }}
      >
        <View style={{ opacity: 1 }}>
          <View style={styles.regmodalView}>
            <View style={{ top: -100, left: 150 }}>
              <TouchableWithoutFeedback
                onPress={() => setRegisterModalVisibility(false)}
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
              onChangeText={(text) => setUsernameInput(text)}
              value={usernameInput}
            />
            <TouchableOpacity onPress={registerUsername}>
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
          <View
            style={{ height: 200, width: 200, position: "absolute", top: 75 }}
          >
            <LottieView
              source={require("../assets/piggy-bank.json")}
              autoPlay
              loop={true}
              speed={0.8}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 25, color: "white" }}>
              Puzzled Solved!!
            </Text>
            <Text style={{ fontSize: 22, color: "white", top: 20, left: 15 }}>
              Earned: +{reward}
            </Text>
            <Image
              source={require("../assets/coins.png")}
              style={{ height: 25, width: 25, left: 168, top: -10 }}
            />
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
                  setRegisterModalVisibility(true);
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
