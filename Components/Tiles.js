import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import _, { stubArray } from "lodash";
import { Tile } from "./Tile";

const Tiles = (props) => {
  const { rows, cols, width, height } = props;
  const [splitImages, setSplitImages] = useState([]);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [hole, setHole] = useState();
  const pieceWidth = Math.round(width / cols);
  const pieceHeight = Math.round(height / rows);
  const goBack = () => {
    props.onBack("Game");
  };
  useEffect(() => {
    getImageFromServer();
  }, []);

  const getImageFromServer = async () => {
    await fetch("http://192.168.0.231:5000/image_slicer")
      .then((response) => response.json())
      .then((res) => {
        res.datalist.forEach((element, index) => {
          element.id = index;
        });

        setSplitImages(res.datalist);
      });
  };

  // function shuffle(numbers, hole, rows, cols) {
  //   do {
  //     numbers = _.shuffle(_.without(numbers, hole)).concat(hole);
  //   } while (isSolved(numbers) || !isSolvable(numbers, rows, cols));
  //   return numbers;
  // }

  const isSolved = (images) => {
    // for (let i = 0; i < images.length; i++) {
    //   // if (i == images[i]["id"]) {
    //   //   return true;
    //   // }
    //   // if (i == img[images[i]["key"]]["id"]) {
    //   //   return true;
    //   // }
    // }
    return false;
  };

  // function isSolved(numbers) {
  //   for (let i = 0, l = numbers.length; i < l; i++) {
  //     if (numbers[i] !== i) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }
  // function isSolvable(numbers, rows, cols) {
  //   let product = 1;
  //   for (let i = 1, l = rows * cols - 1; i <= l; i++) {
  //     for (let j = i + 1, m = l + 1; j <= m; j++) {
  //       product *= (numbers[i - 1] - numbers[j - 1]) / (i - j);
  //     }
  //   }
  //   return Math.round(product) === 1;
  // }
  // Get the row/col pair from a linear index.
  function getMatrixPosition(index, rows, cols) {
    return {
      row: Math.floor(index / cols),
      col: index % cols,
    };
  }

  function canSwap(src, dest, rows, cols) {
    const { row: srcRow, col: srcCol } = getMatrixPosition(src, rows, cols);
    const { row: destRow, col: destCol } = getMatrixPosition(dest, rows, cols);
    return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
  }

  function swap(splitImages, src, dest) {
    splitImages = _.clone(splitImages);
    [splitImages[src], splitImages[dest]] = [
      splitImages[dest],
      splitImages[src],
    ];
    return splitImages;
  }

  // const shuffleTiles = () => {
  //   console.log(hole, "--First hole before change");

  //   console.log(hole, "--shuffleTiles");
  //   shuffleImages(splitImages);
  // };

  const swapTiles = (tileIndex) => {
    const holeIndex = splitImages.findIndex((obj) => obj.id === hole);
    if (canSwap(tileIndex, holeIndex, rows, cols)) {
      const newSplitImages = swap(splitImages, tileIndex, holeIndex);
      setSplitImages(newSplitImages);
    }
  };

  const shuffleImages = (images) => {
    let randindex = 2;
    let tmp = {};
    for (var i = images.length - 2; i > 0; i--) {
      randindex = Math.floor(Math.random() * (i + 1));
      tmp = images[i];
      images[i] = images[randindex];
      images[randindex] = tmp;
    }
    if (isSolved(images)) {
      // shuffleImages(images);
    }
    setShuffledImages(images);
    setSplitImages(images);
  };

  const handleTileClick = (index) => {
    swapTiles(index);
  };

  const handleButtonClick = () => {
    // shuffleTiles();
    setHole(rows * cols - 1);
    shuffleImages(splitImages);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={splitImages}
        renderItem={({ item, index }) => (
          <Tile
            {...props}
            hole={hole}
            index={index}
            number={item}
            key={item.id}
            width={pieceWidth}
            height={pieceHeight}
            onClick={handleTileClick}
          />
        )}
        extraData={shuffledImages}
        numColumns={cols}
        keyExtractor={(item, index) => item.id}
      />

      {shuffledImages.length <= 0 && (
        <TouchableOpacity style={styles.playButton} onPress={handleButtonClick}>
          <Text style={{ fontSize: 18 }}>Start</Text>
        </TouchableOpacity>
      )}

      {shuffledImages.length > 0 && (
        <TouchableOpacity style={styles.playButton} onPress={goBack}>
          <Text style={{ fontSize: 18 }}>Exit Puzzle</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
  tilesStyle: {
    margin: "0 auto",
    padding: 5,
    position: "relative",
  },
  playButton: {
    backgroundColor: "white",
    height: 50,
    width: 200,
    color: "black",
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    marginTop: 20,
    shadowOffset: { width: 5, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.8,
    elevation: 4,
  },
});
export default Tiles;
