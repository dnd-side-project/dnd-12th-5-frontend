"use client";

import { useRouter } from "next/navigation";

import Card from "@/components/common/Card";

interface MyCardListProps {
  type?: "design" | "image";
  data: string[];
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
            img={data[index % data.length]}
            onClick={() => handleCardClick(index)}
          />
        ))}
    </div>
  );
};

export default MyCardList;
