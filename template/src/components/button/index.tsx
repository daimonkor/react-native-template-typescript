import React from "react";
import { TouchableOpacity, StyleSheet, TextStyle } from "react-native";
import { Icon, Text } from "../../components";
import { SvgProps } from "react-native-svg";
import { colors } from "../../theme";

export interface ButtonProps {
  onPress: () => void;
  text: string;
  buttonStyle?: Object;
  textStyle?: TextStyle;
  icon?: React.FC<SvgProps>;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  text,
  icon,
  buttonStyle = {},
  textStyle = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.button, ...buttonStyle }}
    >
      {!!icon && <Icon icon={icon} width={20} height={20} />}
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.colorPrimary,
    borderColor: "transparent",
  },
  text: {
    textAlign: "center",
    color: "white",
  },
});
