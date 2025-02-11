"use client";

import { useRouter } from "next/navigation";

import Card from "@/components/common/Card";

interface MyCardListProps {
  type?: "design" | "image";
  data: string[];
  size: "small" | "medium";
}

const MyCardList = ({ type, data, size }: MyCardListProps) => {
  const router = useRouter();

  const handleCardClick = (index: number) => {
    router.push(`/giftbag/detail/${index}`);
  };

  return (
    <div className="flex gap-4 whitespace-nowrap">
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
