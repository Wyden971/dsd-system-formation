import { CreateProductForm } from "@/components";
import { useProductContext } from "@/context";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigation } from "expo-router";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Platform,
} from "react-native";
import * as yup from "yup";

const createProductFormResolver = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  images: yup.array().of(yup.string().required()).required().min(1),
});

export default function CreateProductScreen() {
  const { setOptions, goBack } = useNavigation();
  const productContext = useProductContext();

  const form = useForm({
    resolver: yupResolver(createProductFormResolver),
    defaultValues: {
      name: "",
      description: "",
      images: [],
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    productContext.addProduct({
      id: "product-" + productContext.products.length,
      ...values,
    });
    goBack();
  });
  useEffect(() => {
    setOptions({
      title: "Nouveau produit",
      headerRight: () => {
        return (
          <TouchableOpacity onPress={onSubmit}>
            <View>
              <Text className={"text-blue-500 font-bold"}>Enregistrer</Text>
            </View>
          </TouchableOpacity>
        );
      },
    });
  });

  return (
    <KeyboardAvoidingView
      className={"flex-1"}
      behavior={Platform.select({
        ios: "padding",
        android: "height",
      })}
      keyboardVerticalOffset={Platform.select({
        android: 30,
      })}
    >
      <ScrollView className={"flex-1"}>
        <View className={"bg-white p-5"}>
          <FormProvider {...form}>
            <CreateProductForm />
          </FormProvider>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
