import { IconEmail, IconPassword } from "@/icons/Icon";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import TButton from "@/lib/buttons/TButton";
import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";
import { useLoginMutation } from "@/redux/apiSlices/authApiSlices";
import { PrimaryColor } from "@/utils/utils";
import { toast } from "@backpackapp-io/react-native-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Checkbox } from "react-native-ui-lib";

const login = () => {
  const router = useRouter();
  const [checkBox, setCheckBox] = useState(false);
  const [login] = useLoginMutation();

  const handleFromSubmit = async (values) => {
    console.log(values);
    try {
      const res = await login(values).unwrap();
      if (res.status) {
        AsyncStorage.setItem("token", res?.data?.access_token);
        router?.push("/home");
      } else {
        toast(res.message, {
          icon: "❗",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    // check email valid
    if (!values.email.includes("@")) {
      errors.email = "Invalid email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const { top } = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={top}
    >
      <View style={tw`flex-1 bg-white justify-end`}>
        <View style={tw`flex-1 justify-center items-center gap-0`}>
          <Image
            style={tw`w-72 h-20`}
            resizeMode="cover"
            source={require("@/assets/images/logo.png")}
          />
          <Text style={tw`text-xl font-PoppinsSemiBold text-primary`}>
            Login to your account
          </Text>
        </View>

        <View style={tw`bg-primary w-full p-4 rounded-t-[2rem] pt-8 pb-5`}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleFromSubmit}
            validate={validate}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
            }) => (
              <>
                <View style={tw`gap-5`}>
                  <InputText
                    textInputProps={{
                      placeholder: "Enter your email",
                    }}
                    svgFirstIcon={IconEmail}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    touched={touched.email}
                    errorText={errors.email}
                  />
                  <InputText
                    textInputProps={{
                      placeholder: "Enter your password",
                    }}
                    svgFirstIcon={IconPassword}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    touched={touched.password}
                    errorText={errors.password}
                  />
                </View>

                <View
                  style={tw`gap-4 py-8 flex-row items-center justify-between`}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setCheckBox(!checkBox);
                    }}
                    style={tw`flex-row items-center gap-2`}
                  >
                    <Checkbox
                      color="white"
                      iconColor={PrimaryColor}
                      value={checkBox}
                      size={20}
                      containerStyle={tw` rounded`}
                      onValueChange={setCheckBox}
                    />
                    <Text style={tw`text-white text-sm font-PoppinsRegular`}>
                      Remember me
                    </Text>
                  </TouchableOpacity>
                  <Link
                    href="/auth/forget_password"
                    style={tw`text-white text-sm underline font-PoppinsRegular`}
                  >
                    Forgot Password?
                  </Link>
                </View>
                <TButton
                  title="Login"
                  onPress={() => {
                    handleSubmit();
                    // router.push("/home");
                  }}
                  containerStyle={tw`w-full bg-white`}
                  titleStyle={tw`text-primary text-base font-PoppinsSemiBold`}
                />
              </>
            )}
          </Formik>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default login;
