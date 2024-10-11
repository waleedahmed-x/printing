import React from "react";
import { Input } from "@/components/ui/input";
import { AddImage } from "@/components/icons/Icons";
import Image from "next/image";
import { ImagePickerProps } from "@/interfaces/Interfaces";

export default function ImagePicker({
  handleFileChange,
  uploadedImages,
}: ImagePickerProps) {
  const hasImages = uploadedImages.length > 0;
  const lastImage = hasImages
    ? uploadedImages[uploadedImages.length - 1].image.src
    : null;

  return (
    <div className="imagepicker-parent">
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="imagepicker"
      />
      {lastImage && (
        <Image
          src={lastImage}
          alt="Uploaded"
          layout="fill"
          objectFit="contain"
          className="w-full h-full opacity-1 rounded-lg"
        />
      )}
      <div className="icon-text">
        <AddImage />
        <span className="text-sm font-semibold">
          {hasImages ? "Add another" : "Add Image"}
        </span>
      </div>
    </div>
  );
}
