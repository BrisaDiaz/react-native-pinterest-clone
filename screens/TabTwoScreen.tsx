import React from "react";
import { StyleSheet, ScrollView, FlatList } from "react-native";

import { View } from "../components/Themed";

import PinCollection from "../components/PinCollection";
import SearchBar from "../components/SearchBar";
import Tag from "../components/Tag";
type PinCollection = { id: number; name: string; thumbnail: string };
type Tag = { id: number; name: string };
export default function TabTwoScreen() {
  const collections = [
    {
      id: 1,
      name: "The art of Star Wars",
      thumbnail:
        "https://i.pinimg.com/236x/c6/99/77/c699774b34de2c941346b1648bf35bef.jpg",
    },
    {
      id: 2,
      name: "Monday without meat: recipes with cabbage",
      thumbnail:
        "https://i.pinimg.com/736x/d6/37/e1/d637e11e3594543f40e57c855c7368ed.jpg",
    },
    {
      id: 3,
      name: "Crochet clothes",
      thumbnail:
        "https://i.pinimg.com/736x/ce/7b/cd/ce7bcdcb28b80a0da8393827e7394368.jpg",
    },
    {
      id: 4,
      name: "Shield Eye Tattoos",
      thumbnail:
        "https://i.pinimg.com/736x/56/ae/90/56ae905c4e91848a349c3abfb9874d27.jpg",
    },
    {
      id: 5,
      name: "Woven footboard",
      thumbnail:
        "https://i.pinimg.com/736x/f6/40/9e/f6409e587aae8a67f5f7e42c16a11c5f.jpg",
    },
  ];
  const tags = [
    { id: 1, name: "trending" },
    { id: 2, name: "fitness" },
    { id: 3, name: "food" },
    { id: 4, name: "entertainment" },
    { id: 5, name: "art" },
    { id: 6, name: "photos" },
  ];
  const renderCollection = ({ item }: { item: PinCollection }) => (
    <PinCollection data={item} />
  );
  const renderTag = ({ item }: { item: Tag }) => <Tag text={item.name} />;

  return (
    <View style={styles.container}>
      <SearchBar onSearch={(search) => console.log(search)} />
      <ScrollView horizontal={true} style={styles.tagList}>
        <FlatList
          horizontal={true}
          data={tags}
          renderItem={renderTag}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
      <ScrollView>
        <FlatList
          data={collections}
          renderItem={renderCollection}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  tagList: {
    maxHeight: "fit-content",
    marginTop: 4,
    marginBottom: 16,
    height: 120,
  },
});
