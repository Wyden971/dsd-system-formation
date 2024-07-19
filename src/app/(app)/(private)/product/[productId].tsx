import { Link, useNavigation, usePathname, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { Image, ScrollView, FlatList, View } from "react-native";
import { Iconify } from "react-native-iconify";
import { useProductFromSearchParams } from "@/hooks";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useProductContext } from "@/context";

export default function ProductViewScreen() {
  const { setOptions, goBack } = useNavigation();
  const product = useProductFromSearchParams();
  const productContext = useProductContext();
  const pathname = usePathname();
  const router = useRouter();
  const { showActionSheetWithOptions } = useActionSheet();
  const showMenuOptions = useCallback(() => {
    showActionSheetWithOptions(
      {
        options: ["Editer", "Supprimer", "Annuler"],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1,
      },
      (result) => {
        switch (result) {
          case 0:
            router.push(`${pathname}/edit`);
            break;

          case 1:
            Alert.alert(
              "Suppression du produit",
              "Voulez-vous vraiment supprimer ce produit?",
              [
                {
                  text: "Oui",
                  style: "destructive",
                  onPress: () => {
                    if (product) {
                      productContext.deleteProduct(product);
                      goBack();
                    }
                  },
                },
                {
                  text: "Non",
                  style: "cancel",
                },
              ]
            );
            break;
        }
      }
    );
  }, []);
  useEffect(() => {
    if (product) {
      setOptions({
        title: product.name,
        headerRight: () => (
          <TouchableOpacity onPress={showMenuOptions}>
            <Iconify icon={"mdi:more-vert"} size={25} color={"#000"} />
          </TouchableOpacity>
        ),
      });
    }
  }, [product]);

  if (!product) {
    return null;
  }

  return (
    <ScrollView
      className={"flex flex-1"}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View>
        <FlatList
          className={"w-[100vw] aspect-square"}
          horizontal
          pagingEnabled
          data={product.images}
          keyExtractor={(image) => image}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: image }) => {
            return (
              <Image
                className={"w-[100vw] aspect-square"}
                resizeMode="cover"
                source={{ uri: image }}
              />
            );
          }}
        />
      </View>
      <View className={"p-4 bg-white"} style={{ flexGrow: 1 }}>
        <Text className={"text-center font-bold text-2xl"}>{product.name}</Text>
        <Text className={"text-center mt-4"}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}
