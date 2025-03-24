import { ChipListProps } from "@/types/components/types";
import Chip from "../common/Chip";

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
