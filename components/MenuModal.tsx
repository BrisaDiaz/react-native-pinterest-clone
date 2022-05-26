import React from "react";
import Layout from "../constants/Layout";
import { Modal, Pressable, ViewStyle, LayoutChangeEvent } from "react-native";

import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
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
  title?: string;
  expandEnable?: boolean;
};

export default function MenuModal({
  background,
  menuStyles,
  onOuterClick,
  children,
  title,
  closeRatio,
  onDismiss,
  expandEnable,
  visible,
  ...modalProps
}: Props) {
  const theme = useColorScheme();
  const [modalHeight, setModalHeight] = React.useState(0);

  const SCREEN_HEIGHT = Layout.window.height;
  const MAX_MODAL_TOP = SCREEN_HEIGHT - modalHeight;
  const absoluteY = useSharedValue(0);
  const translateY = useSharedValue(0);
  const handleLayout = (event: LayoutChangeEvent) => {
    setModalHeight(event.nativeEvent.layout.height);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {},
    onActive: (event, ctx) => {
      if (expandEnable === false && event.absoluteY < MAX_MODAL_TOP) {
        return;
      }
      if (event.absoluteY < SCREEN_HEIGHT * 0.05) return;
      if (event.absoluteY > SCREEN_HEIGHT * (closeRatio || 0.85)) {
        absoluteY.value = SCREEN_HEIGHT;
        translateY.value = event.translationY;
        onDismiss && onDismiss();

        return;
      }
      absoluteY.value = event.absoluteY;
    },
    onEnd: (_) => {},
  });
  const modalAnimatedStyles = useAnimatedStyle(() => {
    if (!absoluteY.value) return {};
    if (absoluteY.value === SCREEN_HEIGHT) {
      absoluteY.value = 0;
      return {
        transform: [{ translateY: withSpring(translateY.value) }],
      };
    }
    return {
      top: withSpring(absoluteY.value),
    };
  }, [modalHeight, SCREEN_HEIGHT]);

  return (
    <GestureHandlerRootView>
      <Modal
        transparent={true}
        visible={visible}
        animationType="slide"
        {...modalProps}
      >
        <Pressable
          onPress={(e) => onDismiss && onDismiss()}
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View
              onLayout={handleLayout}
              style={[
                {
                  width: "100%",
                  height: "auto",
                  position: "absolute",
                  bottom: 0,
                  backgroundColor: Colors[theme].background,
                  borderTopColor: Colors.lightGray,
                  borderTopWidth: 1,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  minHeight: "20%",
                  overflow: "hidden",
                },
                menuStyles,
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
      </Modal>
    </GestureHandlerRootView>
  );
}
