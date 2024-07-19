import { View, Text } from "react-native";
import { TextField } from "../TextField";
import { ImagePickerField } from "../ImagePickerField";

export type Props = {};

export const CreateProductForm = () => {
  return (
    <View>
      <TextField required label={"Nom du produit"} name={"name"} />
      <TextField
        required
        label={"Descritption du produits"}
        name={"description"}
        multiline
      />
      <ImagePickerField name={"images"} label={"Photos du produits"} required />
    </View>
  );
};
