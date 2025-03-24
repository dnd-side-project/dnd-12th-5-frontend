import { ChipProps } from "@/types/components/types";

const Chip = ({ text, isActive, onClick, disabled }: ChipProps) => {
  return (
    <span
      onClick={!disabled ? onClick : undefined}
      className={`inline-flex items-center justify-center min-w-[55px] h-[28px] px-3 rounded-[6px] border-[1.4px] ${!disabled && "cursor-pointer"} 
        ${isActive ? "bg-pink-500 border-pink-500 text-white" : ` ${!disabled ? "bg-white hover:bg-pink-500 hover:border-pink-500 hover:text-white" : "text-gray-300"}`}`}
    >
      <p className="m-0 text-xs">{text}</p>
    </span>
  );
};

export default Chip;
