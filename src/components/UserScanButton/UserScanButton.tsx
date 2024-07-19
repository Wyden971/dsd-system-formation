import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Iconify } from "react-native-iconify";
import { BottomSheetBackdrop } from "../BottomSheetBackdrop";
import { CameraView } from "expo-camera";
import { Button } from "../Button";
import { useCameraPermissions } from "expo-image-picker";

export type Props = {
  onUserFound: (userId: string) => void;
};

export const UserScanButton = ({ onUserFound }: Props) => {
  const [code, setCode] = useState<string>();

  const snapPoints = useMemo(() => {
    return ["50%"];
  }, []);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (code) {
      bottomSheetModalRef.current?.dismiss();
      onUserFound(code);
    }
  }, [code]);
  return (
    <>
      <TouchableOpacity
        className={"py-2 px-2"}
        onPress={() => {
          setCode(undefined);
          bottomSheetModalRef.current?.present();
        }}
      >
        <Iconify icon={"mdi:qrcode-scan"} size={25} color={"#000"} />
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={BottomSheetBackdrop}
      >
        <BottomSheetView className={"flex-1"}>
          <View className={" flex-1"}>
            {!permission?.granted && (
              <Button
                onPress={() => requestPermission()}
                label={"Accepter la camera"}
              />
            )}
            {permission?.granted && (
              <CameraView
                style={{
                  flex: 1,
                }}
                facing={"back"}
                barcodeScannerSettings={{
                  barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={(result) => {
                  if (result.data) {
                    setCode(result.data);
                  }
                }}
              ></CameraView>
            )}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
