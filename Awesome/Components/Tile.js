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
    <Animated.View style={{ transform: pan.getTranslateTransform() }}>
      <TouchableWithoutFeedback onPress={handleClick}>
        <View style={style}>
          {number.dataURI && (
            <Image
              style={{ height: height, width: width, position: "absolute" }}
              source={{
                uri: number.dataURI,
                cache: "force-cache",
              }}
            />
          )}
          {shownums && (
            <View
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
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {number.id}
              </Text>
            </View>
          )}
          {/* </Image> */}
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};
