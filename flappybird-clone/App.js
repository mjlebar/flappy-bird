import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./physics";
import { useState, useEffect } from "react";
import { restart } from "./entities/index";

export default function App() {
  const [running, setRunning] = useState(false);
  useEffect(() => {
    setRunning(true);
  }, []);
  // allows us to control whether the game is running at the start or not

  const [gameEngine, setGameEngine] = useState(null);
  // a variable to track the game engine, so we can stop the game engine upon collision

  const [currentPoints, setCurrentPoints] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 40,
          fontWeight: "bold",
          margin: 20,
        }}
      >
        {currentPoints}
      </Text>
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case "game_over":
              setRunning(false);
              gameEngine.stop();
              break;
            // if we get a game over, stop the game
            case "new_point":
              setCurrentPoints(currentPoints + 1);
              break;
            // if we get a new point dispatch, add one to the points
          }
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // style makes sure everything stays in bounds of the view
        }}
      >
        <StatusBar style="auto" hidden={true} />
      </GameEngine>
      {/* initializes the game using entities and physics */}
      {!running ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
            onPress={() => {
              setRunning(true);
              gameEngine.swap(entities());
              setCurrentPoints(0);
            }}
            // this restarts the game when pressed
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 30 }}>
              START GAME
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
