import { Product } from "@/models";
import { createContext } from "react";

export type TProductContext = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  udateProduct: (product: Product) => void;
  deleteProduct: (product: Product) => void;
};
export const ProductContext = createContext<TProductContext>(
  {} as TProductContext
);
