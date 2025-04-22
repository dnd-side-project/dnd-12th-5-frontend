import Chip from "../common/Chip";
import { ChipListProps } from "@/types/components/types";

const ChipList = ({
  chipText,
  selectedChipIndex,
  onChipClick,
}: ChipListProps) => {
  return (
    <div className="flex gap-[7px] whitespace-nowrap">
      {chipText.map((text, index) => (
        <Chip
          key={index}
          text={text}
          isActive={index === selectedChipIndex}
          onClick={() => onChipClick(index)}
        />
      ))}
    </div>
  );
};

export default ChipList;
