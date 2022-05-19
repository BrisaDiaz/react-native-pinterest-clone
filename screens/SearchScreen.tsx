import React from "react";
import { StyleSheet } from "react-native";

import { ScrollView, FlatList } from "../components/Themed";
import { NavigationProp, RouteProp } from "@react-navigation/native";

import SearchBar from "../components/SearchBar";
import Tag from "../components/Tag";
import { relatedPins } from "../mocks";
import PinsMasonry from "../components/PinsMasonry";
import { useAppSelector, useAppDispatch } from "../hooks/useStore";
import {
  setSearchQuery,
  addSearchTag,
  removeSearchTag,
} from "../store/slices/search";
type Tag = { id: number; name: string };

export default function SearchScreen({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}) {
  const [pins, setPins] = React.useState(relatedPins);

  const [filterTags, setFilterTags] = React.useState([
    "elegant",
    "short hair",
    "loose hair",
    "easy",
    "collected",
    "with fringe",
  ]);
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((store) => store.search);

  const handleSearchChange = (search: string) => {
    dispatch(setSearchQuery(search));
  };
  const handleTagsChange = (tag: string, isChecked: boolean) => {
    if (isChecked) {
      dispatch(removeSearchTag(tag));
    }
    return dispatch(addSearchTag(tag));
  };
  const renderTag = ({ item }: { item: string }) => (
    <Tag
      text={item}
      defaultChecked={searchState.searchTags.includes(item)}
      onChange={(isChecked) => handleTagsChange(item, isChecked)}
    />
  );
  React.useEffect(() => {
    handleSearchChange(route?.params?.query || "");
  }, [route?.params?.query]);

  return (
    <ScrollView style={styles.container}>
      <SearchBar
        onSearch={(search) => console.log(search)}
        onSubmitEditing={(search) => console.log(search)}
        value={searchState.searchQuery}
        onClear={() => handleSearchChange("")}
        onChangeText={(currentValue) => handleSearchChange(currentValue)}
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

      <PinsMasonry data={pins} />
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
