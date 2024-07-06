import React from "react";
import { TouchableOpacity, View } from "react-native";
import Text from "../../foundation/Text/Text";
import Icon, { MaterialIconType } from "../../foundation/Icon/Icon";
import UserPhoto from "../../structure/UserPhoto/UserPhoto";
import Spinner from "../../feedback/Spinner/Spinner";

import clsx from "clsx";
import { usePickImageUpload } from "@/hooks/media/useImagePickUpload";
import { Control, useController } from "react-hook-form";
import { deleteFile } from "@/utils/s3";

export interface ImagePickerProps {
  image?: string;
  name?: string;
  icon?: MaterialIconType;
  onItemSelect?: (image: string) => void;
  onItemDelete?: (image: string) => void;
  helperText?: string | null;
  error?: boolean | null;
  control?: Control<any, any>;
  className?: string;
  style?: object[];
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  image,
  name,
  icon,
  onItemSelect,
  onItemDelete,
  helperText,
  error,
  control,
  style,
}) => {
  const { pickImage, isLoading } = usePickImageUpload();
  const { field, fieldState, formState } = useController({
    control,
    defaultValue: "",
    name: name || "",
  });

  const handlePress = async () => {
    const url = await pickImage(field.value);
    field.onChange(url);
  };

  const handleDelete = async () => {
    await deleteFile(field.value);
    field.onChange("");
  };

  return (
    <>
      <View
        className={clsx("flex-1 max-w-[50%] aspect-square self-center shadow")}
        style={style}
      >
        {field.value ? (
          <UserPhoto
            source={{ uri: field.value }}
            onPress={handlePress}
            iconButton="delete"
            onButtonPress={handleDelete}
          />
        ) : (
          <TouchableOpacity
            onPress={handlePress}
            className={clsx(
              "aspect-square w-full",
              "rounded-full",
              "overflow-hidden",
              "justify-center items-center",
              !field.value && "bg-gray-300",
              error && "text-red-500"
            )}
          >
            {icon && !isLoading && (
              <Icon
                name={icon}
                className={clsx(
                  "text-4xl text-gray-600",
                  error && "text-red-500"
                )}
              />
            )}
            {isLoading && <Spinner />}
          </TouchableOpacity>
        )}
      </View>
      {helperText && (
        <Text
          className={clsx(
            "text-sm mt-1",
            "text-gray-2",
            error && "text-danger"
          )}
        >
          {helperText}
        </Text>
      )}
    </>
  );
};

export default ImagePicker;
