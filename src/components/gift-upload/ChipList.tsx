import Chip from "../common/Chip";

interface ChipListProps {
  chipText: string[];
  selectedChipIndex: number;
  onChipClick: (index: number) => void;
}

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
