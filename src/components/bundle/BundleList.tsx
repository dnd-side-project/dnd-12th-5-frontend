"use client";

import Card from "@/components/common/Card";
import { useSelectedBagStore } from "@/stores/bundle/useStore";
import { BundleListProps } from "@/types/components/types";

const BundleList = ({ numberOfCards, size, imgPaths }: BundleListProps) => {
  const { selectedBagIndex, setSelectedBagIndex } = useSelectedBagStore();

  const handleCardClick = (index: number) => {
    setSelectedBagIndex(index);
  };

  return (
    <div className="flex h-[70px] gap-4 whitespace-nowrap">
      {Array.from({ length: numberOfCards }, (_, index) => (
        <Card
          key={index}
          size={size}
          img={imgPaths[index % imgPaths.length]}
          isActive={index === selectedBagIndex}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
};

export default BundleList;
