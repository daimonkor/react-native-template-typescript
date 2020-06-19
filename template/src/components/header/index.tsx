import React, { ReactNode } from "react";
import { StyleSheet, View, TouchableOpacity, StatusBar } from "react-native";
import { Icon, Icons, PressableIcon, Text } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../theme";
import { apply } from "./strings.json";

export interface HeaderProps {
  title: string;
  containerStyle?: Object;
  showBackButton?: boolean;
  onBackButtonPress?: () => void;
  onApplyButtonPress?: () => void;
  customNode?: ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  containerStyle,
  showBackButton,
  onBackButtonPress,
  onApplyButtonPress,
  customNode,
  ...props
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar
        backgroundColor={colors.headerBgColor}
        barStyle="dark-content"
      />
      {showBackButton &&
        ((!onBackButtonPress && navigation.canGoBack()) ||
          onBackButtonPress) && (
          <PressableIcon
            style={styles.backButton}
            onPress={onBackButtonPress}
            {...(!onBackButtonPress && {
              onPress: () => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                }
              },
            })}
          >
            <Icon icon={Icons.back} width={20} height={20} />
          </PressableIcon>
        )}
      {onApplyButtonPress && (
        <TouchableOpacity
          style={styles.applyButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={onApplyButtonPress}
        >
          <Text>{apply}</Text>
        </TouchableOpacity>
      )}
      {customNode && <>{customNode}</>}

      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.headerBgColor,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  backButton: {
    position: "absolute",
    left: 15,
  },
  applyButton: {
    position: "absolute",
    right: 15,
  },
  text: {
    fontSize: 20,
  },
});

Header.defaultProps = {
  showBackButton: true,
};
