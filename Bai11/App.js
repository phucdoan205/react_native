import React from "react";
import { SafeAreaView } from "react-native";
import GuessImageGame from "./GuessImageGame";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GuessImageGame />
    </SafeAreaView>
  );
};

export default App;
