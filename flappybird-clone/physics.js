import Matter from "matter-js";
import { getPipeSizePosPair } from "./utils/random";

import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;

  touches
    .filter((t) => t.type === "press")
    .forEach(() => {
      Matter.Body.setVelocity(entities.Bird.body, {
        x: 0,
        y: -8,
      });
    });
  // whenever there is a new press, the box gains y velocity, ie jumps
  Matter.Engine.update(engine, time.delta);

  for (i = 1; i < 3; i++) {
    if (
      entities[`ObstacleTop${i}`].body.bounds.max.x <= 50 &&
      !entities[`ObstacleTop${i}`].point
    ) {
      entities[`ObstacleTop${i}`].point = true;
      dispatch({ type: "new_point" });
    }

    if (entities[`ObstacleTop${i}`].body.bounds.max.x <= 0) {
      const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
      //   gets new sizes and position for pipes
      Matter.Body.setPosition(
        entities[`ObstacleTop${i}`].body,
        pipeSizePos.pipeTop.pos
      );
      entities[`ObstacleTop${i}`].point = false;
      Matter.Body.setPosition(
        entities[`ObstacleBottom${i}`].body,
        pipeSizePos.pipeBottom.pos
      );
    }
    // checks to see if the pipes have gone off screen and resets their position if so

    Matter.Body.translate(entities[`ObstacleTop${i}`].body, { x: -3, y: 0 });
    Matter.Body.translate(entities[`ObstacleBottom${i}`].body, { x: -3, y: 0 });
  }
  //   every tick of time, moves the pipes to the left, or resets the pipe position if it's off screen

  Matter.Events.on(engine, "collisionStart", (e) => {
    dispatch({ type: "game_over" });
  });
  //   alerts the Game Engine when the bird hits one of the obstacles

  return entities;
};
// creates a physics engine to be used on entities

export default Physics;
