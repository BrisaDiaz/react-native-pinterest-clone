
import { FlatList, ViewStyle } from "react-native";
import { View } from "./Themed";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { v4 as uuid } from "uuid";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
export default function Carrousel({
  itemWidth,
  itemsContainerProps,
  spacing = 0,
  threshold = 0,
}: {
  itemWidth: number;
  itemsContainerProps: FlatList["props"];
  spacing?: number;
  threshold?: number;
}) {
  const theme = useColorScheme();
  const scrollOffset = useSharedValue(0);
  const displayItemIndex = useSharedValue(0);
  let flatListRef;
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const offsetX = event.contentOffset.x;
      // const itemIndex = Math.floor(offsetX / itemWidth);

      const maxThreshold =
        itemWidth * displayItemIndex.value + itemWidth * threshold;
      const minThreshold =
        itemWidth * displayItemIndex.value - itemWidth * threshold;
      if (offsetX > maxThreshold) {
        displayItemIndex.value = displayItemIndex.value + 1;
      }
      if (offsetX < minThreshold && displayItemIndex.value !== 0) {
        displayItemIndex.value = displayItemIndex.value - 1;
      }
    },
  });

  const dotAnimatedStyles = (index: number) =>
    useAnimatedStyle(() => {
      return {
        backgroundColor:
          index === displayItemIndex.value ? Colors[theme].tint : Colors.gray,
      };
    });

  const flatListAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: -scrollOffset,
    };
  });

  return (
    <>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        horizontal={true}
        bounces={false}
        keyExtractor={() => uuid()}
        {...itemsContainerProps}
        contentContainerStyle={[
          itemsContainerProps.contentContainerStyle,
          {
            marginTop: "1rem",
            maxWidth: "fit-content",
            gap: spacing || 0,
          } as ViewStyle,
          flatListAnimatedStyle,
        ]}
      ></Animated.FlatList>
      <View
        style={[
          {
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            gap: 6,
            marginVertical: "1rem",
          } as ViewStyle,
        ]}
      >
        {new Array(itemsContainerProps.data?.length)
          .fill(1)
          .map((dot, index) => (
            <Animated.View
              key={uuid()}
              style={[
                {
                  width: 6,
                  height: 6,
                  borderRadius: 100,
                  backgroundColor: Colors.gray,
                },
                dotAnimatedStyles(index),
              ]}
            />
          ))}
      </View>
    </>
  );
}
