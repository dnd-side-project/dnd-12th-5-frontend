import { ChipProps } from "@/types/components/types";

const Chip = ({ text, isActive, onClick, disabled }: ChipProps) => {
  return (
    <span
      onClick={!disabled ? onClick : undefined}
      className={`inline-flex h-[28px] min-w-[55px] items-center justify-center rounded-[6px] border-[1.4px] px-3 ${!disabled && "cursor-pointer"} ${isActive ? "border-pink-500 bg-pink-500 text-white" : ` ${!disabled ? "bg-white hover:border-pink-500 hover:bg-pink-500 hover:text-white" : "text-gray-300"}`}`}
    >
      <p className="m-0 text-xs">{text}</p>
    </span>
  );
};

export default Chip;
