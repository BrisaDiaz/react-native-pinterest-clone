import React, { useState, useEffect } from "react";
import { ScrollView, FlatList, Text } from "../components/Themed";
import { StyleSheet } from "react-native";
import PinTopic from "../components/PinTopic";
import { NavigationProp } from "@react-navigation/native";
import { topics as topicsMock, relatedPins } from "../mocks";
import Button from "../components/Button";

import PinsMasonry from "../components/PinsMasonry";
export default function Home({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const DEFAULT_DISPLAYED_TOPICS = 6;
  const [topics, setTopics] = useState(topicsMock);
  const [pins, setPins] = useState(relatedPins);
  const [isTotalTopicsLoaded, setIsTotalTopicsLoaded] = useState(false);

  const onDisplayMoreTopics = () => {
    setIsTotalTopicsLoaded(true);
  };
  const renderTopic = ({ item }: { item: typeof topicsMock[0] }) => (
    <PinTopic
      data={item}
      style={{ marginBottom: 10, flex: 1, marginHorizontal: "auto" }}
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
          fontStyle={{ fontWeight: "600", fontSize: 18, color: "#000" }}
          onPress={() => onDisplayMoreTopics()}
        />
      ) : undefined}
    </PinTopic>
  );
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionLabel}>Discover interests</Text>
      <FlatList
        contentContainerStyle={{
          marginBottom: "1.5rem",
        }}
        data={
          isTotalTopicsLoaded
            ? topics
            : topics.slice(0, DEFAULT_DISPLAYED_TOPICS)
        }
        numColumns={1}
        renderItem={renderTopic}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text style={styles.sectionLabel}>Explore popular ideas</Text>
      <PinsMasonry pins={pins} columns={2} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: "1rem",
  },
  sectionLabel: {
    textAlign: "center",
    marginVertical: "1rem",
    fontSize: 16,
  },
});
