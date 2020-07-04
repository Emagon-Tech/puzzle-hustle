import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  TouchableHighlight,
  Modal,
  Dimensions,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import LottieView from "lottie-react-native";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export default CategoriesModalComponent = (props) => {
  let bwidth = 0;
  console.log("in settings modal");
  const { hide } = props;
  const [modalVisible, setModalVisible] = useState(true);
  function Card(props) {
    const { uriimg } = props;
    const { title } = props;
    console.log("uriimg", typeof uriimg, "title", title);
    return (
      <View
        style={{
          height: 250,
          width: 200,
          alignItems: "center",
          borderWidth: bwidth,
        }}
      >
        <Image style={{ height: 200, width: 150 }} source={{ uri: uriimg }} />
        <Text style={{ textAlign: "center" }}>{title}</Text>
      </View>
    );
  }
  const catarray = [
    {
      //uri: '../assets/00.jpg',
      uri:
        "https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      title: "people",
    },
    {
      //uri: '../assets/01.jpg',
      uri:
        "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      title: "dogs",
    },
    {
      //uri: '../assets/02.jpg',
      uri:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
      title: "nature",
    },
    {
      //uri: '../assets/03.jpg',
      uri:
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1113&q=80",
      title: "urban",
    },
    {
      //uri: '../assets/04.jpg',
      uri:
        "https://images.unsplash.com/photo-1567818735868-e71b99932e29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
      title: "Cars",
    },
    {
      // uri: '../assets/05.jpg',
      uri:
        "https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=978&q=80",
      title: "cats",
    },
    {
      //uri: '../assets/06.jpg',
      uri:
        "https://images.unsplash.com/photo-1588683023217-97e48b7da1a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80",
      title: "Covid-19",
    },
  ];
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#d9ebe9",
      alignItems: "center",
      justifyContent: "center",
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#000000",
      opacity: 0.5,
    },
    modalView: {
      position: "absolute",
      height: height * 0.6,
      margin: 20,
      marginTop: height / 4,
      backgroundColor: "#ffffff",
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.8,
      shadowRadius: 3.84,
      borderColor: "black",
      borderWidth: 2,
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
  });
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      presentationStyle={"overFullScreen"}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View
        style={{
          backgroundColor: "red",
          height: 40,
          width: 40,
          borderRadius: 20,
          marginTop: height / 4 - 20,
          marginLeft: width - 40,
          zIndex: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            hide();
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 25,
            }}
          >
            X
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.modalView}>
        <Text style={{ textAlign: "center" }}>Select a Categories</Text>
        <View style={{ marginTop: 80 }}>
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
      </View>
    </Modal>
  );
};
