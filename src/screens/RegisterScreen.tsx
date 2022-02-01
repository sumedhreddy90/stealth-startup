import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Alert, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ReactNativeModal from "react-native-modal";
import SafeAreaView from "react-native-safe-area-view";

import {
  TextInput,
  Separator,
  PrimaryButton,
  HeaderLine,
  KeyboardView,
  Text,
  CheckBox,
  HtmlView,
} from "../components";
import { AuthenticationContext } from "../context";
import { useLocalization } from "../localization";
import { AuthService, AppSettingsService } from "../services";
import { useTheme } from "../theme";

const WIDTH = Dimensions.get("screen").width;

export const RegisterScreen = () => {
  const authContext = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const { getString } = useLocalization();
  const { colors, sizes } = useTheme();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userTermsShowModal, setUserTermsShowModal] = useState(false);
  const [userTermsText, setUserTermsText] = useState("");
  const [userTermsConfirm, setUserTermsConfirm] = useState(false);

  const onClickBackToLogin = () => navigation.goBack();

  const onClickRegister = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      username === "" ||
      password === ""
    ) {
      Alert.alert(getString("please_fill_fields"));
      return;
    }
    if (!userTermsConfirm) {
      Alert.alert(getString("you_must_confirm_user_terms"));
      return;
    }

    AuthService.register(firstName, lastName, email, username, password)
      .then(async (user) => {
        await authContext.login(user);
        // x2 goback for first and register screens.
        navigation.goBack();
        navigation.goBack();
      })
      .catch((e) => Alert.alert(e.message));
  };

  useEffect(() => {
    AppSettingsService.getAppSettings().then((res) =>
      setUserTermsText(res.data.userTerms)
    );
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
        <KeyboardView style={styles.content}>
          <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <Text style={[styles.titleText, { color: colors.primaryColor }]}>
              {getString("register_upper")}
            </Text>
            <TextInput
              inputProps={{
                placeholder: getString("first_name"),
                value: firstName,
                onChangeText: setFirstName,
              }}
            />
            <Separator height={16} />
            <TextInput
              inputProps={{
                placeholder: getString("last_name"),
                value: lastName,
                onChangeText: setLastName,
              }}
            />
            <Separator height={16} />
            <TextInput
              inputProps={{
                placeholder: getString("email"),
                value: email,
                onChangeText: setEmail,
              }}
            />
            <Separator height={16} />
            <TextInput
              inputProps={{
                placeholder: getString("username"),
                value: username,
                onChangeText: setUsername,
              }}
            />
            <Separator height={16} />
            <TextInput
              inputProps={{
                placeholder: getString("password"),
                secureTextEntry: true,
                value: password,
                onChangeText: setPassword,
              }}
            />
            <Separator height={24} />
            <CheckBox
              text={getString("user_term_confirm_text")}
              isChecked={userTermsConfirm}
              onPress={() => {
                if (userTermsConfirm) setUserTermsConfirm(false);
                else setUserTermsShowModal(true);
              }}
              style={{ marginStart: 4 }}
            />
            <Separator height={24} />
            <PrimaryButton
              title={getString("register_upper")}
              onPress={onClickRegister}
            />
            <TouchableOpacity
              style={styles.registerButton}
              onPress={onClickBackToLogin}
            >
              <Text style={{ color: colors.gray }}>
                {getString("back_to_login")}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardView>
        <HeaderLine />
      </SafeAreaView>
      <ReactNativeModal
        isVisible={userTermsShowModal}
        style={{ margin: 16 }}
        backdropOpacity={0.5}
        swipeDirection="down"
        onSwipeComplete={() => setUserTermsShowModal(false)}
      >
        <SafeAreaView forceInset={{ top: "always", bottom: "always" }}>
          <ScrollView
            style={[
              styles.modalContainer,
              {
                backgroundColor: colors.windowBackground,
              },
            ]}
            contentContainerStyle={styles.modalContentContainer}
          >
            <HtmlView
              htmlContent={userTermsText}
              imagesMaxWidthOffset={WIDTH - 32}
            />
            <PrimaryButton
              title={getString("confirm")}
              onPress={() => {
                setUserTermsShowModal(false);
                setUserTermsConfirm(true);
              }}
            />
          </ScrollView>
        </SafeAreaView>
      </ReactNativeModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  titleText: {
    fontSize: 42,
    fontFamily: "default-light",
    marginBottom: 24,
  },
  registerButton: {
    alignSelf: "center",
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  modalContainer: {
    borderRadius: 12,
  },
  modalContentContainer: {
    padding: 16,
  },
});
