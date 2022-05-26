import { View, Text } from "./Themed";
import { ImageBackground } from "react-native";
import Carrousel from "./Carrousel";
import Button from "./Button";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import useLoadingStyle from "../hooks/useLoadingStyle";
import Animated from "react-native-reanimated";
import { Article } from "../types";
export default function ArticlesCarrousel({
  data,
  isLoading = false,
}: {
  isLoading?: boolean;
  data: Article[];
}) {
  const carrouselItemWidth =
    Layout.window.width - 18 > 380 ? 380 : Layout.window.width - 18;
  const visibleIndicators =
    Layout.window.width < (data.length - 1.5) * carrouselItemWidth;
  const { loadingStyle } = useLoadingStyle();
  return (
    <Carrousel
      dotIndicatorsVisible={visibleIndicators}
      itemWidth={carrouselItemWidth}
      threshold={0.6}
      spacing={6}
      itemsContainerProps={{
        data: data,
        contentContainerStyle: { marginHorizontal: "auto" },
        renderItem: ({ item }) => (
          <Animated.View
            style={[
              {
                width: carrouselItemWidth,
                maxWidth: 380,
                aspectRatio: 1.4,
                borderRadius: 12,
                marginLeft: 6,

                overflow: "hidden",
              },
              isLoading && loadingStyle,
            ]}
          >
            <ImageBackground
              style={{
                flex: 1,
                justifyContent: "center",
              }}
              source={{ uri: item.thumbnail }}
              resizeMode="cover"
            >
              <View
                style={{
                  backgroundColor: "#00000040",
                  width: "100%",
                  height: "100%",
                  justifyContent: "flex-end",
                  padding: "1rem",
                }}
              >
                <Text
                  style={{
                    color: Colors.dark.tint,
                    fontWeight: "700",
                    fontSize: 22,
                    marginBottom: "1rem",
                    textTransform: "capitalize",
                  }}
                >
                  {item.name}
                </Text>
                <Button
                  text="View more"
                  rounded={true}
                  type="secondary"
                  backgroundColor={"#fff"}
                  fontStyle={{
                    fontWeight: "600",
                  }}
                />
              </View>
            </ImageBackground>
          </Animated.View>
        ),
      }}
    />
  );
}
