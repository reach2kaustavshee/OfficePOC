import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

const screenWidth = width;
const screenHeight = height;

const widthToDpi = (number) => {
  let mapWidth = typeof number === "number" ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * mapWidth) / 100);
};

const heightToDpi = (number) => {
  let mapHeight = typeof number === "number" ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((height * mapHeight) / 100);
};

export { widthToDpi, heightToDpi, screenWidth, screenHeight };
