import React from "react";
import { StyleSheet } from "react-native";

import { ScrollView, FlatList } from "../components/Themed";
import { NavigationProp, RouteProp } from "@react-navigation/native";

import SearchBar from "../components/SearchBar";
import Tag from "../components/Tag";
import { relatedPins } from "../mocks";
import PinsMasonry from "../components/PinsMasonry";
type PinCollection = { id: number; name: string; thumbnail: string };
type Tag = { id: number; name: string };

export default function SearchScreen({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}) {
  const [searchQuery, setSearchQuery] = React.useState(
    route?.params?.query || "",
  );
  const [pins, setPins] = React.useState(relatedPins);

  const [filterTags, setFilterTags] = React.useState([
    "elegant",
    "short hair",
    "loose hair",
    "easy",
    "collected",
    "with fringe",
  ]);
  const [selectedTags, setSelectedTags] = React.useState(["elegant"]);

  const renderTag = ({ item }: { item: string }) => (
    <Tag text={item} defaultChecked={selectedTags.includes(item)} />
  );
  React.useEffect(() => {
    setSearchQuery(route?.params?.query || "");
  }, [route?.params?.query]);

  return (
    <ScrollView style={styles.container}>
      <SearchBar
        onSearch={(search) => console.log(search)}
        onSubmitEditing={(search) => console.log(search)}
        value={searchQuery}
        onClear={() => setSearchQuery("")}
        onChangeText={(currentValue) => setSearchQuery(currentValue)}
        outlined={true}
        rounded={true}
      />

      <FlatList
        horizontal={true}
        contentContainerStyle={styles.tagList}
        showsHorizontalScrollIndicator={false}
        data={filterTags}
        renderItem={renderTag}
        keyExtractor={(item) => item}
        scrollEnabled={true}
      />

      <PinsMasonry pins={pins} columns={2} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 6,
    paddingBottom: 20,
  },
  tagList: {
    maxHeight: "fit-content",
    marginTop: 4,
    marginBottom: 16,
    height: 40,
  },
});
