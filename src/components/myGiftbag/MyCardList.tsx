"use client";

import { useRouter } from "next/navigation";

import Card from "@/components/common/Card";

import { FilledGiftListPreview } from "@/types/giftbag/types";

interface MyCardListProps {
  type?: "design" | "image";
  data: FilledGiftListPreview[];
  size: "small" | "medium";
  giftbagIndex?: string;
}

const MyCardList = ({ type, data, size, giftbagIndex }: MyCardListProps) => {
  const router = useRouter();

  const handleCardClick = (index: number) => {
    if (type === "image") {
      router.push(`/giftbag/list/${giftbagIndex}/${index}`);
    } else {
      router.push(`/giftbag/list/${index}`);
    }
  };

  return (
    <div className="flex gap-[12px] whitespace-nowrap">
      {data &&
        Array.from({ length: data.length }, (_, index) => (
          <Card
            key={index}
            type={type}
            size={size}
            img={data[index].thumbnail}
            onClick={() => handleCardClick(index)}
          />
        ))}
    </div>
  );
};

export default MyCardList;
