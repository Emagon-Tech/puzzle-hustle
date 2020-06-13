import React, { useState, useEffect } from "react";
import Tiles from "./Tiles";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Alert,
  ImageBackground,
} from "react-native";

import Timer from "./Timer";

let stepsCount = 0;
let timeGiven = 0;
let gridsize = 0;
const Game = ({ route, navigation }) => {
  const { level } = route.params;
  switch (level) {
    case "Easy":
      gridsize = 3;
      timeGiven = 10;
      break;
    case "Medium":
      gridsize = 4;
      timeGiven = 20;
      break;
    case "Hard":
      gridsize = 5;
      timeGiven = 25;
      break;

    default:
      console.log("Some PRblem in route props" + level);
      break;
  }
  useEffect(() => {
    // fetchSplitImages();
  }, []);

  const { goBack } = navigation;

  let range = [...Array(gridsize * gridsize).keys()];

  const [img, setimg] = useState();
  const [reset, setreset] = useState(false);
  const { height, width } = Dimensions.get("window");

  const shufflingArray = (images) => {
    let randindex = 2;
    let tmp = {};
    for (var i = images.length - 1; i > 0; i--) {
      randindex = Math.floor(Math.random() * (i + 1));
      tmp = images[i];
      images[i] = images[randindex];
      images[randindex] = tmp;
    }
    return images;
  };

  const fetchSplitImages = async () => {
    await fetch("http://192.168.0.231:5000/image_slicer")
      .then((response) => response.json())
      .then((res) => {
        res.datalist.forEach((element, index) => {
          element.id = index;
        });

        setimg(res.datalist);
        shuffledimages = shufflingArray(res.datalist);
      });
  };

  const isSolved = (itemOrderArray) => {
    let bo = true;
    for (let i = 0; i < itemOrderArray.length; i++) {
      if (!(i == img[itemOrderArray[i]["key"]]["id"])) {
        bo = false;
      }
    }
    return bo;
  };

  const isWinner = (itemOrderArray) => {
    if (isSolved(itemOrderArray)) {
      Alert.alert(
        "Congratulations!Continue to the next puzzle?",
        "Number of Counts: " + stepsCount + " Time Taken: ",
        [
          {
            text: "Yes",
            onPress: () => {
              fetchSplitImages();
            },
          },
          {
            text: "No",
            onPress: () => console.log("No Pressed"),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const handlingtimerfinish = () => {
    Alert.alert(
      "OOPS!",
      "Time UP",
      [
        {
          text: "Restart",
          onPress: () => {
            setreset(true);
          },
        },
        {
          text: "Home",
          onPress: () => navigation.navigate("SinglePlayerScreen"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      alignItems: "center",
      justifyContent: "center",
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
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
      elevation: 5,
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
    <>
      <ImageBackground
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        source={require("../img/background.png")}
      >
        <Tiles rows={3} cols={3} width={300} height={300} onBack={goBack} />
      </ImageBackground>
    </>
  );
};

export default Game;
