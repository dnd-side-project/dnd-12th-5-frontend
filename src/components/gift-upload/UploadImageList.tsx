"use client";

import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import Image from "next/image";

import ImageIcon from "../../../public/icons/image_medium.svg";
import {
  GIFT_IMAGE_MAX_AMOUNT,
  IMAGE_EXTENSIONS,
  IMAGE_MAX_SIZE_MB,
} from "@/constants/constants";
import { UploadImageListProps } from "@/types/components/types";
import { ImageItem } from "@/types/gift-upload/types";

import ImageCard from "./ImageCard";
import SortableImageWrapper from "./SortableImageWrapper";

const UploadImageList = ({
  combinedImages,
  setCombinedImages,
}: UploadImageListProps) => {
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);
    const newItems: ImageItem[] = [];
    files.forEach((file) => {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (!fileExtension || !IMAGE_EXTENSIONS.includes(fileExtension)) {
        alert(
          "지원되지 않는 파일 형식입니다. (jpg, jpeg, png, webp, heic, heif 만 가능)",
        );
        return;
      }
      newItems.push({
        type: "new",
        url: URL.createObjectURL(file),
        file,
      });
    });

    const oversizedFiles = files.filter(
      (file) => file.size > IMAGE_MAX_SIZE_MB * 1024 * 1024,
    );

    if (oversizedFiles.length > 0) {
      alert("10MB 이하 크기의 이미지만 업로드할 수 있어요!");
      event.target.value = "";
      return;
    }

    if (combinedImages.length + newItems.length > GIFT_IMAGE_MAX_AMOUNT) {
      alert(`최대 ${GIFT_IMAGE_MAX_AMOUNT}개까지 업로드 가능합니다.`);
      return;
    }

    setCombinedImages([...combinedImages, ...newItems]);
    event.target.value = "";
  };

  const handleDelete = (index: number) => {
    const newItems = combinedImages.filter((_, i) => i !== index);
    setCombinedImages(newItems);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIdx = combinedImages.findIndex((item) => item.url === active.id);
    const newIdx = combinedImages.findIndex((item) => item.url === over.id);

    const newList = arrayMove(combinedImages, oldIdx, newIdx);
    setCombinedImages(newList);
  };

  return (
    <div className="flex gap-2 whitespace-nowrap">
      <label
        className={`flex h-[88px] w-[88px] flex-shrink-0 flex-col items-center justify-center rounded-[10px] border-[1.4px] border-input bg-gray-50 ${
          combinedImages.length >= GIFT_IMAGE_MAX_AMOUNT
            ? "cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        <Image src={ImageIcon} alt="image" width={14} height={14} />
        <span className="mt-1 text-[10px] text-gray-300">
          {combinedImages.length}/{GIFT_IMAGE_MAX_AMOUNT}
        </span>
        <input
          type="file"
          accept={IMAGE_EXTENSIONS.map((ext) => `.${ext}`).join(", ")}
          className="hidden"
          onChange={handleUpload}
          disabled={combinedImages.length >= GIFT_IMAGE_MAX_AMOUNT}
          multiple
          size={10}
        />
      </label>
      <div
        className="flex-1 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={combinedImages.map((item) => item.url)}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex w-max flex-nowrap gap-2">
              {combinedImages.map((item, index) => (
                <SortableImageWrapper key={item.url} id={item.url}>
                  {({ dragHandleProps }) => (
                    <ImageCard
                      src={item.url}
                      isPrimary={index === 0}
                      onDelete={() => handleDelete(index)}
                      dragHandleProps={dragHandleProps}
                    />
                  )}
                </SortableImageWrapper>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default UploadImageList;
