import React from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import { Divider, Text } from "../components";
import { useLocalization } from "../localization";
import { getLang } from "../constants";
import { useTheme } from "../theme";

const LangButton: React.FC<{
  title: string;
  isSelected: boolean;
  onPress: () => void;
}> = (props) => {
  const { colors, sizes } = useTheme();
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.buttonsContainer,
        {
          backgroundColor: colors.primaryColor,
        },
        !props.isSelected && {
          backgroundColor: colors.windowBackground,
          borderColor: colors.gray,
          borderWidth: 1,
        },
      ]}
    >
      <Text
        style={[
          styles.buttonTitleText,
          !props.isSelected && {
            color: colors.textColor,
          },
        ]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

type TProps = {
  isVisible: boolean;
  onDismissModal: () => void;
};

export const SettingsBottomSheet: React.FC<TProps> = (props) => {
  const { colors, changeTheme, isDark } = useTheme();
  const { getString, currentLanguage, changeLanguage } = useLocalization();

  return (
    <ReactNativeModal
      isVisible={props.isVisible}
      swipeDirection="down"
      style={styles.modal}
      onSwipeComplete={props.onDismissModal}
      onBackdropPress={props.onDismissModal}
      onBackButtonPress={props.onDismissModal}
    >
      <SafeAreaView
        style={[
          styles.safeAreaContainer,
          {
            backgroundColor: colors.windowBackground,
          },
        ]}
      >
        <View style={styles.modalContainer}>
          <View style={styles.section}>
            <Text
              style={[
                styles.titleText,
                {
                  color: colors.textColor,
                },
              ]}
            >
              {getString("selected_language")}
            </Text>
            <View style={styles.choseBoxes}>
              <LangButton
                title="EN"
                isSelected={currentLanguage() === "en"}
                onPress={() => changeLanguage(getLang("en"))}
              />
              <LangButton
                title="AR"
                isSelected={currentLanguage() === "ar"}
                onPress={() => changeLanguage(getLang("ar"))}
              />
            </View>
          </View>
          <Divider style={{ marginVertical: 12 }} />
          <View style={styles.section}>
            <Text
              style={[
                styles.titleText,
                {
                  color: colors.textColor,
                },
              ]}
            >
              {getString("theme")}
            </Text>
            <View style={styles.choseBoxes}>
              <LangButton
                title="LIGHT"
                isSelected={!isDark}
                onPress={() => changeTheme(false)}
              />
              <LangButton
                title="DARK"
                isSelected={isDark}
                onPress={() => changeTheme(true)}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  safeAreaContainer: {
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    minHeight: 300,
  },
  modalContainer: {
    padding: 24,
  },
  buttonsContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginHorizontal: 4,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  choseBoxes: { flexDirection: "row" },
  titleText: {
    flex: 1,
    fontFamily: "default-medium",
    fontSize: 15,
  },
  buttonTitleText: {
    color: "white",
    fontFamily: "default-medium",
    fontSize: 13,
  },
});
