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

import SortableGrid from "react-native-sortable-grid";

import Timer from "./Timer";

let stepsCount = 0;
let timeGiven = 0;
let gridsize = 0;
let blockheight = 0;
let shuffledimages = [];
const Game = ({ route, navigation }) => {
  const { level } = route.params;
  switch (level) {
    case "Easy":
      gridsize = 3;
      blockheight = 138;
      timeGiven = 10;
      break;
    case "Medium":
      gridsize = 4;
      blockheight = 104;
      timeGiven = 20;
      break;
    case "Hard":
      gridsize = 5;
      blockheight = 84;
      timeGiven = 25;
      break;

    default:
      console.log("Some PRblem in route props" + level);
      break;
  }
  useEffect(() => {
    console.log("in useEffect()");
    // fetching1();
  }, []);

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

  const fetching1 = async () => {
    console.log("Get Image Splits called");
    await fetch("http://192.168.0.231:5000/image_slicer")
      .then((response) => response.json())
      .then((res) => {
        console.log("===============================================");
        console.log("===============================================");
        console.log("===============================================");

        res.datalist.forEach((element, index) => {
          element.id = index;
          console.log(element.width, element.height, index, element.id);
        });

        setimg(res.datalist);
        shuffledimages = shufflingArray(res.datalist);
      });
  };

  const isSolved = (itemOrderArray) => {
    let bo = true;
    console.log("img", img);
    console.log("Iorder", itemOrderArray);
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
              fetching1();
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
        <Tiles rows={3} cols={3} hole={5} width={300} height={300} />
        {/* <SortableGrid
          blockTransitionDuration={50}
          activeBlockCenteringDuration={200}
          itemsPerRow={gridsize}
          dragActivationTreshold={50}
          onDragRelease={(itemOrder) => {
            stepsCount = stepsCount + 1;
            isWinner(itemOrder["itemOrder"]);
          }}
          onDragStart={() => console.log("Some block is being dragged now!")}
        >
          {shuffledimages.map((item, index) => (
            <View key={index} onTap={() => console.log(index)}>
              <Image
                style={{ height: blockheight, width: width / gridsize }}
                source={{ uri: item.dataURI }}
              />
            </View>
          ))}
        </SortableGrid> */}
        <Timer handlefinish={setreset} timegiven={timeGiven} />
      </ImageBackground>
    </>
  );
};

export default Game;

//height:84, width: width / gs ==> grid size:5
//height:138, width: width / 3 ==> gs:3
//height:103, width: width / gridsize ==> gs:4
