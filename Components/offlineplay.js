import React, { useState, useEffect, useRef } from "react";

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  AppState,
  Alert,
  ImageBackground,
} from "react-native";
const offlinejson = require("../assets/offlineimage.json");
import LottieView from "lottie-react-native";

import _ from "lodash";

import Sound from "react-native-sound";

Sound.setCategory("Playback");

import { Tile } from "./Tile";

import OfflineModalComponent from "./offlinewinmodal";

import ModalHint from "./HintModal";

import Stopwatch from "./StopWatch";

import { SoundContext } from "./Context";

import { Transitioning, Transition } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

var steps;

var hintimage = [];

const OfflinePlay = ({ route, navigation }) => {
  console.log("rendering component");
  const { level } = route.params;
  let gridsize = 3;
  switch (level) {
    case "Easy":
      gridsize = 3;
      break;
    case "Medium":
      gridsize = 4;
      break;
    case "Hard":
      gridsize = 5;
      break;

    default:
      console.log("Some PRblem in route props" + level);
      break;
  }
  const rows = gridsize;
  const cols = gridsize;
  const [splitImages, setSplitImages] = useState([]);
  const [hole, setHole] = useState();
  const [shownums, setshownums] = useState(false);
  const [solved, setsolved] = useState(false);
  const [showstart, setshowstart] = useState(false);
  const [imgmodal, setimgmodal] = useState(false);
  const [stopwatchStart, setstopwatchStart] = useState(false);
  const [disablebutton, setdisablebutton] = useState(false);
  const [restart, setrestart] = useState(false);
  const pieceWidth = 400 / gridsize;
  const pieceHeight = 400 / gridsize;
  const { state, dispatch } = React.useContext(SoundContext);
  const N = rows;
  const ref = useRef();
  let lsound;

  const transition = (
    <Transition.Together>
      <Transition.Change interpolation="easeInOut" durationMs={1000} />
    </Transition.Together>
  );

  state.puzzlesound.play();
  state.puzzlesound.setNumberOfLoops(-1);

  useEffect(() => {
    //const offlinejson = require("../assets/offlineimage.json");
    console.log("in offline play file");
    console.log("dispatching upadte inttiles");
    dispatch({ type: "set intiles to true" });
    getImageFromServer();
    setTimeout(() => {
      console.log("timming out");
    }, 1000);

    //setSplitImages(offlinejson[rows]["datalist"]);
    return () => {
      steps = 0;
      if (lsound) {
        lsound.release();
      }
    };
  }, []);

  const goBack = () => {
    navigation.navigate("Home");
  };

  //TODO:Get image from server with gridsize for splitting

  const getImageFromServer = () => {
    setshowstart(false);
    setrestart(false);
    setHole(999);
    setsolved(false);
    steps = 0;
    console.log("=================================");
    console.log(offlinejson[gridsize][0]["datalist"]);
    offlinejson[gridsize][0]["datalist"].forEach((element, index) => {
      element.id = index;
    });
    setSplitImages(offlinejson[gridsize][0]["datalist"]);
    setshowstart(true);
    hintimage = offlinejson[gridsize][0]["datalist"].slice();
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

  //issolvable from react
  function isSolvable(numbers) {
    let product = 1;
    console.log("numbers lenght is ", numbers.length);
    for (let i = 1, l = N * N - 1; i <= l; i++) {
      for (let j = i + 1, m = l + 1; j <= m; j++) {
        product *= (numbers[i - 1]["id"] - numbers[j - 1]["id"]) / (i - j);
      }
    }
    return Math.round(product) === 1;
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
        setshownums(false);
        setrestart(false);
        ref.current.animateNextTransition();
        setTimeout(() => {
          setsolved(true);
        }, 1200);
        setHole(999);
        setstopwatchStart(false);
      }
    }
  };

  //Shuffle the images array
  const shuffleImages = (images) => {
    setdisablebutton(true);
    let randindex = 2;
    let holehere = hole;
    let images1 = splitImages.slice();
    let tmp;
    console.log("hole is ", hole);
    if (hole === undefined || hole === 999) {
      holehere = N * N - 1;
    }
    do {
      randindex = images1.findIndex((obj) => obj.id === holehere);
      tmp = images1.splice(randindex, 1);
      images1 = _.shuffle(images1);
      images1 = images1.concat(tmp);
    } while (isSolved(images1) || !isSolvable(images1));

    setTimeout(() => {
      setdisablebutton(false);
    }, 1000);
    ref.current.animateNextTransition();
    setSplitImages(images1);
  };

  const handleTileClick = (index) => {
    setsolved(false);
    swapTiles(index);
    steps = steps + 1;
  };

  const handleButtonClick = () => {
    setHole(rows * cols - 1);
    setrestart(true);
    steps = 0;
    if (restart) {
      setstopwatchStart(false);
    }
    setTimeout(() => {
      setstopwatchStart(true);
    }, 300);

    console.log("start=true");
    shuffleImages(splitImages);
  };
  const gridview = {
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <ImageBackground
      source={require("../img/background.png")}
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      {imgmodal && (
        <ModalHint gs={rows} imgurl={hintimage} showmodal={hideimgmodal} />
      )}
      {solved && (
        <OfflineModalComponent start={handleButtonClick} back={goBack} />
      )}
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Text style={{ color: "white", fontSize: 30 }}>Steps: {steps}</Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={{ color: "white", fontSize: 30 }}>Time:</Text>
            <Stopwatch secs start={stopwatchStart} reset={!stopwatchStart} />
          </View>
        </View>
        <Transitioning.View ref={ref} transition={transition} style={gridview}>
          {splitImages.map((item, index) => (
            <Tile
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
                if (!disablebutton) {
                  handleButtonClick();
                }
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
    </ImageBackground>
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
export default OfflinePlay;
