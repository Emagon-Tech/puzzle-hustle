import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";

const { width, height } = Dimensions.get("screen");
const ModelHint = (props) => {
  const { imgurl } = props;
  const { showmodal } = props;
  const { gs } = props;
  const [modalVisible, setModalVisible] = useState(true);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      alignItems: "center",
      justifyContent: "center",
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      height: height / 2,
      width: width * 0.8,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.6,
      shadowRadius: 3.84,
      elevation: 5,
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
    gridview: {
      flexWrap: "wrap",
      flexDirection: "row",
      width: 320,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return (
    <Modal
      animationType="slide"
      hasBackdrop={true}
      backdropOpacity={0.8}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {imgurl === [] ? (
            <View>
              <Text>Sorry Something went wrong!!</Text>
            </View>
          ) : (
            <View style={styles.gridview}>
              {imgurl.map((item, index) => (
                <Image
                  source={{ uri: item.dataURI }}
                  style={{
                    height: 320 / gs,
                    width: 320 / gs,
                  }}
                />
              ))}
            </View>
          )}
          <TouchableOpacity
            style={{
              height: 50,
              width: 100,
              backgroundColor: "#d9ebe9",
              borderRadius: 50,
              marginTop: 20,
            }}
            onPress={showmodal}
          >
            <Text style={{ color: "black", fontSize: 30, textAlign: "center" }}>
              X
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default ModelHint;
