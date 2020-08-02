import React from "react";
import Tiles from "./Tiles";
import { ImageBackground } from "react-native";

let timeGiven = 0;
let gridsize = 0;
const Game = ({ route, navigation }) => {
  const { level } = route.params;
  const { category } = route.params;
  const { reward } = route.params;
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
  const { goBack } = navigation;

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
        <Tiles
          rows={gridsize}
          cols={gridsize}
          width={300}
          height={300}
          onBack={goBack}
          category={category}
          reward={reward}
        />
      </ImageBackground>
    </>
  );
};

export default Game;
