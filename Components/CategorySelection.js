import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";

import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export default CategoriesSelectionComponent = ({ route, navigation }) => {
  const { level } = route.params;
  const catarray = [
    {
      uri:
        "https://images.unsplash.com/photo-1480563597043-1c877e682fc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      title: "sports",
    },
    {
      uri:
        "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      title: "dogs",
    },
    {
      uri:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
      title: "nature",
    },
    {
      uri:
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1113&q=80",
      title: "urban",
    },
    {
      uri:
        "https://images.unsplash.com/photo-1567818735868-e71b99932e29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
      title: "cars",
    },
    {
      // uri: '../assets/05.jpg',
      uri:
        "https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=978&q=80",
      title: "cats",
    },
    {
      uri:
        "https://images.unsplash.com/photo-1588683023217-97e48b7da1a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80",
      title: "covid19",
    },
  ];
  const [imgurl, setimgurl] = useState(catarray[0].uri);
  const [title, setitle] = useState(catarray[0].title);
  function Card(props) {
    const { uriimg } = props;
    const { title } = props;
    const [bcolor, setbcolor] = useState(0);
    console.log("uriimg", typeof uriimg, "title", title);
    const cardstyle = {
      height: 200,
      width: 200,
      alignItems: "center",
      borderColor: "black",
      marginLeft: 10,
      borderWidth: bcolor,
      alignContent: "center",
      justifyContent: "center",
    };
    return (
      <TouchableOpacity
        onPress={() => {
          setbcolor(3);
          setimgurl(uriimg);
          setitle(title);
        }}
      >
        <View style={cardstyle}>
          <Text style={styles.textstyle}>{title}</Text>
          <Image
            style={{ height: 150, width: 150, borderRadius: 75 }}
            source={{ uri: uriimg }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#d9ebe9",
      alignItems: "center",
      justifyContent: "center",
    },
    textstyle: { fontSize: 20, textAlign: "center", color: "#FFFFFF" },
    TriangleShapeView: {
      //To make Triangle Shape
      width: 10,
      height: 100,
      borderLeftWidth: 30,
      borderRightWidth: 30,
      borderBottomWidth: 30,
      borderStyle: "solid",
      backgroundColor: "transparent",
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: "#000000",
      transform: [{ rotate: "180" }],
    },
    CircleShapeView: {
      //To make Circle Shape
      width: 100,
      height: 100,
      borderRadius: 200 / 2,
      backgroundColor: "#FFFFFF",
      opacity: 0.6,
    },
  });
  return (
    <ImageBackground
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
      source={require("../img/background.png")}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Text style={styles.textstyle}>Cash:100</Text>
        <Text style={styles.textstyle}>Coins:2300</Text>
        <Text style={styles.textstyle}>Addfriend</Text>
      </View>
      <Text style={[styles.textstyle, { marginTop: 30 }]}>
        play {title} Puzzle
      </Text>
      <View
        style={{
          margin: 30,
          width: width - 80 + 5,
          height: height * 0.5 + 4,
          borderColor: "black",
          borderWidth: 2,
          position: "absolute",
          marginVertical: height / 7,
          borderRadius: 30,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: imgurl }}
          style={{ width: width - 80, height: height * 0.5, borderRadius: 30 }}
        />
      </View>
      <View>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("GameScreen", {
              level: level,
              category: title,
            });
          }}
        >
          <View
            style={{
              marginHorizontal: width * 0.35,
              marginTop: height / 2,
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
      <View
        style={{
          position: "absolute",
          marginTop: height * 0.7,
        }}
      >
        <ScrollView
          horizontal={true}
          centerContent={true}
          onScroll={(event) => console.log(event.nativeEvent.contentOffset.x)}
        >
          {catarray.map((item) => (
            <Card key={item.id} uriimg={item.uri} title={item.title} />
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};
