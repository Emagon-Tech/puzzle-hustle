import React from "react";
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

const initialState = { sound: sound, puzzlesound: puzzlesound };

const SoundContext = React.createContext(initialState);

function SoundProvider(props) {
  return (
    <SoundContext.Provider value={initialState}>
      {props.children}
    </SoundContext.Provider>
  );
}

export { SoundContext, SoundProvider };
