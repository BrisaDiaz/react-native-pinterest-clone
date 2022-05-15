import React, { useState, useEffect } from "react";
import { ScrollView, FlatList, Text, View } from "../components/Themed";
import { StyleSheet, ViewStyle, ImageBackground } from "react-native";
import PinTopic from "../components/PinTopic";
import { NavigationProp } from "@react-navigation/native";
import { topics as topicsMock, relatedPins } from "../mocks";
import Button from "../components/Button";
import Carrousel from "../components/Carrousel";
import PinsMasonry from "../components/PinsMasonry";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
export default function Home({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const DEFAULT_DISPLAYED_TOPICS = 6;
  const [topics, setTopics] = useState(topicsMock);
  const [hasRender, setHasRender] = useState(false);
  const [pins, setPins] = useState(relatedPins);
  const [isTotalTopicsLoaded, setIsTotalTopicsLoaded] = useState(false);

  const onDisplayMoreTopics = () => {
    setIsTotalTopicsLoaded(true);
  };
  const renderTopic = ({ item }: { item: typeof topicsMock[0] }) => (
    <PinTopic
      data={item}
      style={{ marginBottom: 6, flex: 1, marginHorizontal: "auto" }}
      onPress={() =>
        navigation.navigate("Search", {
          query: item.name,
        })
      }
    >
      {!isTotalTopicsLoaded &&
      topics[DEFAULT_DISPLAYED_TOPICS - 1].id === item.id ? (
        <Button
          text="More"
          type="secondary"
          rounded={true}
          backgroundColor={"#fff"}
          fontStyle={{ fontWeight: "600", fontSize: 16, color: "#000" }}
          onPress={() => onDisplayMoreTopics()}
        />
      ) : undefined}
    </PinTopic>
  );
  const collections = [
    {
      id: 1,
      name: "shipping container house",
      thumbnail:
        "https://i.pinimg.com/474x/60/fc/62/60fc6202626da99e466c61d08b938848.jpg",
    },
    {
      id: 2,
      name: "nail stamping",
      thumbnail:
        "https://i.pinimg.com/474x/cd/cd/81/cdcd81c42e7b527b800c42253b0cc505.jpg",
    },
    {
      id: 3,
      name: "hanging plants",
      thumbnail:
        "https://i.pinimg.com/474x/d6/96/e5/d696e572c5c04b64f67c929f46f8f7de.jpg",
    },
  ];

  React.useEffect(() => {
    setHasRender(true);
    return () => setHasRender(false);
  }, []);
  const carrouselItemWidth =
    Layout.window.width - 32 > 380 ? 380 : Layout.window.width - 32;
  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          fontWeight: "600",
          textAlign: "center",
          width: "100%",
          paddingBottom: "2rem",
        }}
      >
        Today
      </Text>
      <Text
        style={{
          fontWeight: "700",
          textAlign: "center",
          width: "100%",
          fontSize: 25,
        }}
      >
        Explore the best of pinterest
      </Text>
      <Carrousel
        itemWidth={carrouselItemWidth}
        threshold={0.7}
        spacing={6}
        itemsContainerProps={{
          data: collections,
          contentContainerStyle: { marginHorizontal: "auto" },
          renderItem: ({ item }) => (
            <View
              style={{
                width: carrouselItemWidth,
                maxWidth: 380,
                height: 200,
                borderRadius: 12,

                overflow: "hidden",
              }}
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
            </View>
          ),
        }}
      />
      <Text style={styles.sectionLabel}>Discover interests</Text>
      <FlatList
        contentContainerStyle={{
          marginBottom: "1rem",
        }}
        columnWrapperStyle={
          {
            width: "100%",

            display: "flex",
            gap: 6,
          } as ViewStyle
        }
        data={
          isTotalTopicsLoaded
            ? topics
            : topics.slice(0, DEFAULT_DISPLAYED_TOPICS)
        }
        numColumns={2}
        renderItem={renderTopic}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text style={styles.sectionLabel}>Explore popular ideas</Text>
      <PinsMasonry pins={pins} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: "1rem",
    flex: 1,
  },
  sectionLabel: {
    textAlign: "center",
    marginVertical: "1rem",
    fontSize: 16,
    fontWeight: "500",
  },
});
