import { forwardRef, useImperativeHandle, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { twMerge } from "tailwind-merge";
export interface Props extends TextInputProps {
  label?: string;
  name: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export type TextFieldHandle = {
  focus: () => void;
};

export const TextField = forwardRef(
  (
    { label, placeholder, name, error, required, className, ...props }: Props,
    ref
  ) => {
    const inputRef = useRef<TextInput>(null);
    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          inputRef.current?.focus();
        },
      }),
      []
    );

    const form = useFormContext();
    return (
      <Controller
        name={name}
        control={form.control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error: fieldSetError },
        }) => {
          const fieldError = fieldSetError?.message || error;

          return (
            <View className={twMerge("mb-5", className)}>
              {!!label?.trim().length && (
                <Text className={"mb-1 text-lg font-bold"}>
                  {label}
                  {required && "*"}
                </Text>
              )}

              <TextInput
                ref={inputRef}
                className={twMerge(
                  " bg-gray-100 text-back rounded-lg px-5",
                  !props.multiline && "h-[50px]",
                  props.multiline && "min-h-[100px]"
                )}
                underlineColorAndroid={"transparent"}
                placeholder={placeholder ?? label}
                value={value.toString()}
                onChangeText={onChange}
                onBlur={onBlur}
                {...props}
              />
              {!!fieldError?.trim().length && (
                <Text className={"text-red-500"}>{fieldError}</Text>
              )}
            </View>
          );
        }}
      />
    );
  }
);
