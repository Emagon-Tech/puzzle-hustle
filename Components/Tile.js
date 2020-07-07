import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";

export const Tile = (props) => {
  const { hole, number, index, width, height, shownums } = props;
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
        </Animated.View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};
