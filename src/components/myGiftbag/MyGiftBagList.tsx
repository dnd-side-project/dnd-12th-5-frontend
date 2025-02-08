"use client";

import { useRouter } from "next/navigation";

import Card from "@/components/common/Card";

interface MyGiftBagListtProps {
  bottariData: string[];
}

const MyGiftBagList = ({ bottariData }: MyGiftBagListtProps) => {
  const router = useRouter();

  const handleCardClick = (index: number) => {
    router.push(`/giftbag/list?index=${index}`);
  };

  return (
    <div className="flex gap-4 whitespace-nowrap">
      {Array.from({ length: bottariData.length }, (_, index) => (
        <Card
          key={index}
          size={"medium"}
          img={bottariData[index % bottariData.length]}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
};

export default MyGiftBagList;
