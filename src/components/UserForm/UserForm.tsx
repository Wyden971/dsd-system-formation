import { User } from "@/models";
import { View, Text } from "react-native";
import { TextField, TextFieldHandle } from "../TextField";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../Button";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

export type Props = {
  user?: User;
  onSuccess: () => void;
  onSave: (user: Partial<User>) => Promise<User>;
};

const userFormSchema = yup.object({
  firstName: yup.string().required("Le prénom est obligatoire"),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  telephone: yup
    .string()
    .matches(/^(\+33|0)(\d{9})$/g, "Le numéro de téléphone est incorrecte")
    .required(),
  age: yup.number().min(18, "Vous devez être majeur").required(),
  objets: yup.array().of(yup.string().required()).min(3).required(),
});

const USER_FORM_DEFAULT_VALUES = {
  firstName: "Wendy",
  lastName: "JEAN-LOUIS",
  email: "jeanlouis.wendy@gmail.com",
  telephone: "+33626071310",
  age: "32" as unknown as number,
  objets: ["Obj 1", "Obj 2", "Obj 3"],
};

export const UserForm = ({ user, onSuccess, onSave }: Props) => {
  const firstNameRef = useRef<TextFieldHandle>();
  const lastNameRef = useRef<TextFieldHandle>();
  const emailRef = useRef<TextFieldHandle>();
  const telephoneRef = useRef<TextFieldHandle>();
  const ageRef = useRef<TextFieldHandle>();

  const form = useForm({
    resolver: yupResolver(userFormSchema),
    defaultValues: USER_FORM_DEFAULT_VALUES,
  });

  const objets = form.watch("objets");
  //firstName

  const onSubmit = form.handleSubmit(async (values) => {
    console.log("values : ", JSON.stringify(values, null, 4));

    await onSave({
      id: user?.id,
      ...values,
    });

    await onSuccess();
  });

  console.log("form: ", form.formState.errors);
  useEffect(() => {
    form.reset({
      firstName: user?.firstName ?? USER_FORM_DEFAULT_VALUES.firstName,
      lastName: user?.lastName ?? USER_FORM_DEFAULT_VALUES.lastName,
      email: user?.email ?? USER_FORM_DEFAULT_VALUES.email,
      telephone: user?.telephone ?? USER_FORM_DEFAULT_VALUES.telephone,
      age: user?.age ?? USER_FORM_DEFAULT_VALUES.age,
      objets: user?.objets ?? USER_FORM_DEFAULT_VALUES.objets,
    });
  }, [user]);

  return (
    <FormProvider {...form}>
      <View className={"mb-5"}>
        <TextField
          ref={firstNameRef}
          label={"Prénom"}
          name={"firstName"}
          placeholder="Saisir votre prénom"
          required
          returnKeyType="next"
          onSubmitEditing={() => {
            lastNameRef.current?.focus();
          }}
        />

        <TextField
          ref={lastNameRef}
          label={"Nom"}
          name={"lastName"}
          placeholder="Saisir votre nom de famille"
          required
          returnKeyType="next"
          onSubmitEditing={() => {
            emailRef.current?.focus();
          }}
        />

        <TextField
          ref={emailRef}
          label={"Email"}
          name={"email"}
          placeholder="Saisir votre adresse email"
          required
          keyboardType="email-address"
          returnKeyType="next"
          autoCapitalize="none"
          onSubmitEditing={() => {
            telephoneRef.current?.focus();
          }}
        />

        <TextField
          ref={telephoneRef}
          label={"Téléphone"}
          name={"telephone"}
          placeholder="Saisir votre numéro de portable"
          required
          keyboardType="phone-pad"
          returnKeyType="next"
          onSubmitEditing={() => {
            ageRef.current?.focus();
          }}
        />

        <TextField
          ref={ageRef}
          label={"Âge"}
          name={"age"}
          placeholder="Quel age avez-vous?"
          required
          keyboardType="number-pad"
          returnKeyType="done"
          onSubmitEditing={() => {
            alert("submit");
          }}
        />

        {!!form.formState.errors.objets?.message && (
          <Text className={"text-red-500"}>
            {form.formState.errors.objets?.message}
          </Text>
        )}
        {objets.map((objId, index) => (
          <View
            key={objId || index.toString()}
            className={"flex flex-row flex-center gap-x-4"}
          >
            <TextField
              className="flex-1"
              label={`Objet ${index + 1}`}
              name={`objets[${index}]`}
              placeholder="Saisir votre objet"
              required
              returnKeyType={index === objets.length - 1 ? "done" : "next"}
              onSubmitEditing={() => {}}
            />
            <Button
              className={"mt-9 py-2"}
              label="-"
              onPress={() => {
                objets.splice(index, 1);
                console.log("objets : ", objets);
                form.setValue("objets", [...objets]);
              }}
            />
          </View>
        ))}

        <Button
          label={"Ajouter"}
          onPress={() => {
            form.setValue("objets", [...objets, ""]);
          }}
        />

        <Button
          className={"mt-5"}
          color={"error"}
          label="Enregistrer"
          onPress={onSubmit}
          disabled={!form.formState.isDirty}
        />
      </View>
    </FormProvider>
  );
};
