"use client";

import Image from "next/image";

interface CardProps {
  img: string;
  size: "small" | "medium";
  isActive: boolean;
  onClick: () => void;
}

const Card = ({ img, size, isActive, onClick }: CardProps) => {
  const sizeClasses = size === "small" ? "w-[70px] h-[70px]" : "w-22 h-22";
  const borderColorClasses = isActive ? "border-gray-700" : "border-gray-100";

  const imageSize = size === "small" ? 60 : 75;

  return (
    <div
      className={`flex justify-center border-[1.4px] items-center ${borderColorClasses} ${sizeClasses} rounded-xl box-border bg-gray-5 p-1`}
      onClick={onClick}
    >
      <Image
        src={img}
        alt="card"
        width={imageSize}
        height={imageSize}
        className="object-cover rounded-xl"
      />
    </div>
  );
};

export default Card;
