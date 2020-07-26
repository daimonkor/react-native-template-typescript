import React from "react";
import { View, ViewProps } from "react-native";

export interface IShadowViewProps extends ViewProps {
  shadow: number;
}

export const ShadowView: React.FC<IShadowViewProps> = ({
  shadow,
  ...props
}) => {
  return (
    <View
      {...props}
      style={[
        {
          flex: 0,
          alignItems: "center",
          padding: props.style?.backgroundColor ? 0 :shadow / 1.5,
          justifyContent: "center",
          alignSelf: 'flex-start',

          /*iOS*/
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: shadow / 2,
          },
          shadowOpacity: 0.58 + shadow / 10,
          shadowRadius: (shadow * 90) / 100,
          paddingBottom: props.style?.backgroundColor ? 0 :shadow * 1.2,
          //backgroundColor: 'white

          /*Android*/
          elevation: shadow,
        },
        props.style,
      ]}
    >
      {props?.children?.length > 1 && (
        <View
          style={{
            flex: 0,
            padding: shadow / 1.7,
          }}
        >
          {props.children}
        </View>
      )}
      {props?.children &&
        !Array.isArray(props?.children) &&
        React.cloneElement(props.children, {
          ...{
            flex: 0,
            top: shadow / 2,
          },
          ...{ borderRadius: props?.style?.borderRadius },
        })}
    </View>
  );
};
