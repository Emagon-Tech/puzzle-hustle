import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
} from "react-native";

import { SegmentedControls } from "react-native-radio-buttons";

import CategoriesModalComponent from "./CategoriesModal";

const options = ["Easy", "Medium", "Hard"];

const SinglePlayerMode = ({ navigation }) => {
  const [value, setValue] = useState(9);
  const [showcatmodal, setshowcatmodal] = useState(false);
  const setSelectedOption = (selectedOption) => {
    setValue(selectedOption);
  };
  const hidemodal = () => {
    setshowcatmodal(false);
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
      <View style={styles.container}>
        <Text style={{ fontSize: 20, marginBottom: 20, color: "white" }}>
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
        <TouchableOpacity
          style={styles.playButton}
          onPress={() =>
            navigation.navigate("categoryselection", { level: value })
          }
        >
          {/*setshowcatmodal(true)}>*/}
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Play
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  playButton: {
    backgroundColor: "white",
    height: 70,
    width: 200,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    marginTop: 20,
    shadowOffset: { width: 5, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.8,
    elevation: 4,
  },
});
export default SinglePlayerMode;
