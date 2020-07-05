import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Button,
} from "react-native";
import { SegmentedControls } from "react-native-radio-buttons";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
Icon.loadFont();
const { width, height } = Dimensions.get("window");

export default ImagePicker = ({ route, navigation }) => {
  const options = ["Easy", "Medium", "Hard"];
  const [difficultyLevel, setDifficultyLevel] = useState("Easy");
  const setSelectedDifficultyLevel = (selectedOption) => {
    setDifficultyLevel(selectedOption);
  };
  const catarray = [
    {
      uri:
        "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      title: "dogs",
      label: "Dogs",
    },
    ,
    {
      uri:
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1113&q=80",
      title: "urban",
      label: "Cities",
    },

    {
      uri:
        "https://images.unsplash.com/photo-1567818735868-e71b99932e29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
      label: "Cars",
      title: "cars",
    },
    {
      uri:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
      title: "nature",
      label: "Nature",
    },
    {
      uri:
        "https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=978&q=80",
      title: "cats",
      label: "Cats",
    },
    {
      uri:
        "https://images.unsplash.com/photo-1588683023217-97e48b7da1a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80",
      title: "covid19",
      label: "Covid 19",
    },
    {
      uri:
        "https://images.unsplash.com/photo-1480563597043-1c877e682fc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      title: "sports",
      label: "Sports",
    },
  ];
  const [imageUrl, setImageUrl] = useState(catarray[0].uri);
  const [title, setTitle] = useState(catarray[0].title);
  const [modalVisible, setModalVisible] = useState(false);
  function Card({ item }) {
    const { uri, title, label } = item;
    const cardstyle = {
      height: 150,
      width: 150,
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
    };
    const activeCard = {
      borderColor: "white",
      borderWidth: 5,
      borderRadius: 25,
    };
    return (
      <TouchableOpacity
        onPress={() => {
          setImageUrl(uri);
          setTitle(title);
        }}
      >
        <View style={[cardstyle, imageUrl == uri ? activeCard : {}]}>
          <Image
            style={{ height: 80, width: 80, borderRadius: 50 }}
            source={{ uri: uri }}
          />
          <Text style={styles.textstyle}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    modalContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    textstyle: {
      fontSize: 20,
      textAlign: "center",
      color: "#FFFFFF",
      marginVertical: 10,
    },
    modalView: {
      margin: 30,
      backgroundColor: "black",
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
    },
    playButton: {
      backgroundColor: "white",
      height: 50,
      width: 200,
      borderRadius: 35,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
    },
  });
  return (
    <ImageBackground
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: modalVisible ? 0.5 : 1,
      }}
      source={require("../img/background.png")}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        presentationStyle="overFullScreen"
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 20, marginBottom: 20, color: "white" }}>
              Select Difficulty Level
            </Text>

            <Icon
              name="close"
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                padding: 10,
                color: "white",
              }}
              onPress={() => setModalVisible(false)}
            />

            <SegmentedControls
              options={options}
              onSelection={setSelectedDifficultyLevel}
              selectedOption={difficultyLevel}
              optionContainerStyle={{ backgroundColor: "black" }}
              containerStyle={{
                borderRadius: 25,
                width: 350,
              }}
            />
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("GameScreen", {
                  level: difficultyLevel,
                  category: title,
                });
              }}
            >
              <Text style={{ fontSize: 20 }}>Play</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <SafeAreaView>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Text style={styles.textstyle}>Cash:100</Text>
          <Text style={styles.textstyle}>Coins:2300</Text>
          <Text style={styles.textstyle}>Add Friend</Text>
        </View>
        <Text style={[styles.textstyle, { margin: 30 }]}>
          Click to play {title} puzzle
        </Text>
        <View
          style={{
            marginHorizontal: "10%",
            flexDirection: "column",
            width: "80%",
            height: height * 0.5,
            borderRadius: 30,
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: width - 80,
              height: height * 0.5,
              borderRadius: 30,
            }}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View
              style={{
                bottom: -height / 25,
                position: "absolute",
              }}
            >
              <Image
                source={require("../assets/play-button.png")}
                style={{ width: 80, height: 80 }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ScrollView
          persistentScrollbar={true}
          horizontal={true}
          style={{ marginTop: "15%" }}
          centerContent={true}
          onScroll={(event) => console.log(event.nativeEvent.contentOffset.x)}
        >
          {catarray.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};
