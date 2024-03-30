import { Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, ImageBackground } from "react-native";
import {
  INPUT_RANGE_START,
  INPUT_RANGE_END,
  OUTPUT_RANGE_START,
  OUTPUT_RANGE_END,
  ANIMATION_TO_VALUE,
  ANIMATION_DURATION,
} from "../Helpers/constants";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function BackgroundAnimation({ imageSource }) {
  const initialValue = 0;
  const translateValue = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    const translate = () => {
      translateValue.setValue(initialValue);
      Animated.timing(translateValue, {
        toValue: ANIMATION_TO_VALUE,
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => translate());
    };

    translate();
  }, [translateValue]);

  const translateAnimation = translateValue.interpolate({
    inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
    outputRange: [0, -1200],
  });

  const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

  return (
    <AnimatedImage
      style={[
        styles.background,
        {
          transform: [
            {
              translateX: translateAnimation,
            },
          ],
        },
      ]}
      source={imageSource}
    />
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: 1200,
    height: 1200,
    top: 0,
    opacity: 1,
    transform: [
      {
        translateX: 0,
      },
      {
        translateY: 0,
      },
    ],
  },
});
