import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { playerrankingsarray } from "./playerrankings";

import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("screen");

const LeaderBoard = () => {
  const [userrank, setUserRank] = useState();
  const [isloaded, setIsLoaded] = useState(false);
  const [topplayerslist, setTopPlayersList] = useState([]);
  useEffect(() => {
    getUserRank();
    getTopPlayersList();
  }, []);

  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjI1NWEwOWJjNWRmZDMwMjU0ZGY5MmIiLCJpYXQiOjE1OTYyODM0MDEsImV4cCI6MTU5Njg4ODIwMX0.EDQ9sxqjWtTs2KIk6K6LDmkk00NRLun0AND0lJT18ow
  const getUserRank = async () => {
    const USER_JSON = await AsyncStorage.getItem("CURRENT_USER");
    const USER = JSON.parse(USER_JSON);
    let data = {
      method: "GET",
      mode: "same-origin",
      headers: {
        Authorization: `Bearer ${USER.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        Connection: "keep-Alive",
      },
    };
    await fetch(`http://192.168.0.50:4000/users/${USER.id}`, data)
      .then((response) => response.json()) // promise
      .then((response) => {
        setUserRank(response);
      })
      .catch((err) => console.log(err));
  };
  const getTopPlayersList = async () => {
    const USER_JSON = await AsyncStorage.getItem("CURRENT_USER");
    const USER = JSON.parse(USER_JSON);
    let data = {
      method: "GET",
      mode: "same-origin",
      headers: {
        Authorization: `Bearer ${USER.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        Connection: "keep-Alive",
      },
    };
    await fetch("http://192.168.0.50:4000/users/leaderboard", data)
      .then((response) => response.json()) // promise
      .then((response) => {
        calculatePlayerRank(response);
        // console.log(response);
      })
      .catch((err) => console.log(err));
  };
  const calculatePlayerRank = (users = []) => {
    var coinTracker = 0;
    var rank = 0;
    var sameUsers = 0;
    users.forEach((user, index) => {
      if (user.coins == coinTracker) {
        if (coinTracker != 0) {
          sameUsers++;
        }
      } else {
        rank = rank + sameUsers + 1;
        sameUsers = 0;
      }
      coinTracker = user.coins;
      console.log(users[index].rank);
      users[index].rank = rank;
    });
    setTopPlayersList(users);
    setIsLoaded(true);
  };
  const PlayerRankCard = (props) => {
    const { username, coins, rank } = props;
    let badge;
    switch (rank) {
      case 1:
        badge = require("../assets/goldbadge.png");
        break;
      case 2:
        badge = require("../assets/silverbadge.png");
        break;
      case 3:
        badge = require("../assets/bronzebadge.png");
        break;
      default:
        badge = require("../assets/userpro.png");
        break;
    }
    return (
      <View
        style={{
          width: width - 40,
          height: 50,
          left: 25,
          backgroundColor: "white",
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ position: "absolute", left: 30, top: 12 }}>{rank}</Text>
        <Image
          source={badge}
          style={{
            position: "absolute",
            height: 20,
            width: 20,
            left: 120,
            top: 15,
            borderRadius: 5,
          }}
        />
        <Text style={{ position: "absolute", left: 150, top: 12 }}>
          {username}
        </Text>
        <Text style={{ position: "absolute", left: 280, top: 12 }}>
          {coins}
        </Text>
        <View
          style={{
            top: 150,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        ></View>
      </View>
    );
  };
  return (
    <View>
      {isloaded ? (
        <SafeAreaView>
          <View>
            <View>
              <View
                style={{
                  //position: "absolute",
                  height: height / 3,
                  width: width,
                  backgroundColor: "#38c172",
                }}
              >
                <LottieView
                  source={require("../assets/silverrank.json")}
                  autoPlay
                  loop={true}
                />
              </View>
              <View
                style={{
                  position: "absolute",
                  left: width / 2 - 28,
                  top: height / 11,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  Your Rank
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: 32,
                    textAlign: "center",
                  }}
                >
                  #{userrank}
                </Text>
              </View>

              <View
                style={{
                  position: "absolute",
                  top: height / 3 + 10,
                  flexDirection: "row",
                  width: width,
                  justifyContent: "space-around",
                }}
              >
                <Text
                  style={{
                    height: 20,
                    // width: 100,
                    fontSize: 15,
                    //left: 10,
                  }}
                >
                  #Rank
                </Text>
                <Text
                  style={{
                    height: 20,
                    //width: 100,
                    fontSize: 15,
                    left: -20,
                  }}
                >
                  Name
                </Text>
                <Text
                  style={{
                    height: 20,
                    //width: 100,
                    fontSize: 15,
                    left: -12,
                  }}
                >
                  Coins
                </Text>
              </View>
              <ScrollView
                persistentScrollbar={true}
                style={{ top: 50, height: height / 2 + 40 }}
                horizontal={false}
                //onScroll={(event) => console.log(event.nativeEvent.contentOffset.x)}
              >
                {topplayerslist.map((item, index) => (
                  <PlayerRankCard
                    key={index}
                    username={item.username}
                    rank={item.rank}
                    coins={item.coins}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <View style={{ height: height, width: width }}>
          <LottieView
            source={require("../assets/loadinginleaderboard.json")}
            autoPlay
            loop={true}
          />
        </View>
      )}
    </View>
  );
};
export default LeaderBoard;
