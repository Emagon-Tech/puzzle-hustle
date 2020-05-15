import React, { Component, useState } from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    Alert,
    Button,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const Home = ({ navigation }) => {
    return (<View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <TouchableOpacity style={styles.button1} onPress={()=>navigation.navigate('GameScreen')}>
          <Text
            style={{
              fontSize: 15,
            }}>
                Play
          </Text>      
            </TouchableOpacity>
          
        {/* </LinearGradient> */}
      </View>
             
            
            
);
}
const styles = StyleSheet.create({
         container: {
    flex: 1,
    backgroundColor: '#FFBFB3',
    alignItems: 'center',
        justifyContent: 'center',
    },
    button1: {
    backgroundColor: 'white',
    height: 70,
    width: 200,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width: 2,height:2},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 3
  }
    })
export default Home;