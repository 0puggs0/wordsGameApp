import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { WordItem } from "../interfaces/wordScreenInterface";
import { SCREEN_WIDTH } from "../constants/sizes";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";

interface Props {
  word: WordItem[][];
  indexStroke: number;
  indexSymbol: number;
  symbol: WordItem;
}
export default function Symbol({
  word,
  indexStroke,
  indexSymbol,
  symbol,
}: Props) {
  const size = useSharedValue(1);
  const style = useAnimatedStyle(() => {
    return { transform: [{ scale: size.value }] };
  });

  useEffect(() => {
    if (symbol.symbol) {
      size.value = withSequence(
        withSpring(0.9),
        withSpring(1.1),
        withSpring(1)
      );
    }
  }, [symbol.symbol]);
  return (
    <Animated.View key={indexSymbol} style={style}>
      <LinearGradient
        style={styles.symbolBorderContainer}
        colors={word[indexStroke][indexSymbol].borderBackgroundColor}
      >
        <LinearGradient
          style={styles.symbolInnerContainer}
          colors={word[indexStroke][indexSymbol].backgroundColor}
        >
          <Text
            style={{
              color: word[indexStroke][indexSymbol].textColor,
              fontSize: 38,
              fontFamily: "Nunito-Bold",
            }}
          >
            {symbol.symbol.toUpperCase()}
          </Text>
        </LinearGradient>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  symbolBorderContainer: {
    width: SCREEN_WIDTH / 5 - 12,
    height: SCREEN_WIDTH / 5 - 12,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  symbolInnerContainer: {
    width: SCREEN_WIDTH / 5 - 24,
    height: SCREEN_WIDTH / 5 - 24,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});
