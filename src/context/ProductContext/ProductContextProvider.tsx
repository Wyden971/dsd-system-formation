import { ReactNode, useEffect, useReducer, useState } from "react";
import { ProductContext, TProductContext } from "./ProductContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Props = {
  children: ReactNode;
};

export const ProductContextProvider = ({ children }: Props) => {
  const [isReady, setIsReady] = useState(false);

  const [state, dispatch] = useReducer(
    (state: TProductContext, action: any) => {
      switch (action.type) {
        case "SET_PRODUCTS":
          return {
            ...state,
            products: action.products,
          };

        case "UPDATE_PRODUCT":
          return {
            ...state,
            products: state.products.map((product) => {
              if (product.id === action.product.id) {
                return action.product;
              }
              return product;
            }),
          };

        case "ADD_PRODUCT":
          return {
            ...state,
            products: [...state.products, action.product],
          };

        case "DELETE_PRODUCT":
          return {
            ...state,
            products: state.products.filter(
              (product) => product.id !== action.product.id
            ),
          };
      }
      return {
        ...state,
      };
    },
    {
      products: [],
      setProducts: (products: TProductContext["products"]) =>
        dispatch({
          type: "SET_PRODUCTS",
          products,
        }),
      udateProduct: (product: TProductContext["products"][number]) =>
        dispatch({
          type: "UPDATE_PRODUCT",
          product,
        }),
      addProduct: (product: TProductContext["products"][number]) =>
        dispatch({
          type: "ADD_PRODUCT",
          product,
        }),
      deleteProduct: (product: TProductContext["products"][number]) =>
        dispatch({
          type: "DELETE_PRODUCT",
          product,
        }),
    }
  );

  useEffect(() => {
    AsyncStorage.getItem("@product_context")
      .then((data) => {
        try {
          const context = JSON.parse(data!) ?? {};
          Object.assign(state, context);
        } catch (e) {}
      })
      .finally(() => setIsReady(true));
  }, []);

  useEffect(() => {
    if (isReady) {
      AsyncStorage.setItem(
        "@product_context",
        JSON.stringify({
          products: state.products,
        })
      );
    }
  }, [state.products, isReady]);

  if (!isReady) {
    return null;
  }
  return (
    <ProductContext.Provider value={state}>{children}</ProductContext.Provider>
  );
};
