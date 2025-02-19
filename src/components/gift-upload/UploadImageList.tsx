"use client";

import { useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import ImageIcon from "../../../public/icons/image_medium.svg";
import Image from "next/image";
import { useEditBoxStore } from "@/stores/gift-upload/useStore";

interface UploadImageListProps {
  onFilesChange: (files: File[]) => void;
  existingImages?: string[];
  onRemoveImage?: (url: string) => void;
}

const allowedExtensions = ["jpg", "jpeg", "png", "webp", "heic", "heif"];

const UploadImageList = ({
  onFilesChange,
  existingImages = [],
  onRemoveImage,
}: UploadImageListProps) => {
  const [previewImages, setPreviewImages] = useState<string[]>(existingImages);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { isBoxEditing } = useEditBoxStore();

  useEffect(() => {
    if (isBoxEditing) {
      setPreviewImages((prev) => {
        return JSON.stringify(prev) === JSON.stringify(existingImages)
          ? prev
          : existingImages;
      });
    }
  }, [existingImages, isBoxEditing]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    const validFiles: File[] = [];
    const filePreviews: string[] = [];

    files.forEach((file) => {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        alert(
          "지원되지 않는 파일 형식입니다. (jpg, jpeg, png, webp, heic, heif 만 가능)",
        );
        return;
      }
      validFiles.push(file);
      filePreviews.push(URL.createObjectURL(file));
    });

    setImageFiles((prev) => [...prev, ...validFiles]);
    setPreviewImages((prev) => [...prev, ...filePreviews]);
    onFilesChange([...imageFiles, ...validFiles]);

    event.target.value = "";
  };

  const handleDelete = (index: number) => {
    const removedImage = previewImages[index];

    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);

    setImageFiles(newFiles);
    setPreviewImages(newPreviews);
    onFilesChange(newFiles);

    if (existingImages.includes(removedImage) && onRemoveImage) {
      onRemoveImage(removedImage);
    }
  };

  return (
    <div className="flex gap-2 whitespace-nowrap">
      <label
        className={`flex flex-shrink-0 flex-col items-center justify-center rounded-[10px] h-[88px] w-[88px] bg-gray-50 border-[1.4px] border-gray-100 ${
          previewImages.length === 5 ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <Image src={ImageIcon} alt="image" width={14} height={14} />
        <span className="text-[10px] text-gray-300 mt-1">
          {previewImages.length}/5
        </span>
        <input
          type="file"
          accept={allowedExtensions.map((ext) => `.${ext}`).join(", ")}
          className="hidden"
          onChange={handleUpload}
          disabled={previewImages.length >= 5}
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
