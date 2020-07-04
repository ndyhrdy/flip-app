import React, { FC } from "react";
import { Text as Base, StyleSheet, TextProps } from "react-native";

type Props = TextProps & {
  strong?: boolean;
};

const Text: FC<Props> = ({ style, strong, ...props }) => {
  return (
    <Base {...props} style={[styles.base, strong && styles.strong, style]} />
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: "Lato_400Regular",
  },
  strong: {
    fontFamily: "Lato_700Bold",
  },
});

export default Text;
