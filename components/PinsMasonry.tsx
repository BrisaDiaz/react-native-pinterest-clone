import PinComponent from "./Pin";
import { View, ScrollView, FlatList } from "./Themed";
import { StyleSheet } from "react-native";
import { Pin } from "../types";
export default function PinsMasonry({
  pins,
  columns,
}: {
  pins: Pin[];
  columns: number;
}) {
  const generateMasonryColumns = (dataList: any[], columns: number) => {
    const lastColumIndex = columns - 1;

    let masonry: Array<any[]> = [];
    let currentColumnIndex = 0;

    while (dataList.length) {
      if (!masonry[currentColumnIndex]) {
        masonry[currentColumnIndex] = [dataList.splice(0, 1)[0]];
      } else {
        masonry[currentColumnIndex]?.push(dataList.splice(0, 1)[0]);
      }

      if (lastColumIndex === currentColumnIndex) {
        currentColumnIndex = 0;
      } else {
        currentColumnIndex++;
      }
    }

    return masonry;
  };
  const masonry = generateMasonryColumns(pins, columns);

  const generatePin = ({ item }: { item: Pin }) => (
    <PinComponent key={item.id} data={item} style={{ marginBottom: 4 }} />
  );
  return (
    <View style={styles.masonry}>
      {masonry.map((column, index) => (
        <ScrollView key={index} style={[styles.masonryColumn]}>
          <FlatList
            data={column}
            renderItem={generatePin}
            keyExtractor={(pin) => pin.id.toString()}
          />
        </ScrollView>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  masonry: {
    marginVertical: 6,
    width: "100%",
    flexDirection: "row",
    gap: 6,
  },

  masonryColumn: {
    width: "100%",
    flex: 1,
    maxWidth: "50%",
  },
});
