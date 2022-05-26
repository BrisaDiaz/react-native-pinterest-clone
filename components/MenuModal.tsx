import React from "react";
import Layout from "../constants/Layout";
import {
  Modal,
  Pressable,
  ScrollView,
  ViewStyle,
  LayoutChangeEvent,
} from "react-native";

import {
  PanGestureHandler,

} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  withSequence,
} from "react-native-reanimated";
import { View, Text } from "./Themed";
import Colors from "../constants/Colors";
import { ReactNode } from "react";

import useColorScheme from "../hooks/useColorScheme";

export type Props = Modal["props"] & {
  background?: string;
  menuStyles?: ViewStyle;
  onOuterClick?: () => void;
  children?: ReactNode;
  closeRatio?: number;
  openRatio?: number;
  title?: string;
};

export default function MenuModal({
  background,
  menuStyles,
  onOuterClick,
  children,
  title,
  closeRatio,
  onDismiss,
  openRatio,
  visible,
  ...modalProps
}: Props) {
  const theme = useColorScheme();
  const [modalHeight, setModalHeight] = React.useState(0);

  const SCREEN_HEIGHT = Layout.window.height;
  const INITIAL_HEIGHT = openRatio
    ? SCREEN_HEIGHT * openRatio
    : SCREEN_HEIGHT / 2;
  const MAX_TRANSITION_Y = -SCREEN_HEIGHT * 0.95;
  const MIN_TRANSITION_Y = -SCREEN_HEIGHT * (closeRatio || 0.2);
  const absoluteY = useSharedValue(0);
  const translateY = useSharedValue(0);
  const handleLayout = (event: LayoutChangeEvent) => {
    setModalHeight(event.nativeEvent.layout.height);
  };
  const closeModal = () => {
    onDismiss && onDismiss();
  };
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {},
    onActive: (event, ctx) => {
      if (event.translationY - INITIAL_HEIGHT < MAX_TRANSITION_Y) return;

      if (event.translationY - INITIAL_HEIGHT < MIN_TRANSITION_Y) {
        absoluteY.value = event.absoluteY;

        translateY.value = event.translationY - INITIAL_HEIGHT;

        return;
      }
      absoluteY.value = SCREEN_HEIGHT;

      closeModal();
    },
    onEnd: (_) => {},
  });
  const modalAnimatedStyles = useAnimatedStyle(() => {
    if (!visible || absoluteY.value === 0) return {};

    if (absoluteY.value === SCREEN_HEIGHT) {
      absoluteY.value = 0;
      translateY.value = 0;
      return {
        transform: [{ translateY: withTiming(0) }],
      };
    }
    return {
      transform: [{ translateY: withSpring(translateY.value) }],
    };
  }, [modalHeight, SCREEN_HEIGHT, visible]);
  const slideAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(withSpring(-INITIAL_HEIGHT)) }],
    };
  });
  return (
    <ScrollView
      scrollEnabled={!visible}
      nestedScrollEnabled={!visible}
      style={{
        flex: 1,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: visible ? 2000 : -10,
        backgroundColor: "#fafafa00",
        display: visible ? "flex" : "none",
      }}
    >
      <Pressable
        style={{
          position: "relative",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            onLayout={handleLayout}
            style={[
              {
                width: "100%",
                height: SCREEN_HEIGHT,
                position: "relative",
                bottom: -SCREEN_HEIGHT,
                backgroundColor: Colors[theme].background,
                borderTopColor: Colors.lightGray,
                borderTopWidth: 1,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                minHeight: "20%",
                overflow: "hidden",
              },
              menuStyles,
              visible && slideAnimatedStyle,
              modalAnimatedStyles,
            ]}
          >
            <View
              style={{
                width: 60,
                height: 4,
                backgroundColor: "#8080805c",
                alignSelf: "center",
                marginVertical: 15,
                borderRadius: 2,
              }}
            />

            {title && (
              <Text
                style={{
                  textAlign: "center",

                  textTransform: "capitalize",
                  fontWeight: "700",

                  letterSpacing: 0.5,
                  fontSize: 13,
                }}
              >
                {title}
              </Text>
            )}
            {children}
          </Animated.View>
        </PanGestureHandler>
      </Pressable>
    </ScrollView>
  );
}
