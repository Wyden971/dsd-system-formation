import { Button, ButtonLoginPlatform, TextField } from "@/components";
import { useAppContext } from "@/context";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Redirect } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { Iconify } from "react-native-iconify";
import * as yup from "yup";
import colors from "tailwindcss/colors";
const loginApi = (email: string, password: string) => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@test.com" && password === "testtest") {
        return resolve("rjerklgrojenrtolelrter");
      }
      return reject();
    }, 1000);
  });
};

const loginFormResolver = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});
export default function Login() {
  const appContext = useAppContext();

  const form = useForm({
    resolver: yupResolver(loginFormResolver),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const token = await loginApi(values.email, values.password);
      appContext.setAccessToken(token);
    } catch (e) {
      form.setError("email", {
        message: "Email incorrect",
      });
    }
  });

  if (appContext.accessToken?.length) {
    return <Redirect href={"(tabs)"} />;
  }

  return (
    <ScrollView>
      <View className={"p-4 bg-white "}>
        <FormProvider {...form}>
          <TextField
            name={"email"}
            label={"Votre email"}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
          />
          <TextField
            name={"password"}
            label={"Votre mot de passe"}
            secureTextEntry
            textContentType="password"
          />

          <Button
            label={"Se connecter"}
            onPress={onSubmit}
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            isLoading={form.formState.isSubmitting}
          />

          <Text className={"text-center p-10"}>Ou</Text>

          <Link
            href={"/explore"}
            asChild
            disabled={!appContext.accessToken?.length}
          >
            <ButtonLoginPlatform color={"success"} onPress={() => {}} />
          </Link>
        </FormProvider>
      </View>
    </ScrollView>
  );
}
