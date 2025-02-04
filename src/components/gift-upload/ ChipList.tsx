"use client";

import { useStore } from "@/app/gift-upload/_stores/useStore";
import Chip from "@/components/common/Chip";

interface ChipListProps {
  chipText: string[];
}

const ChipList = ({ chipText }: ChipListProps) => {
  const { selectedChipIndex, setSelectedChipIndex } = useStore();

  const handleChipClick = (index: number) => {
    setSelectedChipIndex(index);
  };

  return (
    <div className="flex gap-[7px] whitespace-nowrap">
      {chipText.map((text, index) => (
        <Chip
          key={index}
          text={text}
          isActive={index === selectedChipIndex}
          onClick={() => handleChipClick(index)}
        />
      ))}
    </div>
  );
};

export default ChipList;
