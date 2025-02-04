"use client";

import { useState } from "react";
import ImageCard from "./ImageCard";
import ImageIcon from "../../../public/icons/image_medium.svg";
import Image from "next/image";

interface UploadImageListProps {
  onImagesChange: (count: number) => void;
}

const UploadImageList = ({ onImagesChange }: UploadImageListProps) => {
  const [images, setImages] = useState<string[]>([]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImages((prev) => {
          const newImages = [...prev, reader.result as string];
          onImagesChange(newImages.length);
          return newImages;
        });
      }
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleDelete = (index: number) => {
    setImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index);
      onImagesChange(newImages.length);
      return newImages;
    });
  };

  return (
    <div className="flex gap-2 whitespace-nowrap">
      <label className="flex flex-col items-center justify-center rounded-[10px] h-[88px] w-[88px] bg-gray-50 border-[1.4px] border-gray-100 cursor-pointer">
        <Image src={ImageIcon} alt="image" width={14} height={14} />
        <span className="text-[10px] text-gray-300 mt-1">
          {images.length}/5
        </span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
          disabled={images.length >= 5}
        />
      </label>
      {images.map((image, index) => (
        <ImageCard
          key={index}
          src={image}
          isPrimary={index === 0}
          onDelete={() => handleDelete(index)}
        />
      ))}
    </div>
  );
};

export default UploadImageList;
