"use client";

import Image from "next/image";

interface CardProps {
  img: string;
  size: "small" | "medium";
  type?: "design" | "image";
  isActive?: boolean;
  onClick: () => void;
}

const Card = ({ img, size, type, isActive, onClick }: CardProps) => {
  const sizeClasses =
    size === "small"
      ? "w-[70px] h-[70px] min-w-[70px]"
      : "w-[88px] h-[88px] min-w-[88px]";
  const borderColorClasses = isActive ? "border-gray-700" : "border-gray-100";

  const imageSize = size === "small" ? 60 : 75;
  const paddingSize =
    type && type === "image"
      ? ""
      : size === "small"
        ? "px-[12px] py-[9px]"
        : "px-[14px] py-[11px]";

  return (
    <div
      className={`flex justify-center border-[1.4px] items-center ${borderColorClasses} ${sizeClasses} rounded-xl box-border bg-gray-50 cursor-pointer ${paddingSize} active:border-gray-700 hover:border-gray-700`}
      onClick={onClick}
    >
      <Image
        src={img}
        alt="card"
        width={imageSize}
        height={imageSize}
        className={`rounded-xl object-cover ${type && type === "image" ? "w-full h-full" : ""}`}
      />
    </div>
  );
};

export default Card;
