"use client";

import Image from "next/image";

import IndicatorIcon from "/public/icons/indicator.svg";

import { CardProps } from "@/types/components/types";

const Card = ({
  img,
  size,
  type,
  isRead,
  isActive,
  onClick,
  noHoverStyle,
  noActiveStyle,
  noCursorPointerStyle,
}: CardProps) => {
  const sizeClasses =
    size === "small"
      ? "w-[70px] h-[70px] min-w-[70px]"
      : "w-[88px] h-[88px] min-w-[88px]";
  const borderColorClasses = isActive ? "border-gray-700" : "border-gray-100";
  const hoverClass = noHoverStyle ? "" : "hover:border-gray-700";
  const activeClass = noActiveStyle ? "" : "active:border-gray-700";

  const imageSize = size === "small" ? 60 : 75;
  const paddingSize =
    type && type === "image" ? "" : size === "small" ? "p-[10px]" : "p-[13px]";

  const cursorClass = noCursorPointerStyle
    ? "cursor-default"
    : "cursor-pointer";

  return (
    <div
      className={`relative flex items-center justify-center border-[1.4px] ${borderColorClasses} ${sizeClasses} box-border rounded-xl bg-gray-50 ${cursorClass} ${paddingSize} ${activeClass} ${hoverClass} `}
      onClick={onClick}
    >
      <Image
        src={img}
        alt="card"
        width={imageSize}
        height={imageSize}
        className={`rounded-xl object-cover ${type && type === "image" ? "h-full w-full" : ""}`}
      />
      <div className="absolute right-2 top-2">
        {isRead === false && <Image src={IndicatorIcon} alt="IndicatorIcon" />}
      </div>
    </div>
  );
};

export default Card;
