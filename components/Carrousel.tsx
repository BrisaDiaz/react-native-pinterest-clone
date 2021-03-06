import React, { useState } from "react";
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { RefObject, useRef } from "react";

import { View } from "./Themed";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

const Carrousel = ({
  itemWidth,
  itemsContainerProps,
  spacing = 0,
  threshold = 0,
  dotIndicatorsVisible = false,
}: {
  itemWidth: number;
  itemsContainerProps: FlatList["props"];
  spacing?: number;
  threshold?: number;
  dotIndicatorsVisible?: boolean;
}) => {
  const theme = useColorScheme();
  const scrollOffset = useSharedValue(0);
  const displayItemIndex = useSharedValue(0);

  let listRef: RefObject<FlatList<any>> = useRef(null);
  const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!listRef || !listRef.current) return;
    const offsetX = event.nativeEvent?.contentOffset.x;

    const maxThreshold =
      itemWidth * displayItemIndex.value + itemWidth * threshold;
    const minThreshold =
      itemWidth * displayItemIndex.value - itemWidth * threshold;

    // function scrollToOffset() {
    //   listRef.current?.scrollToOffset({
    //     offset: displayItemIndex.value * (itemWidth + spacing),
    //     animated: true,
    //   });
    // }
    if (offsetX > maxThreshold) {
      displayItemIndex.value = displayItemIndex.value + 1;
    } else if (offsetX < minThreshold && displayItemIndex.value !== 0) {
      displayItemIndex.value = displayItemIndex.value - 1;
    }
  };

  const dotAnimatedStyles = (index: number) =>
    useAnimatedStyle(() => {
      return {
        backgroundColor:
          index === displayItemIndex?.value ? Colors[theme].tint : Colors.gray,
      };
    });

  return (
    <>
      <FlatList
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        ref={listRef}
        horizontal={true}
        bounces={false}
        keyExtractor={() => uuid()}
        {...itemsContainerProps}
        contentContainerStyle={[
          itemsContainerProps.contentContainerStyle,
          {
            marginTop: 14,
            left: 0,
            marginLeft: -spacing || 0,
            alignItems: "center",
            marginHorizontal: "auto",
          },
        ]}
      />
      <View
        style={[
          {
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            marginHorizontal: 3,
            marginVertical: 7,
          },
        ]}
      >
        {dotIndicatorsVisible &&
          new Array(itemsContainerProps.data?.length)
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
                    marginHorizontal: 3,
                  },
                  dotAnimatedStyles(index),
                ]}
              />
            ))}
      </View>
    </>
  );
};
export default React.memo(Carrousel);
