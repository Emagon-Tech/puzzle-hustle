import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  BackgroundImage,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Animated,
} from "react-native";

export const Tile = (props) => {
  const [pan, setpan] = useState(new Animated.ValueXY(0));
  const { hole, number, index, width, height, shownums } = props;

  function getMatrixPosition(index, rows, cols) {
    return {
      row: Math.floor(index / cols),
      col: index % cols,
    };
  }

  function getVisualPosition({ row, col }, width, height) {
    return {
      x: col * width,
      y: row * height,
    };
  }

  const handleClick = () => {
    if (number.id !== hole) {
      props.onClick(index);
    }
  };

  const style = {
    backgroundColor: "black",
    ...(number.id === hole ? { opacity: 0 } : {}),
    width,
    height,
    borderwidth: 2,
  };
  return (
    <Animated.View>
      <TouchableWithoutFeedback onPress={handleClick}>
        <Animated.View style={style}>
          {number.dataURI && (
            <Animated.Image
              style={{
                flex: 1,
                height: height,
                width: width,
              }}
              source={{
                uri: number.dataURI,
                cache: "force-cache",
              }}
            />
          )}
          {shownums && (
            <Animated.View
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                backgroundColor: "white",
                marginVertical: height - 20,
                marginLeft: width - 20,
                opacity: 0.8,
              }}
            >
              <Animated.Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {number.id}
              </Animated.Text>
            </Animated.View>
          )}
          {/* </Image> */}
        </Animated.View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};
