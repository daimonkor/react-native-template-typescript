import React, { forwardRef } from "react";
import { StyleSheet, Text as StandardText } from "react-native";
import { colors } from "../../theme";

export const Text = forwardRef<any, any>(({ children, ...props }, ref) => (
  <StandardText {...props} style={[styles.text, props.style]} ref={ref}>
    {children}
  </StandardText>
));

const styles = StyleSheet.create({
  text: { fontFamily: "CircularXX-Regular", color: colors.textColorPrimary },
});
