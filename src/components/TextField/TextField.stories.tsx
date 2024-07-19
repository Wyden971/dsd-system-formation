import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";
import { FormProvider, useForm } from "react-hook-form";

const TextFieldMeta: Meta<typeof TextField> = {
  title: "TextField",
  component: TextField,
  argTypes: {
    onPress: { action: "pressed the button" },
  },
  args: {
    label: "Prénom",
    name: "firstName",
  },
  decorators: [
    (Story) => {
      const form = useForm({
        defaultValues: {
          firstName: "",
        },
      });

      return (
        <FormProvider {...form}>
          <View style={{ padding: 20 }}>
            <Story />
          </View>
        </FormProvider>
      );
    },
  ],
};

export default TextFieldMeta;

export const Basic: StoryObj<typeof TextField> = {};

export const TextFieldWithoutLabel: StoryObj<typeof TextField> = {
  args: {
    name: "firstName",
  },
};
