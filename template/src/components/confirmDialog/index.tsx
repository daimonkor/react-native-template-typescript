import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { StyleSheet, TouchableOpacity, View, StatusBar } from "react-native";
import {Text} from "./.."
import { colors } from "../../theme";
import {pSBC} from "../../utils";

export enum ModalState {
  CANCEL,
  CONFIRM,
  NONE,
}

export type ConfirmDialogState = {
  confirmModalVisible: boolean;
  onConfirm?: () => void;
  onModalHide?: () => void;
  onCancel?: () => void;
  mainText?: string;
  title?: string;
};

export interface ConfirmModalProps {
  visible?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  title?: string | null;
  mainText?: string | null;
  containerStyles?: Object;
  statusBarBlendColor?: string;
  onModalHide?: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  title,
  mainText,
  containerStyles,
  statusBarBlendColor,
  onModalHide,
  ...props
}) => {
  const [modalState, setModalState] = useState<ModalState>(ModalState.NONE);
  const [ownVisible, setOwnVisible] = useState<boolean | undefined>(false);

  useEffect(() => {
    setOwnVisible(visible);
  }, [visible]);

  return (
    <Modal
      useNativeDriver
      style={{ margin: 0 }}
      isVisible={ownVisible}
      backdropOpacity={0.4}
      animationIn={"slideInDown"}
      animationOut={"slideOutDown"}
      onModalHide={() => {
        switch (modalState) {
          case ModalState.CANCEL:
            onCancel && onCancel();
            break;
          case ModalState.CONFIRM:
            onConfirm && onConfirm();
            break;
          case ModalState.NONE:
            break;
        }
        onModalHide && onModalHide();
      }}
      onBackButtonPress={() => {
        setOwnVisible(false);
        setModalState(ModalState.CANCEL);
      }}
    >
      {visible && (
          <StatusBar
              animated={true}
              backgroundColor={
                statusBarBlendColor
                    ? statusBarBlendColor
                    : pSBC(0.64, colors.headerBgColor, "#000000")
              }
              barStyle="dark-content"
          />
      )}
      <View style={styles.confirmModal}>
        {title && <Text style={styles.title}>{title}</Text>}
        <Text style={styles.message}>{mainText}</Text>
        <View style={styles.confirmModalButtonsHolder}>
          <TouchableOpacity
            onPress={() => {
              setOwnVisible(false);
              setModalState(ModalState.CONFIRM);
            }}
          >
            <Text style={styles.dialogButtonText}>Ok</Text>
          </TouchableOpacity>
          {onCancel && (
            <TouchableOpacity
              style={{ marginLeft: 25 }}
              onPress={() => {
                setOwnVisible(false);
                setModalState(ModalState.CANCEL);
              }}
            >
              <Text style={styles.dialogButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  confirmModal: {
    backgroundColor: "white",

    width: "80%",
    alignSelf: "center",
    padding: "6%",

    margin: 0, // This is the important style you need to set
    alignItems: undefined,
    justifyContent: undefined,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 8,
  },
  title: {
    fontSize: 20,
    color: colors.textColorPrimary,
    textAlign: "left",
  },
  message: {
    fontSize: 16,
    color: colors.textColorPrimary,
    textAlign: "left",
    lineHeight: 30,
    marginTop: 10,
  },
  confirmModalButtonsHolder: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 15,
  },
  dialogButtonText: {
    fontSize: 14,
    color: colors.textColorPrimary,
  },
});
