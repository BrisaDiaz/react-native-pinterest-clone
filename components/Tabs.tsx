import React, { useState } from "react";
import { View, ScrollView, Text } from "./Themed";
import { TouchableHighlight, ViewStyle } from "react-native";

export default function Tabs({
  tabs,
  defaultKey,
  onChange,
  tabButtonsContainerStyle,
  tabButtonsSpacing = 16,
  contentContainerStyle,
  containerStyle,
}: {
  defaultKey?: string | number;
  onChange?: (key: string | number) => void;
  tabButtonsContainerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  tabButtonsSpacing?: number;
  tabs: {
    label: string;
    key: string | number;
    content: React.ReactNode;
  }[];
}) {
  const [activeKey, setActiveKey] = useState<string | number>(
    defaultKey || tabs[0]?.key,
  );
  const tabContent = tabs.find((tab) => tab.key === activeKey);
  function handleChange(selectedTabKey: string | number) {
    setActiveKey(selectedTabKey);
    onChange && onChange(selectedTabKey);
  }

  return (
    <View style={[{ width: "100%" }, containerStyle]}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={[{ width: "100%" }, tabButtonsContainerStyle]}
      >
        {tabs.map((tab) => (
          <TouchableHighlight
            key={tab.key}
            style={{
              paddingVertical: 4,
              borderBottomWidth: 3,
              borderBottomColor:
                tab.key === activeKey ? "inherit" : "transparent",
              marginRight: tabButtonsSpacing,
              marginBottom: 16,
            }}
            onPress={() => handleChange(tab.key)}
          >
            <Text style={{ fontWeight: "700" }}>{tab.label}</Text>
          </TouchableHighlight>
        ))}
      </ScrollView>
      <View style={[contentContainerStyle]}>
        {tabContent?.content && tabContent?.content}
      </View>
    </View>
  );
}
