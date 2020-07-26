import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "../../theme";

export const LoadingView: React.FC<any> = (props) => {
  return (
    <View style={styles.loadingProcess} {...props}>
      <ActivityIndicator size={"large"} color={colors.textColorPrimary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingProcess: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    zIndex: 99999,
  },
});
