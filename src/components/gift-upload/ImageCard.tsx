import React from "react";
import Image from "next/image";
import EraseIcon from "../../../public/icons/btn_erase.svg";
import { Icon } from "../common/Icon";
import { ImageCardProps } from "@/types/components/types";

const ImageCard = ({ src, isPrimary, onDelete }: ImageCardProps) => {
  return (
    <div className="relative">
      <button
        className="absolute top-[-8px] right-[-8px] z-10"
        onClick={onDelete}
      >
        <Icon src={EraseIcon} alt="delete" size="large" />
      </button>
      <div className="relative rounded-[10px] h-[88px] w-[88px] bg-gray-50 border-[1.4px] border-gray-100 overflow-hidden">
        <Image
          src={src}
          alt="Uploaded"
          width={88}
          height={88}
          className="w-full h-full object-cover"
          priority
        />
        {isPrimary && (
          <div className="absolute bottom-0 w-[88px] bg-[#0F0F10] opacity-70 text-gray-300 text-xs pt-0.5 text-center rounded-bl-[10px] rounded-br-[10px] h-5">
            <p className="text-[10px]">대표 사진</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
