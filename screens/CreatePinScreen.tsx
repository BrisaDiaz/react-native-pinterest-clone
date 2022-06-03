import { StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Text, View } from "../components/Themed";
import HeaderLayout from "../components/layout/HeaderLayout";
import GoBackButton from "../components/GoBackButton";
import Colors from "../constants/Colors";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenParamList } from "../types";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import { Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";

import FloatingInput from "../components/FloatingInput";
import useFileManager from "../hooks/useFileManager";
import * as Clipboard from "expo-clipboard";
import Switch from "../components/Switch";
import useColorScheme from "../hooks/useColorScheme";
import Tag from "../components/Tag";
import StoreInBoardModal from "../components/StoreInBoardModal";
import Layout from "../constants/Layout";
import { PinBoard } from "../types";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
const schema = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  boardId: yup.number().required(),
  image: yup.string().required(),
  alt: yup.string(),
  source_link: yup.string().url(),
  tags: yup.array().ensure().of(yup.string()),

  allow_comments: yup.boolean().default(false),
});

const SCREEN_HEIGHT = Layout.window.height;
export default function AccountScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ScreenParamList, "CreateBoard">;
}) {
  const STEPS_NUM = 2;
  const theme = useColorScheme();
  const [isTagPanelOpen, setIsTagPanelOpen] = React.useState(false);
  const [board, setBoard] = React.useState<PinBoard | null>(null);
  const [isPickBoardPanelOpen, setIsPickBoardPanelOpen] = React.useState(false);
  const [image, setImage] = React.useState<string | null>("");

  const [imageAspectRatio, setImageAspectRatio] = React.useState(1);
  const [formStep, setFormStep] = React.useState(1);
  const [tags, setTags] = React.useState<string[]>([]);

  const {
    formState: { errors },
    resetField,
    control,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),

    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      tag: "",

      source_link: "",
      alt: "",
      allow_comments: false,
    } as {
      tag: string;

      title: string;
      description: string;
      source_link: string;
      boardId?: number;
      pin?: string;
      allow_comments: boolean;
      alt: string;
    },
  });

  const openPickBoardPanel = () => {
    setIsPickBoardPanelOpen(true);
  };
  const closePickBoardPanel = () => {
    setIsPickBoardPanelOpen(false);
  };
  const { pickImage } = useFileManager();
  const handleImageUpload = async () => {
    const result = await pickImage();
    if (result) {
      setImageAspectRatio(result.width / result.height);
      setImage(result?.uri);
      return;
    }
  };
  const toggleTagPanel = () => {
    setIsTagPanelOpen(!isTagPanelOpen);
  };
  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();

    setValue("source_link", text);
  };

  const handleAddTag = () => {
    setTags([...tags, getValues("tag").trim().toLocaleLowerCase()]);
    resetField("tag");
  };
  const handleRemoveTag = (tagName: string) => {
    const updatedTags = tags.filter((tag: string) => tag !== tagName);

    setTags(updatedTags);
  };
  const moveToNextStep = () => {
    if (!image) return;
    if (formStep < STEPS_NUM) return setFormStep(formStep + 1);
  };
  const moveToPrevStep = () => {
    if (formStep > 1) return setFormStep(formStep - 1);
  };
  const handlePickBoard = (pickedBoard: PinBoard) => {
    setBoard(pickedBoard);
    setValue("boardId", pickedBoard.id);
    closePickBoardPanel();
  };
  const handleCreateBoard = () => {
    closePickBoardPanel();
    navigation.navigate("CreateBoard");
  };
  const handleCreatePin = () => {
    if (!getValues("boardId")) return;
  };
  React.useEffect(() => {
    handleImageUpload();
  }, []);

  return (
    <>
      <StoreInBoardModal
        onDismiss={closePickBoardPanel}
        visible={isPickBoardPanelOpen}
        onStore={handlePickBoard}
        onCreateBoard={handleCreateBoard}
      />
      <HeaderLayout
        headerContent={
          <>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <GoBackButton
                onPress={() =>
                  formStep === 1 ? navigation.goBack() : moveToPrevStep()
                }
              />
              <Text style={{ fontSize: 16, fontWeight: "700" }}>
                Create Pin
              </Text>
              {formStep === STEPS_NUM ? (
                <Button
                  rounded={true}
                  onPress={handleCreatePin}
                  text="Create"
                  type={getValues("boardId") ? "primary" : "secondary"}
                />
              ) : (
                <Button
                  rounded={true}
                  text="Next"
                  onPress={moveToNextStep}
                  type={image ? "primary" : "secondary"}
                />
              )}
            </View>
          </>
        }
      >
        <View style={styles.container}>
          {formStep === 1 && (
            <>
              <View style={[styles.uploadPinZone, styles.spacing]}>
                {image ? (
                  <Image
                    style={[styles.image, { aspectRatio: imageAspectRatio }]}
                    source={{
                      uri: image,
                    }}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={handleImageUpload}
                    style={{
                      width: "100%",
                      aspectRatio: 1.3,
                      backgroundColor: Colors.lightGray,
                      padding: 8,
                      borderRadius: 14,
                    }}
                  >
                    <View
                      style={{
                        padding: 16,
                        width: "100%",
                        height: "100%",
                        borderStyle: "dashed",
                        backgroundColor: Colors.transparent,
                        borderColor: Colors[theme].tint,
                        borderWidth: 2,
                        borderRadius: 14,
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <AntDesign
                        name="upcircle"
                        size={24}
                        color={Colors[theme].tint}
                      />
                      <Text style={{ fontWeight: "600", fontSize: 16 }}>
                        Click to upload Pin
                      </Text>
                      <Text style={{ opacity: 0.8, textAlign: "center" }}>
                        Recommendation: Use high-quality .jpg files less than
                        20MB
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FloatingInput
                    label="Title"
                    placeholder="Give your Pin a title"
                    wrapperStyle={styles.inputWrapper}
                    borderBottomColor={Colors.transparent}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors["title"] ? true : false}
                    value={value}
                  />
                )}
                name="title"
              />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FloatingInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    label="Description"
                    placeholder="Say more about this Pin"
                    borderBottomColor={Colors.transparent}
                    wrapperStyle={styles.inputWrapper}
                    error={errors["description"] ? true : false}
                  />
                )}
                name="description"
              />

              <View style={styles.addLinkSection}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FloatingInput
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={errors["source_link"] ? true : false}
                      label="Destination website"
                      placeholder="Add a link"
                      borderBottomColor={Colors.transparent}
                      wrapperStyle={{
                        marginBottom: 14,
                        width: "90%",
                        marginRight: 4,
                      }}
                    />
                  )}
                  name="source_link"
                />

                <IconButton
                  icon={<Entypo size={24} name="plus" style={{ padding: 2 }} />}
                  onPress={fetchCopiedText}
                  style={styles.pasteLinkButton}
                />
              </View>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FloatingInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    label="Alt text"
                    error={errors["alt"] ? true : false}
                    placeholder="Describe your Pin's visual details"
                    borderBottomColor={Colors.transparent}
                    wrapperStyle={styles.inputWrapper}
                    description="This helps people using screen readers to understand what your Pin is about"
                  />
                )}
                name="alt"
              />
            </>
          )}

          {formStep === 2 && (
            <>
              <TouchableOpacity
                onPress={openPickBoardPanel}
                style={styles.spacing}
                activeOpacity={0.8}
              >
                <View style={styles.flexRow}>
                  <Text style={styles.fieldTitle}>Pick a board</Text>
                  <View style={[styles.flexRow, { marginLeft: "auto" }]}>
                    {board && (
                      <Text style={styles.fieldDescription}>{board.name}</Text>
                    )}
                    <MaterialIcons
                      name="keyboard-arrow-left"
                      size={24}
                      color={Colors[theme].tint}
                      style={{
                        marginLeft: 4,
                        transform: [
                          {
                            rotate: isPickBoardPanelOpen ? "-90deg" : "180deg",
                          },
                        ],
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleTagPanel} activeOpacity={0.8}>
                <View style={styles.flexRow}>
                  <Text style={styles.fieldTitle}>Tag related topics</Text>

                  <MaterialIcons
                    name="keyboard-arrow-left"
                    size={24}
                    color={Colors[theme].tint}
                    style={{
                      marginLeft: "auto",
                      transform: [
                        { rotate: isTagPanelOpen ? "-90deg" : "180deg" },
                      ],
                    }}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.spacing}>
                {isTagPanelOpen && (
                  <>
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <FloatingInput
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          placeholder="Add tag"
                          error={errors["tag"] ? true : false}
                          wrapperStyle={{ ...styles.inputWrapper }}
                          onSubmitEditing={handleAddTag}
                          borderBottomColor={Colors.transparent}
                        />
                      )}
                      name="tag"
                    />

                    <View style={styles.tagList}>
                      {tags?.map((tag: string) => (
                        <Tag
                          text={tag}
                          disabled={true}
                          defaultChecked={true}
                          key={tag}
                          deletable={true}
                          onDelete={() => handleRemoveTag(tag)}
                          textStyle={{ fontSize: 12 }}
                        />
                      ))}
                    </View>
                  </>
                )}
              </View>

              <View style={[styles.flexRow, styles.spacing]}>
                <View style={{ marginRight: 4 }}>
                  <Text style={styles.fieldTitle}>Allow comments</Text>
                  <Text style={styles.fieldDescription}>
                    You can change later after you publish
                  </Text>
                </View>
                <Switch
                  style={{ marginLeft: "auto" }}
                  onChange={(value) => setValue("allow_comments", value)}
                />
              </View>
            </>
          )}
        </View>
      </HeaderLayout>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 65,
    paddingHorizontal: 14,
    flex: 1,
    minHeight: SCREEN_HEIGHT,
  },
  uploadPinZone: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    resizeMode: "contain",
    flex: 1,

    borderRadius: 8,
  },
  inputWrapper: {
    marginBottom: 14,
  },
  addLinkSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14 * 2,
  },
  pasteLinkButton: {
    marginLeft: "auto",
    backgroundColor: Colors.lightGray,
    justifySelf: "flex-end",
    borderRadius: 100,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  fieldDescription: {
    opacity: 0.8,
  },
  spacing: {
    marginBottom: 14,
  },
  tagList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 14,
  },
});
