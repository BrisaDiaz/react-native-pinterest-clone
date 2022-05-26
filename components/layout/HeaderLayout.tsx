import { ReactNode } from "react";
import { ViewStyle, Platform } from "react-native";
import useColorScheme from "../../hooks/useColorScheme";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withTiming,
} from "react-native-reanimated";
import Colors from "../../constants/Colors";
export default function Header({
  headerContent,
  headerContainerStyle,

  children,
}: {
  headerContent?: ReactNode;
  headerContainerStyle?: ViewStyle;

  children?: ReactNode;
}) {
  const lastContentOffset = useSharedValue(0);
  const scrollDirection = useSharedValue("DOWN");
  const theme = useColorScheme();
  const headerAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(
        scrollDirection.value === "UP"
          ? 1
          : lastContentOffset.value > 40 && scrollDirection.value === "DOWN"
          ? 0
          : 1,
      ),
      transform: [
        {
          translateY: lastContentOffset.value,
        },
      ],
    };
  });

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (lastContentOffset.value > event.contentOffset.y) {
        scrollDirection.value = "UP";
      } else if (lastContentOffset.value < event.contentOffset.y) {
        scrollDirection.value = "DOWN";
      }
      lastContentOffset.value = event.contentOffset.y;
    },
  });
  const backgroundColor = Colors[theme].background;
  return (
    <Animated.ScrollView
      onScroll={onScroll}
      style={{ flex: 1, backgroundColor }}
      scrollEventThrottle={16}
    >
      <Animated.View
        style={[
          {
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: 53,
            width: "100%",
            padding: 6,
            backgroundColor,
            position: "absolute",
            top: 0,
            ...Platform.select({
              android: {
                top: 24,
              },
            }),

            left: 0,
            zIndex: 10,
            transform: [
              {
                translateY: 0,
              },
            ],
          },
          headerContainerStyle,
          headerAnimatedStyles,
        ]}
      >
        {headerContent}
      </Animated.View>
      {children}
    </Animated.ScrollView>
  );
}
