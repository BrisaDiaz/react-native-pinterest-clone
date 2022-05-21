import React from "react";
import { StyleSheet } from "react-native";

import { ScrollView, FlatList, Text, View } from "../components/Themed";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import PinTopic from "../components/PinTopic";
import SearchBar from "../components/SearchBar";
import Tag from "../components/Tag";
import PinMasonrySkeleton from "../components/skeletons/PinMasonrySkeleton";
import PinsMasonry from "../components/PinsMasonry";
import { useAppSelector, useAppDispatch } from "../hooks/useStore";
import {
  setSearchQuery,
  addSearchTag,
  removeSearchTag,
  addSearchHistory,
} from "../store/slices/search";
import {
  useLazyGetPinsQuery,
  useGetTodayPopularTopicsQuery,
} from "../store/services";
import Layout from "../constants/Layout";
import { PinTopic as PinTopicType } from "../types";
export default function SearchScreen({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}) {
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((store) => store.search);
  const { data: popularTopics, isLoading: isLoadingTopics } =
    useGetTodayPopularTopicsQuery();
  const [trigger, { data, isLoading }] = useLazyGetPinsQuery();
  const handleSearchChange = (search: string) => {
    dispatch(setSearchQuery(search));
  };

  /// search listeners
  const handleTagsChange = (tag: string) => {
    if (searchState.searchTags.includes(tag)) {
      return dispatch(removeSearchTag(tag));
    }
    return dispatch(addSearchTag(tag));
  };

  const handleSearch = (search?: string) => {
    if (!searchState.searchQuery.length) return;

    dispatch(addSearchHistory(search || searchState.searchQuery));
    trigger({
      searchQuery: search || searchState.searchQuery,
      tags: searchState.searchTags,
    });
  };
  /// make search request with current search query or arg
  const handleSearchByTag = (search: string) => {
    dispatch(addSearchHistory(search));
    navigation.navigate("Search", { query: search });
  };
  /// lisente to url changes
  React.useEffect(() => {
    const urlQuery = route?.params?.query;

    handleSearchChange(urlQuery || "");
    if (urlQuery) {
      handleSearch(urlQuery);
      dispatch(addSearchHistory(urlQuery));
    }
  }, [route?.params?.query]);

  React.useEffect(() => {
    handleSearch();
  }, [searchState.searchTags]);
  //// topic render info
  const TOPICS_COLUMNS_NUM = Math.floor(Layout.window.width / 160);
  const TOPICS_SPACING = 6;
  const renderTopic = ({ item }: { item: PinTopicType }) => (
    <PinTopic
      data={item}
      style={{
        marginBottom: 6,
        flex: 1,
        marginHorizontal: "auto",
        maxWidth: `${100 / TOPICS_COLUMNS_NUM}%`,
        marginLeft: TOPICS_SPACING,
      }}
      onPress={() => handleSearchByTag(item.name)}
    />
  );
  /// tags render info
  const renderTag = ({ item }: { item: string }) => (
    <Tag
      text={item}
      defaultChecked={searchState.searchTags.includes(item)}
      onChange={() => handleTagsChange(item)}
    />
  );
  /// search tags render info

  const renderSearchTag = ({ item }: { item: string }) => (
    <Tag
      text={item}
      onChange={(isChecked) => isChecked && handleSearchByTag(item)}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <SearchBar
        onSearch={(search) => handleSearch()}
        onSubmitEditing={(search) => handleSearch()}
        value={searchState.searchQuery}
        onClear={() => handleSearchChange("")}
        onChangeText={(currentValue) => handleSearchChange(currentValue)}
        outlined={true}
        loading={isLoading}
        rounded={true}
      />
      {isLoading && <PinMasonrySkeleton itemsNum={12} />}
      {popularTopics && (!data || !data.total) && !isLoading && (
        <>
          {searchState.searchHistory.length > 0 && (
            <>
              <Text style={styles.sectionLabel}>Recent searches</Text>
              <FlatList
                horizontal={true}
                contentContainerStyle={[
                  styles.tagList,
                  { justifyContent: "space-around" },
                ]}
                showsHorizontalScrollIndicator={false}
                data={searchState.searchHistory}
                renderItem={renderSearchTag}
                keyExtractor={(item) => item}
                scrollEnabled={true}
                inverted={true}
              />
            </>
          )}

          {!data ? (
            <Text style={styles.sectionLabel}>Popular in Pinterest </Text>
          ) : (
            searchState.searchQuery && (
              <View style={styles.notFoundMessage}>
                <Text style={styles.notFoundText}>
                  Sorry, no pin was found for this search.
                </Text>
                <Text style={styles.notFoundText}>
                  Do you want to try one of these?
                </Text>
              </View>
            )
          )}

          <FlatList
            contentContainerStyle={{
              marginBottom: "1rem",
              marginLeft: -TOPICS_SPACING,
            }}
            columnWrapperStyle={{
              width: "100%",
              justifyContent: "center",
              display: "flex",
            }}
            data={popularTopics}
            numColumns={TOPICS_COLUMNS_NUM}
            renderItem={renderTopic}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}
      {!isLoading && data && (
        <>
          <FlatList
            horizontal={true}
            contentContainerStyle={styles.tagList}
            showsHorizontalScrollIndicator={false}
            data={data.suggestedTags}
            renderItem={renderTag}
            keyExtractor={(item) => item}
            scrollEnabled={true}
          />

          <PinsMasonry data={data.result} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 6,
    paddingBottom: 40,
  },
  tagList: {
    maxHeight: "fit-content",
    marginTop: 4,
    marginBottom: 16,
    height: 40,
  },
  sectionLabel: {
    fontWeight: "600",

    marginTop: "1rem",
    marginBottom: "0.8rem",
    textAlign: "center",
  },
  notFoundMessage: {
    marginBottom: "1.5rem",
  },
  notFoundText: {
    fontWeight: "700",
    fontSize: 14,
    textAlign: "center",
  },
});
