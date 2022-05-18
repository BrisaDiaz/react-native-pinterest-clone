import React, { useState } from "react";
import { ScrollView, FlatList, Text } from "../components/Themed";
import { StyleSheet, ViewStyle } from "react-native";
import PinTopic from "../components/PinTopic";
import { NavigationProp } from "@react-navigation/native";
import { topics as topicsMock, relatedPins } from "../mocks";
import Button from "../components/Button";
import { collections } from "../mocks";
import PinsMasonry from "../components/PinsMasonry";
import CollectionsCarrousel from "../components/CollectionsCarrousel";
import Layout from "../constants/Layout";
export default function Home({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [topics, setTopics] = useState(topicsMock);
  const [hasRender, setHasRender] = useState(false);
  const [pins, setPins] = useState(relatedPins);
  const [isTotalTopicsLoaded, setIsTotalTopicsLoaded] = useState(false);

  const onDisplayMoreTopics = () => {
    setIsTotalTopicsLoaded(true);
  };

  const TOPICS_COLUMNS_NUM = Math.floor(Layout.window.width / 160);
  const DEFAULT_DISPLAYED_TOPICS =
    TOPICS_COLUMNS_NUM * 3 > topics.length
      ? topics.length
      : TOPICS_COLUMNS_NUM * 3;
  const renderTopic = ({ item }: { item: typeof topicsMock[0] }) => (
    <PinTopic
      data={item}
      style={{
        marginBottom: 6,
        flex: 1,
        marginHorizontal: "auto",
        maxWidth: `${100 / TOPICS_COLUMNS_NUM}%`,
      }}
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
      <CollectionsCarrousel data={collections} />
      <Text style={styles.sectionLabel}>Discover interests</Text>
      <FlatList
        contentContainerStyle={{
          marginBottom: "1rem",
        }}
        columnWrapperStyle={
          {
            width: "100%",
            justifyContent: "center",
            display: "flex",
            gap: 6,
          } as ViewStyle
        }
        data={
          isTotalTopicsLoaded
            ? topics
            : topics.slice(0, DEFAULT_DISPLAYED_TOPICS)
        }
        numColumns={TOPICS_COLUMNS_NUM}
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
    padding: 6,
    flex: 1,
    paddingBottom: 20,
  },
  sectionLabel: {
    textAlign: "center",
    marginVertical: "1rem",
    fontSize: 16,
    fontWeight: "500",
  },
});
