import Image from "next/image";
import React from "react";

import EraseIcon from "../../../public/icons/btn_erase.svg";
import { Icon } from "../common/Icon";
import { ImageCardProps } from "@/types/components/types";

const ImageCard = ({
  src,
  isPrimary,
  onDelete,
  dragHandleProps,
}: ImageCardProps) => {
  return (
    <div className="relative mt-2 h-[88px] w-[88px]">
      <div className="absolute -right-2 -top-2 z-10">
        <button onClick={onDelete}>
          <Icon src={EraseIcon} alt="delete" size="large" />
        </button>
      </div>
      <div className="relative h-full w-full overflow-hidden rounded-[10px] border-[1.4px] border-gray-100 bg-gray-50">
        <Image
          src={src}
          alt="Uploaded"
          width={88}
          height={88}
          className="h-full w-full object-cover"
          priority
          {...dragHandleProps}
        />
        {isPrimary && (
          <div className="absolute bottom-0 h-5 w-full rounded-bl-[10px] rounded-br-[10px] bg-[#0F0F10] pt-0.5 text-center text-xs text-gray-300 opacity-70">
            <p className="text-[10px]">대표 사진</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
