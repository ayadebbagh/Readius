import { Dimensions, StyleSheet, View } from "react-native";
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
import { SafeAreaProvider } from "react-native-safe-area-context";

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
    outputRange: [0, -1193],
  });

  const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },

  background: {
    width: 1200,
    height: screenHeight,
    marginLeft: -2.5,
  },
});
