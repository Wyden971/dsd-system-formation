import { useProductContext } from "../context";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

export const useProductFromSearchParams = () => {
  const { productId } = useLocalSearchParams<{ productId: string }>();

  const productContext = useProductContext();

  const product = useMemo(() => {
    return productContext.products.find((product) => product.id === productId);
  }, [productId, productContext.products]);

  return product;
};
