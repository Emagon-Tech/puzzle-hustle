import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import _ from "lodash";
import { Tile } from "./Tile";

const Tiles = (props) => {
  const { rows, cols, hole, width, height } = props;
  // const [numbers, setNumbers] = useState(_.range(1, rows * cols + 1));
  const [splitImages, setSplitImages] = useState([]);
  const pieceWidth = Math.round(width / cols);
  const pieceHeight = Math.round(height / rows);
  // const solved = isSolved(numbers);
  // console.log("SOLVED!!!!!!", solved);
  useEffect(() => {
    console.log("in useEffect()");
    fetching1();
  }, []);

  const fetching1 = async () => {
    await fetch("http://192.168.0.231:5000/image_slicer")
      .then((response) => response.json())
      .then((res) => {
        res.datalist.forEach((element, index) => {
          element.id = index;
        });

        setSplitImages(res.datalist);
        // shuffledimages = shufflingArray(res.datalist);
      });
  };

  // const shuffleImages = (images) => {
  //   let randindex = 2;
  //   let tmp = {};
  //   for (var i = images.length - 1; i > 0; i--) {
  //     randindex = Math.floor(Math.random() * (i + 1));
  //     tmp = images[i];
  //     images[i] = images[randindex];
  //     images[randindex] = tmp;
  //   }
  //   return images;
  // };

  // const isSolved1 = (itemOrderArray) => {
  //   let bo = true;
  //   console.log("img", img);
  //   console.log("Iorder", itemOrderArray);
  //   for (let i = 0; i < itemOrderArray.length; i++) {
  //     if (!(i == img[itemOrderArray[i]["key"]]["id"])) {
  //       bo = false;
  //     }
  //   }
  //   return bo;
  // };

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
  // function shuffle(numbers, hole, rows, cols) {
  //   do {
  //     numbers = _.shuffle(_.without(numbers, hole)).concat(hole);
  //   } while (isSolved(numbers) || !isSolvable(numbers, rows, cols));
  //   return numbers;
  // }

  function canSwap(src, dest, rows, cols) {
    const { row: srcRow, col: srcCol } = getMatrixPosition(src, rows, cols);
    const { row: destRow, col: destCol } = getMatrixPosition(dest, rows, cols);
    console.log(srcRow, srcCol);
    console.log(destRow, destCol);

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
  //   const shuffledNumbers = shuffle(numbers, hole, rows, cols);
  //   setNumbers(shuffledNumbers);
  // };

  const swapTiles = (tileIndex) => {
    const holeIndex = splitImages.findIndex((obj) => obj.id === hole);
    console.log("HoleIndex", holeIndex, "----Tile index", tileIndex);
    if (canSwap(tileIndex, holeIndex, rows, cols)) {
      console.log("can swap called");
      const newSplitImages = swap(splitImages, tileIndex, holeIndex);
      newSplitImages.forEach((element) => {
        console.log("------------", element.id);
      });
      setSplitImages(newSplitImages);
    }
  };

  const handleTileClick = (index) => {
    swapTiles(index);
  };

  const handleButtonClick = () => {
    shuffleTiles();
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={splitImages}
        renderItem={({ item, index }) => (
          <Tile
            {...props}
            index={item.id}
            imageSrc={item.dataURI}
            key={item.id}
            width={pieceWidth}
            height={pieceHeight}
            onClick={handleTileClick}
          />
        )}
        extraData={splitImages}
        numColumns={cols}
        keyExtractor={(item, index) => item.id}
      />
      <Button title="Start" onPress={() => handleButtonClick()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tilesStyle: {
    margin: "0 auto",
    padding: 5,
    position: "relative",
  },
});
export default Tiles;
