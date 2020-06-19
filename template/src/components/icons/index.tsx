import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  LayoutChangeEvent,
  TouchableOpacityProps,
} from "react-native";
import back from "../../../assets/icons/back.svg";
import { SvgProps } from "react-native-svg";

export const Icons = {
  back,
};

export interface IProps {
  icon: React.FC<SvgProps>;
  width?: number | null;
  height?: number | null;
  style?: Object;
  onLayout?: (event: LayoutChangeEvent) => void;
  calculatedWidth?: any;
  calculatedHeight?: any;
}

export const Icon: React.FC<IProps> = ({
  icon: SelectedIcon,
  width,
  height,
  style,
  calculatedWidth,
  calculatedHeight,
  onLayout,
  ...props
}) => {
  let svgWidth;
  let svgHeight;

  if (width && height) {
    const size = { width, height }; // calculateSize(
    svgWidth = size.width;
    svgHeight = size.height;
  }

  return (
    <View style={style} onLayout={onLayout}>
      <SelectedIcon
        width={calculatedWidth || svgWidth}
        height={calculatedHeight || svgHeight}
      />
    </View>
  );
};

Icon.defaultProps = {
  style: {},
  width: null,
  height: null,
  calculatedWidth: null,
  calculatedHeight: null,
};

export interface IPressableIcon {
  onPress?: () => void;
  activeOpacity?: number;
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  touchable: {
    minHeight: 24,
    minWidth: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export const PressableIcon: React.FC<IPressableIcon & TouchableOpacityProps> = (
  props
) => {
  const { onPress, children, activeOpacity, ...params } = props;

  return (
    <TouchableOpacity
      style={styles.touchable}
      {...props}
      activeOpacity={onPress ? activeOpacity : 1}
      {...params}
      hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
    >
      {children}
    </TouchableOpacity>
  );
};

PressableIcon.defaultProps = {
  onPress: () => {},
  activeOpacity: 0.6,
};
