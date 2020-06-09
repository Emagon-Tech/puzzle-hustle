import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
} from "react-native";

import { SegmentedControls } from "react-native-radio-buttons";
const options = ["Easy", "Medium", "Hard"];

const SinglePlayerMode = ({ navigation }) => {
  const [value, setValue] = useState(9);
  const setSelectedOption = (selectedOption) => {
    setValue(selectedOption);
  };
  return (
    <ImageBackground
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
      source={require("../img/background.png")}
    >
      <View
        style={{
          alignContent: "center",
          justifyContent: "center",
          marginTop: 400,
          marginLeft: 30,
        }}
      >
        <Text style={{ marginLeft: 70, fontSize: 20, marginBottom: 20 }}>
          Select Difficulty Level
        </Text>
        <SegmentedControls
          options={options}
          onSelection={setSelectedOption}
          selectedOption={value}
          containerStyle={{
            borderRadius: 25,
            width: 350,
          }}
        />
      </View>
      <View style={{ alignContent: "flex-end" }}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.navigate("GameScreen", { level: value })}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Play
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignContent: "flex-end" }}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.navigate("Models")}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Modal
          </Text>
        </TouchableOpacity>
      </View>
      <Text style>{value}</Text>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
  },
  button1: {
    backgroundColor: "white",
    height: 70,
    width: 200,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    marginTop: 20,
    marginLeft: 100,
    shadowOffset: { width: 5, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.8,
    elevation: 4,
  },
  radioText: {
    marginRight: 35,
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "500",
  },
  radioCircle: {
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: "#3740ff",
  },
  result: {
    marginTop: 20,
    color: "white",
    fontWeight: "600",
    backgroundColor: "#F3FBFE",
  },
});
export default SinglePlayerMode;
