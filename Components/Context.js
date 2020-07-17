import React, { useReducer } from "react";
import Sound from "react-native-sound";
const sound = new Sound(require("../assets/bg.mp3"), (error) => {
  if (error) {
    alert("audio error" + error.message);
    return;
  }
});

const puzzlesound = new Sound(require("../assets/puzzlebg.mp3"), (error) => {
  if (error) {
    console.log("Error playing sound");
  }
});

let initialState = { sound: sound, puzzlesound: puzzlesound, intiles: false };

let reducer = (state, action) => {
  switch (action.type) {
    case "update bgsound":
      return { ...state, sound: action.payload };
      break;
    case "update puzzlesound":
      return { ...state, puzzlesound: action.payload };
      break;
    case "set intiles to true":
      state.intiles = true;
      return { ...state };
    case "set intiles to false":
      state.intiles = false;
      return { ...state };
  }
};

const SoundContext = React.createContext(initialState);

function SoundProvider(props) {
  console.log("state.intiles is==>>", initialState.intiles);
  let [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <SoundContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SoundContext.Provider>
  );
}

export { SoundContext, SoundProvider };
