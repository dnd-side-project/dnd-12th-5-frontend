"use client";

import { useState } from "react";
import ImageCard from "./ImageCard";
import ImageIcon from "../../../public/icons/image_medium.svg";
import Image from "next/image";

interface UploadImageListProps {
  onFilesChange: (files: File[]) => void;
  giftBoxIndex: number;
}

const UploadImageList = ({ onFilesChange }: UploadImageListProps) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    const filePreviews = files.map((file) => URL.createObjectURL(file));

    setImageFiles((prev) => [...prev, ...files]);
    setPreviewImages((prev) => [...prev, ...filePreviews]);
    onFilesChange([...imageFiles, ...files]);

    event.target.value = "";
  };

  const handleDelete = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);

    setImageFiles(newFiles);
    setPreviewImages(newPreviews);
    onFilesChange(newFiles);
  };

  return (
    <div className="flex gap-2 whitespace-nowrap">
      <label
        className={`flex flex-shrink-0 flex-col items-center justify-center rounded-[10px] h-[88px] w-[88px] bg-gray-50 border-[1.4px] border-gray-100 ${imageFiles.length === 5 ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <Image src={ImageIcon} alt="image" width={14} height={14} />
        <span className="text-[10px] text-gray-300 mt-1">
          {imageFiles.length}/5
        </span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
          disabled={imageFiles.length >= 5}
          multiple
        />
      </label>
      {previewImages.map((image, index) => (
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
