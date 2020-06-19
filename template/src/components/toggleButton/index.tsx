import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../theme";
import { pSBC } from "../../utils";
import { Text } from "./../../components";

interface ToggleButtonProps {
  title: string;
  active?: boolean;
  onPress?: () => void;
  width?: string;
  containerStyle?: Object;
  disable?: boolean;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  title,
  active,
  onPress,
  width,
  containerStyle,
  disable,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.holder,
        active && styles.activeHolder,
        width && { width: width },
        containerStyle,
        disable && active && styles.activeDisable,
        disable && !active && styles.disable,
      ]}
      {...props}
      {...(!disable && { onPress: onPress })}
    >
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  holder: {
    borderColor: "#BABABA",
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  activeHolder: {
    borderWidth: 3,
    paddingVertical: 3,
    borderColor: colors.colorPrimary,
    backgroundColor: pSBC(0.8, colors.colorPrimary, "c", true), ///"#CBEEFF",
  },
  textStyle: {
    textAlign: "center",
    padding: 1.5,
  },
  disable: {
    backgroundColor: "#e6e6e6",
    borderColor: "#adadad",
  },
  activeDisable: {
    backgroundColor: pSBC(0.9, colors.colorPrimary, "c", true),
    borderColor: pSBC(0.6, colors.colorPrimary, "c", true), //"#95d6f5",
  },
});

ToggleButton.defaultProps = {
  disable: false,
  onPress: () => {},
};

export default ToggleButton;
