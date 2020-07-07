import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";

import _ from "lodash";

import { Tile } from "./Tile";

import ModalComponent from "./WinModalView";

import ModalHint from "./HintModal";

import Stopwatch from "./StopWatch";

import { Transitioning, Transition } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

var steps = 0;
var hintimage = [];
const Tiles = (props) => {
  const { rows, cols, category } = props;
  const [splitImages, setSplitImages] = useState([]);
  const [hole, setHole] = useState();
  const [shownums, setshownums] = useState(false);
  const [solved, setsolved] = useState(false);
  const [showstart, setshowstart] = useState(false);
  const [imgmodal, setimgmodal] = useState(false);
  const [stopwatchStart, setstopwatchStart] = useState(false);
  const [stopwatchReset, setstopwatchReset] = useState(false);
  const [restart, setrestart] = useState(false);
  const pieceWidth = width / cols;
  const pieceHeight = width / rows;

  const N = rows;

  const ref = useRef();

  const transition = (
    <Transition.Together>
      <Transition.Change interpolation="linear" durationMs={1000} />
    </Transition.Together>
  );
  const goBack = () => {
    props.onBack("Game");
  };
  useEffect(() => {
    getImageFromServer();
    return () => {
      steps = 0;
    };
  }, []);

  //TODO:Get image from server with gridsize for splitting
  //https://slicer12.herokuapp.com
  const getImageFromServer = async () => {
    await fetch(
      `https://slicer12.herokuapp.com/image_slicer?gs=${rows}&cat=${category}`
    )
      .then((response) => response.json())
      .then((res) => {
        setsolved(false);
        res.datalist.forEach((element, index) => {
          element.id = index;
        });
        setSplitImages(res.datalist);
        hintimage = res.datalist.slice();
        setshowstart(true);
        steps = 0;
      })
      .catch((error) => {
        console.log("Unable to fetch images------------\n\n\n", error);
      });
  };

  //checks whether puzzle is solved
  const isSolved = (images) => {
    for (let i = 0; i < images.length; i++) {
      if (i !== images[i]["id"]) {
        return false;
      }
    }
    return true;
  };
  function hideimgmodal() {
    setimgmodal(false);
  }

  //Get inversion Count
  function getInvCount(arr) {
    let inv_count = 0;
    for (let i = 0; i < N * N - 1; i++) {
      for (let j = i + 1; j < N * N; j++) {
        // count pairs(i, j) such that i appears
        // before j, but i > j.
        if (arr[j]["id"] && arr[i]["id"] && arr[i]["id"] > arr[j]["id"])
          inv_count++;
      }
    }
    console.log(inv_count);
    return inv_count;
  }

  // find Position of blank from bottom
  function findXPosition(puzzle) {
    // start from bottom-right corner of matrix
    for (let i = N * N - 1; i >= 0; i--)
      if (puzzle[i]["id"] === hole) return N * N - i;
  }

  // This function returns true if given
  // instance of N*N - 1 puzzle is solvable
  function isSolvable(puzzle) {
    // Count inversions in given puzzle
    let invCount = getInvCount(puzzle);

    // If grid is odd, return true if inversion
    // count is even.
    if (N & 1) return !(invCount & 1);
    // grid is even
    else {
      let pos = findXPosition(puzzle);
      if (pos & 1) return !(invCount & 1);
      else return invCount & 1;
    }
  }

  // Get the row/col pair from a linear index.
  function getMatrixPosition(index, rows, cols) {
    return {
      row: Math.floor(index / cols),
      col: index % cols,
    };
  }

  //Checks whether tiles can be swapped
  function canSwap(src, dest, rows, cols) {
    const { row: srcRow, col: srcCol } = getMatrixPosition(src, rows, cols);
    const { row: destRow, col: destCol } = getMatrixPosition(dest, rows, cols);
    return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
  }

  //Swap Tiles
  function swap(splitImages, src, dest) {
    splitImages = _.clone(splitImages);
    [splitImages[src], splitImages[dest]] = [
      splitImages[dest],
      splitImages[src],
    ];
    return splitImages;
  }

  //Swap Tiles
  const swapTiles = (tileIndex) => {
    const holeIndex = splitImages.findIndex((obj) => obj.id === hole);
    if (canSwap(tileIndex, holeIndex, rows, cols)) {
      const newSplitImages = swap(splitImages, tileIndex, holeIndex);
      setSplitImages(newSplitImages);
      if (isSolved(newSplitImages)) {
        setrestart(false);
        setsolved(true);
        ref.current.animateNextTransition();
        setHole(999);
        setstopwatchStart(false);
        setstopwatchReset(true);
      }
    }
  };

  //Shuffle the images array
  const shuffleImages = (images) => {
    let randindex = 2;
    let tmp = {};
    let images1 = splitImages.slice();
    do {
      for (var i = images1.length - 2; i > 0; i--) {
        randindex = Math.floor(Math.random() * (i + 1));
        tmp = images1[i];
        images1[i] = images1[randindex];
        images1[randindex] = tmp;
      }
    } while (isSolved(images1) || !isSolvable(images1));
    images1.forEach((element) => {
      console.log(element.id);
    });
    ref.current.animateNextTransition();
    setSplitImages(images1);
  };

  const handleTileClick = (index) => {
    swapTiles(index);
    steps = steps + 1;
  };

  const handleButtonClick = () => {
    setHole(rows * cols - 1);
    shuffleImages(splitImages);
    if (restart == true) {
      setstopwatchStart(false);
      setstopwatchReset(true);
      setstopwatchStart(true);
    }
    setstopwatchReset(false);
    setstopwatchStart(true);
  };
  const gridview = {
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      {imgmodal && (
        <ModalHint gs={rows} imgurl={hintimage} showmodal={hideimgmodal} />
      )}
      {solved && (
        <ModalComponent
          start={handleButtonClick}
          back={goBack}
          nextpuzzle={getImageFromServer}
        />
      )}
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: width,
          }}
        >
          <Text style={{ color: "white", fontSize: 30 }}>Steps: {steps}</Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={{ color: "white", fontSize: 30 }}>Time:</Text>
            <Stopwatch secs start={stopwatchStart} reset={stopwatchReset} />
          </View>
        </View>
        <Transitioning.View ref={ref} transition={transition} style={gridview}>
          {splitImages.map((item, index) => (
            <Tile
              {...props}
              key={item.id}
              hole={hole}
              index={index}
              number={item}
              width={pieceWidth}
              height={pieceHeight}
              onClick={handleTileClick}
              shownums={shownums}
              solved={solved}
            />
          ))}
          {splitImages.length == 0 && (
            <>
              <Text style={{ fontWeight: "bold" }}>
                Fetching your puzzle ...
              </Text>

              <View
                style={{
                  height: height / 3,
                  width: width / 3,
                }}
              >
                <LottieView
                  source={require("../assets/dog-loading.json")}
                  autoPlay
                  loop
                />
              </View>
            </>
          )}
        </Transitioning.View>

        <View
          style={{
            width: "100%",
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => {
              setimgmodal(true);
            }}
          >
            <Text style={{ fontSize: 18 }}>Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => {
              setshownums(!shownums);
            }}
          >
            <Text style={{ fontSize: 18 }}>Help</Text>
          </TouchableOpacity>
          {showstart && (
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => {
                setrestart(true);
                handleButtonClick();
              }}
            >
              {restart ? (
                <Text style={{ fontSize: 18 }}>Restart</Text>
              ) : (
                <Text style={{ fontSize: 18 }}>Start</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
  tilesStyle: {
    position: "relative",
  },
  playButton: {
    backgroundColor: "white",
    height: 50,
    width: 100,
    color: "black",
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.05,
  },
});
export default Tiles;
