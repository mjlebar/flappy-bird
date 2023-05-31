import Bird from "../components/Bird";
import Matter from "matter-js";
import Floor from "../components/Floor";
import Obstacle from "../components/Obstacle";

import { Dimensions } from "react-native";
import { getPipeSizePosPair } from "../utils/random";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default restart = () => {
  let engine = Matter.Engine.create({ enableSleeping: false });

  let world = engine.world;
  // objects in the game engine

  engine.gravity.y = 0.4;
  //   set gravity

  const pipeSizePosA = getPipeSizePosPair();
  const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9);

  return {
    physics: { engine, world },
    Bird: Bird(world, "green", { x: 50, y: 300 }, { height: 40, width: 40 }),
    Floor: Floor(
      world,
      "green",
      { x: windowWidth / 2, y: windowHeight },
      { height: 50, width: windowWidth }
    ),

    ObstacleTop1: Obstacle(
      world,
      "ObstacleTop1",
      "red",
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size
    ),
    ObstacleBottom1: Obstacle(
      world,
      "ObstacleBottom1",
      "blue",
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size
    ),
    // pair of obstacles, top and bottom

    ObstacleTop2: Obstacle(
      world,
      "ObstacleTop2",
      "red",
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size
    ),
    ObstacleBottom2: Obstacle(
      world,
      "ObstacleBottom2",
      "blue",
      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size
    ),
    //   the second pair of obstacles - we only ever need two at once
  };
  //   returns the physics engine and initialized objects
};
// restarts game fully
