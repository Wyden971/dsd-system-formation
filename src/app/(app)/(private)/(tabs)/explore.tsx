import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Button, ProductListItem } from "@/components";
import { useProductContext } from "@/context";
import { Link, useNavigation } from "expo-router";
import { Iconify } from "react-native-iconify";
import { Product } from "@/models";

export default function TabTwoScreen() {
  const { products } = useProductContext();
  const { setOptions } = useNavigation();
  const [page, setPage] = useState(1);
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function apiGetProducts(page: number) {
    return new Promise<Product[]>((resolve, reject) => {
      const data = [...Array(1000)].map((item, index) => ({
        ...products[0],
        id: "produit-" + index,
        name: "Produit " + index,
      }));
      setTimeout(() => {
        resolve(data.slice((page - 1) * 50, page * 50));
      }, 100);
    });
  }

  const loadProducts = useCallback(
    (nextPage: number) => {
      if (isLoading) {
        return;
      }
      setIsLoading(true);
      apiGetProducts(nextPage)
        .then((newProducts) => {
          setProductList(
            nextPage === 1 ? newProducts : [...productList, ...newProducts]
          );
          setPage(nextPage);
        })
        .finally(() => setIsLoading(false));
    },
    [isLoading, productList]
  );

  useEffect(() => {
    loadProducts(1);
  }, []);

  useEffect(() => {
    setOptions({
      title: productList.length + " produits chargés",
      headerRight: () => {
        return (
          <Link href={"/product/create"} asChild>
            <TouchableOpacity className={"py-2 px-4"}>
              <Iconify icon={"mdi:add"} size={25} color={"#000"} />
            </TouchableOpacity>
          </Link>
        );
      },
    });
  }, [productList.length]);

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={page === 1 && isLoading}
          onRefresh={() => {
            setPage(1);
            setProductList([]);
            loadProducts(1);
          }}
        />
      }
      data={productList}
      keyExtractor={(product) => product.id}
      contentContainerClassName="py-5"
      renderItem={({ item: product }) => {
        return (
          <ProductListItem
            href={`/product/${product.id}`}
            title={product.name}
            description={product.description}
            image={product.images[0]}
          />
        );
      }}
      ListFooterComponent={
        productList.length >= 50 ? (
          <View className={"items-center justify-center p-4"}>
            <ActivityIndicator animating={isLoading} hidesWhenStopped />
          </View>
        ) : null
      }
      ListEmptyComponent={
        <View className={"bg-white py-20 p-10 items-center"}>
          <Text className={"text-center mb-2"}>Vous n'avez aucun produits</Text>
          <Link href={"/product/create"} asChild>
            <Button
              className={"py-2 px-2 w-[200px]"}
              label={"Ajouter un produit"}
            />
          </Link>
        </View>
      }
      ItemSeparatorComponent={() => <View className={"h-5 bg-transparent"} />}
      onEndReachedThreshold={5}
      onEndReached={() => {
        loadProducts(page + 1);
      }}
    />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
