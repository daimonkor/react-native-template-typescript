import React, { ReactNode } from "react";
import { StyleSheet, View, TouchableOpacity, StatusBar } from "react-native";
import { Icon, Icons, PressableIcon, Text } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../theme";
import { apply } from "./strings.json";

export interface HeaderProps {
  title: string | Object;
  containerStyle?: Object;
  showBackButton?: boolean;
  onBackButtonPress?: () => void;
  onApplyButtonPress?: () => void;
  menuButton?: ReactNode;
  customNode?: ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
    title,
    containerStyle,
    showBackButton,
    onBackButtonPress,
    onApplyButtonPress,
    customNode,
    menuButton,
    ...props}) => {
  const navigation = useNavigation();
  return (
      <View
          style={[
            { overflow: "hidden", marginBottom: -10, zIndex: 9999 },
            containerStyle,
          ]}
      >
        <StatusBar
            backgroundColor={colors.headerBgColor}
            barStyle="dark-content"
        />
        <View style={styles.container}>
          {menuButton && <View style={styles.applyButton}>{menuButton}</View>}
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

          {typeof title === "string" && title && (
              <Text style={styles.text}>{title}</Text>
          )}
          {typeof title === "object" && title}

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
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    backgroundColor: colors.headerBgColor,

    /*iOS*/
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    /*Android*/
    elevation: 5,

    borderTopWidth: 0,
    marginBottom: 10,
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
    color: "#70CBC4",
    fontWeight: "normal",
  },
});

Header.defaultProps = {
  showBackButton: true,
};
