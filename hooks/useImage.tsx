"use client";
import { UploadedImage } from "@/interfaces/Interfaces";
import { useState } from "react";

export function useImages() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const img = new window.Image();
      img.src = url;
      img.onload = () => {
        const newImage = {
          id: Date.now().toString(),
          image: img,
          x: 150,
          y: 150,
          width: 300,
          height: 300,
        };
        setUploadedImages((prev) => [...prev, newImage]);
      };
    }
  };

  return {
    uploadedImages,
    setUploadedImages,
    handleFileChange,
  };
}
