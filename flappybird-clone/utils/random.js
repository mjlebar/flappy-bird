import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1 + min));
};

export const getPipeSizePosPair = (addToPosX = 0) => {
  let yPosTop = getRandom(650, windowHeight);
  //   took a lot of experimentation to get the right numbers here
  //   the larger the ceiling is, the further up the pipes can go
  // the smaller the floor is, the further down the pipes can go

  const pipeTop = {
    pos: { x: windowWidth + addToPosX, y: -yPosTop },
    size: { height: windowHeight * 2, width: 75 },
  };
  const pipeBottom = {
    pos: { x: windowWidth + addToPosX, y: windowHeight * 2 + 200 - yPosTop },
    // the 200 is the gap between the top and bottom pipes
    size: { height: windowHeight * 2, width: 75 },
  };
  //   creates the sizes and positions for two pipes, one on top and one on bottom

  return { pipeBottom, pipeTop };
};
// initializes the location and size of an obstacle
