import React from "react";
import { Text, View, Image, TouchableWithoutFeedback } from "react-native";

export const Tile = (props) => {
  const { hole, imageSrc, index, width, height } = props;
  const handleClick = () => {
    console.log("...........", index, hole);
    if (index !== hole) {
      props.onClick(index);
    }
  };
  const style = {
    backgroundColor: "green",
    ...(index === hole ? { opacity: 0 } : {}),
    width,
    margin: 5,
    height,
  };
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={style}>
        <Image
          style={{ height: height, width: width }}
          source={{ uri: imageSrc }}
        />
        <Text>{index}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
