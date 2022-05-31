const primary = "#AD2626";
const gray = "#B2B2B2";
const tintColorLight = "#202020d4";
const tintColorDark = "#fff";

export default {
  primary: primary,
  error: "rgb(220 38 38)",
  warning: "rgb(249 115 22)",
  info: "rgb(59 130 246)",
  success: "rgb(101 163 13)",
  lightGray: "#b2b2b236",
  darkGray: "#606060",
  focus: "#2196f3",

  gray,
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: gray,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: gray,
    tabIconSelected: tintColorDark,
  },
};
