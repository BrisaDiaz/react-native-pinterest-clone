import React, { useState } from "react";
import { ScrollView, FlatList, Text, View } from "../components/Themed";
import { StyleSheet, Platform } from "react-native";
import PinTopicComponent from "../components/PinTopic";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenParamList } from "../types";
import { FIXED_TOPICS } from "../constants/Data";
import Button from "../components/Button";
import PinMasonrySkeleton from "../components/skeletons/PinMasonrySkeleton";
import PinsMasonry from "../components/PinsMasonry";
import ArticlesCarrousel from "../components/ArticlesCarrousel";
import Layout from "../constants/Layout";
import { PinTopic } from "../types";

import {
  useGetTodayPopularPinsQuery,
  useGetTodayPopularArticlesQuery,
} from "../store/services";

export default function Home({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ScreenParamList, "Home">;
}) {
  const { data: popularPins, isLoading: isLoadingPins } =
    useGetTodayPopularPinsQuery({});
  const { data: popularArticles, isLoading: isLoadingArticles } =
    useGetTodayPopularArticlesQuery({});
  const [isTotalTopicsLoaded, setIsTotalTopicsLoaded] = useState(false);

  const onDisplayMoreTopics = () => {
    setIsTotalTopicsLoaded(true);
  };

  const TOPICS_COLUMNS_NUM = Math.floor(Layout.window.width / 160);
  const DEFAULT_DISPLAYED_TOPICS =
    TOPICS_COLUMNS_NUM * 3 > FIXED_TOPICS.length
      ? FIXED_TOPICS.length
      : TOPICS_COLUMNS_NUM * 3;
  const renderTopic = ({ item }: { item: PinTopic }) => (
    <PinTopicComponent
      data={item}
      style={{
        marginBottom: 6,
        marginLeft: 6,
        flex: 1,
        marginHorizontal: "auto",
        maxWidth: `${100 / TOPICS_COLUMNS_NUM}%`,
        alignItems: "center",
      }}
      onPress={() =>
        navigation.navigate("Search", {
          query: item.name,
        })
      }
    >
      {!isTotalTopicsLoaded &&
      FIXED_TOPICS[DEFAULT_DISPLAYED_TOPICS - 1].name === item.name ? (
        <Button
          text="More"
          type="secondary"
          style={{ marginHorizontal: "auto", alignSelf: "center" }}
          rounded={true}
          backgroundColor={"#fff"}
          fontStyle={{
            fontWeight: "600",
            fontSize: 16,
            color: "#000",
          }}
          onPress={() => onDisplayMoreTopics()}
        />
      ) : undefined}
    </PinTopicComponent>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: "600",
            textAlign: "center",
            width: "100%",
            paddingBottom: 28,
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
        {isLoadingArticles && (
          <ArticlesCarrousel
            data={new Array(3).fill({
              id: Math.random() * 10,
              name: "",
              thumbnail: "",
            })}
            isLoading={true}
          />
        )}
        {popularArticles && <ArticlesCarrousel data={popularArticles} />}
        <Text style={styles.sectionLabel}>Discover interests</Text>
        <FlatList
          contentContainerStyle={{
            marginBottom: 14,
            marginLeft: -6,
          }}
          columnWrapperStyle={{
            width: "100%",
            justifyContent: "center",
            display: "flex",
          }}
          data={
            isTotalTopicsLoaded
              ? FIXED_TOPICS
              : FIXED_TOPICS.slice(0, DEFAULT_DISPLAYED_TOPICS)
          }
          numColumns={TOPICS_COLUMNS_NUM}
          renderItem={renderTopic}
          keyExtractor={(item) => item.name}
        />
        <Text style={styles.sectionLabel}>Explore popular ideas</Text>
        {popularPins && <PinsMasonry data={popularPins} />}
        {isLoadingPins && <PinMasonrySkeleton itemsNum={12} />}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    paddingVertical: 42,
    paddingBottom: 60,

    flex: 1,
    ...Platform.select({
      android: {
        paddingBottom: 42,
      },
    }),
  },
  sectionLabel: {
    textAlign: "center",
    marginVertical: 14,
    fontSize: 16,
    fontWeight: "500",
  },
});
