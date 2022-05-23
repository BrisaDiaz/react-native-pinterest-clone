import { useGetUserProfileQuery } from "../store/services";

import { View, Text, ScrollView } from "./Themed";
import MenuModal, { Props as MenuModalProps } from "./MenuModal";
import { StyleSheet, TouchableHighlight, Image } from "react-native";
import IconButton from "./IconButton";
import { Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";
export default function StoreInBoardModal({
  onStore,
  onCreateBoard,
  ...props
}: MenuModalProps & {
  onStore?: (boardId: number) => void;
  onCreateBoard?: () => void;
}) {
  const { data } = useGetUserProfileQuery();
  const handleStoreInBoard = (boardId: number) => {
    onStore && onStore(boardId);
  };

  const handleCreateBoard = () => {
    onCreateBoard && onCreateBoard();
   
  };
  return (
    <MenuModal title="Store in board" closeButtonVisible={true} {...props}>
      {data && (
        <>
          <View style={styles.container}>
            {data.pin_boards.length ? (
              <Text style={styles.smallText}>All boards</Text>
            ) : (
              <Text style={styles.smallText}>There is no board yet</Text>
            )}
            <ScrollView>
              {data.pin_boards.map((board) => (
                <TouchableHighlight
                  key={board.id}
                  style={styles.board}
                  underlayColor={Colors.lightGray}
                  onPress={() => handleStoreInBoard(board.id)}
                >
                  <>
                    <Image
                      source={{ uri: board.thumbnails[0] }}
                      style={styles.boardThumbnail}
                    />
                    <Text style={styles.boardName} numberOfLines={1}>
                      {board.name}
                    </Text>
                  </>
                </TouchableHighlight>
              ))}
            </ScrollView>
          </View>
        </>
      )}
      <View style={styles.modalFooter}>
        <IconButton
          icon={<Entypo size={24} name="plus" style={{ padding: 2 }} />}
          style={styles.createBoardButton}
          onPress={() => handleCreateBoard()}
        />
        <Text style={styles.footerText}>Create Board</Text>
      </View>
    </MenuModal>
  );
}
const styles = StyleSheet.create({
  container: { padding: 12, paddingTop: 0 },
  smallText: { fontSize: 12 },
  board: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  boardThumbnail: {
    width: 40,
    aspectRatio: 1,
    marginRight: 4,
    borderRadius: 4,
    overflow: "hidden",
  },
  boardName: {
    fontWeight: "700",
    fontSize: 15,
  },
  modalFooter: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopColor: Colors.lightGray,
    borderTopWidth: 1,
  },
  createBoardButton: {
    backgroundColor: Colors.lightGray,

    borderRadius: 4,
  },
  footerText: {
    fontWeight: "700",
    marginLeft: 6,
  },
});
