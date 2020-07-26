import React from "react";
import { SafeAreaView, View } from "react-native";
import { colors } from "../../theme";

/*TODO: check on Android space bottom
import { SafeAreaView as SafeAreaViewCustom } from "react-native-safe-area-context";
 */

export interface SafeAreaViewBackgroundProps {
    statusBarBackground?: string;
    bottomEdgeBackground?: string;
    children: React.ReactNode;
}

export const SafeAreaViewBackground: React.FC<SafeAreaViewBackgroundProps> = ({
                                                                                  statusBarBackground,
                                                                                  bottomEdgeBackground,
                                                                                  children,
                                                                                  ...props
                                                                              }) => {
    return (
        <>
            <SafeAreaView
                style={[{ flex: 0 }, { backgroundColor: statusBarBackground }]}
                {...props}
            />
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: colors.background,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: bottomEdgeBackground,
                    }}
                >
                    {children}
                </View>
            </SafeAreaView>
            <SafeAreaView
                style={[{ flex: 0 }, { backgroundColor: bottomEdgeBackground }]}
            />
        </>
    );
};

SafeAreaViewBackground.defaultProps = {
    statusBarBackground: colors.headerBgColor,
    bottomEdgeBackground: colors.footerBgColor,
};
