import React from "react";
import { StyleSheet, View } from "react-native";

import Game from "./Game";

const BoardScr = ({ route, navigation }) => {
  let timer = 0;
  const { level } = route.params;
  setTimeout(() => {
    timer = timer + 1;
  }, 1000);
  return (
    <>
      <View>
        <Stopwatch
          laps
          msecs
          start={this.state.stopwatchStart}
          reset={this.state.stopwatchReset}
          options={options}
          startTime={0}
          getTime={this.getFormattedTime}
        />
        <Game level={level} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timer: {
    alignContent: "flex-end",
  },
});
export default BoardScr;
