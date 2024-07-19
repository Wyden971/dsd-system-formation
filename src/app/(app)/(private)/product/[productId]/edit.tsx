import { useNavigation } from "expo-router";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useProductFromSearchParams } from "@/hooks";
import { useEffect } from "react";
import { useProductContext } from "@/context";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { UpdateProductForm } from "@/components/ProductForms/UpdateProductForm";
import { Iconify } from "react-native-iconify";

const updateProductFormResolver = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  images: yup.array().of(yup.string().required()).min(1).required(),
});
export default function EditProductScreen() {
  const product = useProductFromSearchParams();
  const { setOptions, goBack } = useNavigation();

  const productContext = useProductContext();

  const form = useForm({
    resolver: yupResolver(updateProductFormResolver),
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      images: product?.images ?? [],
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    if (product) {
      productContext.udateProduct({
        ...product,
        ...values,
      });

      goBack();
    }
  });
  useEffect(() => {
    setOptions({
      title: "Modification",
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

  if (!product) {
    return null;
  }
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
            <UpdateProductForm />
            <View className={"flex flex-row items-center gap-x-2"}>
              <Iconify
                icon={"mdi:information-outline"}
                size={30}
                color={"#000"}
              />
              <Text className={"flex flex-1 text-gray-500"}>
                Attention, votre produit n'est pas encore synchronisé
              </Text>
            </View>
          </FormProvider>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
