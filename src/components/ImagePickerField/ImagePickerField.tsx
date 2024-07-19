import { Image, Text, TouchableOpacity, View } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Iconify } from "react-native-iconify";
import { useImagePicker } from "@/hooks/useImagePicker";
export type Props = {
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
};

export const ImagePickerField = ({
  name,
  label,
  required,
  className,
}: Props) => {
  const form = useFormContext();
  const { pickImage } = useImagePicker();
  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error: fieldSetError },
      }) => {
        const fieldError = fieldSetError?.message;

        const handlePickImage = async () => {
          const isMulti = Array.isArray(value);
          const nextValue = await pickImage(isMulti);
          if (nextValue) {
            onChange(isMulti ? [...value, ...nextValue] : nextValue);
          }
        };
        return (
          <View className={twMerge("mb-5", className)}>
            {!!label?.trim().length && (
              <Text className={"mb-1 text-lg font-bold"}>
                {label}
                {required && "*"}
              </Text>
            )}
            <View className={"flex flex-row flex-gap gap-4 flex-wrap"}>
              {(Array.isArray(value) ? value : [value]).map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={
                    !Array.isArray(value)
                      ? handlePickImage
                      : () => {
                          onChange(value.filter((value) => value != item));
                        }
                  }
                >
                  <Image
                    className={"w-20 aspect-square bg-gray-100 rounded-xl"}
                    source={{ uri: item }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}

              {(Array.isArray(value) || !!value?.length) && (
                <TouchableOpacity onPress={handlePickImage}>
                  <View
                    className={
                      "w-20 aspect-square bg-gray-100 items-center justify-center rounded-xl"
                    }
                  >
                    <Iconify
                      icon={"mdi:image-plus-outline"}
                      size={30}
                      color={"black"}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
            {!!fieldError?.trim().length && (
              <Text className={"text-red-500"}>{fieldError}</Text>
            )}
          </View>
        );
      }}
    />
  );
};
