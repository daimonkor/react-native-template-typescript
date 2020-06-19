import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  KeyboardTypeOptions,
  Platform,
  StyleSheet,
  TextInput as ReactNativeTextInput,
} from "react-native";
import { colors } from "../../theme";
import { please_input_valid_value } from "./strings.json";

export interface ErrorData {
  isError: boolean;
  error: string | null;
}

export interface Validator {
  test: (text: string | null) => boolean;
}

export interface TextInputProps {
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (text: string) => void;
  validator?: RegExp | Validator;
  value?: string;
  catchError?: (error: ErrorData) => void;
  style?: Object;
  maxLength?: number;
  disabled?: boolean;
}

export const StandardTextInput = forwardRef<any, TextInputProps>(
  ({ children, ...props }, ref) => (
    <ReactNativeTextInput
      {...props}
      style={[styles.standardText, props.style]}
      ref={ref}
    >
      {children}
    </ReactNativeTextInput>
  )
);

export const TextInput = forwardRef<any, TextInputProps>(
  (
    {
      value,
      onChangeText,
      validator,
      keyboardType,
      catchError,
      style,
      maxLength,
      disabled,
      ...props
    },
    ref
  ) => {
    const [error, setError] = useState<boolean | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        validate,
      }),
      []
    );

    /*:TODO customValue hack for checking value before setState*/
    const validate = (customValue: string | null) => {
      if (validator && !validator.test(customValue ?? value)) {
        setError(true);
        catchError &&
          catchError({ isError: true, error: please_input_valid_value });
      } else {
        setError(null);
        catchError && catchError({ isError: false, error: null });
      }
    };

    return (
      <StandardTextInput
        editable={!disabled}
        ref={ref}
        value={value}
        autoCapitalize={"none"}
        autoCorrect={false}
        maxLength={maxLength}
        onChangeText={(e) => {
          validate(e);
          onChangeText && onChangeText(e);
        }}
        {...(keyboardType && { keyboardType: keyboardType })}
        style={[
          styles.textInput,
          error != null && { borderColor: colors.errorColor },
          style,
          disabled && { backgroundColor: "#e6e6e6" },
        ]}
        {...props}
      />
    );
  }
);

TextInput.defaultProps = {
  maxLength: 2,
};

const styles = StyleSheet.create({
  textInput: {
    textAlign: "center",
    borderWidth: 1,
    flex: 1,
    padding: Platform.select({ android: 0, ios: 6 }),
    margin: 0,
    paddingHorizontal: 10,
    borderColor: "#BABABA",
  },
  standardText: {
    fontFamily: "CircularXX-Regular",
    color: colors.textColorPrimary,
  },
});
