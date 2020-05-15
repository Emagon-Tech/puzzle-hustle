import React, { Component, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
const Home = ({ navigation }) => {
    return (
        <ImageBackground style={{
            position: 'absolute',
            width: '100%',
          height: '100%',
        }} source={require('../img/background.png')}>
            <Text>
                LOGO
            </Text>
               <TouchableOpacity style={styles.button1} onPress={()=>navigation.navigate('SinglePlayerScreen')}>
          <Text
            style={{
              fontSize: 20,
            }}>
                Play
          </Text>      
            </TouchableOpacity>
            </ImageBackground>
            
);
}
const styles = StyleSheet.create({
         container: {
    flex: 1,
    },
    button1: {
    backgroundColor: 'white',
    height: 70,
    width: 200,
    borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
    marginTop:600,
    marginVertical: 5,
    marginLeft:100,
    shadowOffset: {width: 5,height:2},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 3
  }
    })
export default Home;