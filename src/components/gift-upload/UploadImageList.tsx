"use client";

import ImageCard from "./ImageCard";
import ImageIcon from "../../../public/icons/image_medium.svg";
import Image from "next/image";
import { ImageItem } from "@/types/gift-upload/types";
import { UploadImageListProps } from "@/types/components/types";
import { IMAGE_EXTENSIONS } from "@/constants/constants";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import SortableImageWrapper from "./SortableImageWrapper";

const UploadImageList = ({
  combinedImages,
  setCombinedImages,
  maxImages = 5,
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
    if (combinedImages.length + newItems.length > maxImages) {
      alert(`최대 ${maxImages}개까지 업로드 가능합니다.`);
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
          combinedImages.length >= maxImages
            ? "cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        <Image src={ImageIcon} alt="image" width={14} height={14} />
        <span className="mt-1 text-[10px] text-gray-300">
          {combinedImages.length}/{maxImages}
        </span>
        <input
          type="file"
          accept={IMAGE_EXTENSIONS.map((ext) => `.${ext}`).join(", ")}
          className="hidden"
          onChange={handleUpload}
          disabled={combinedImages.length >= maxImages}
          multiple
        />
      </label>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={combinedImages.map((item) => item.url)}
          strategy={horizontalListSortingStrategy}
        >
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
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default UploadImageList;
