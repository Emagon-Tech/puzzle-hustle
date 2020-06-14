import React from "react";
import { Text, View, Image, TouchableWithoutFeedback } from "react-native";

export const Tile = (props) => {
  const { hole, number, index, width, height } = props;
  const handleClick = () => {
    if (number.id !== hole) {
      props.onClick(index);
    }
  };
  const style = {
    backgroundColor: "black",
    ...(number.id === hole ? { opacity: 0 } : {}),
    width,
    margin: 1,
  };
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={style}>
        <Image
          style={{ height: height, width: width }}
          source={{ uri: number.dataURI }}
        />
        {/* <Text>{number.id}</Text> */}
      </View>
    </TouchableWithoutFeedback>
  );
};
