import { ChipProps } from "@/types/components/types";

const ReceiveAnswerChip = ({
  text,
  isActive,
  onClick,
  disabled,
}: ChipProps) => {
  return (
    <span
      onClick={!disabled ? onClick : undefined}
      className={`justify-left inline-flex h-[39px] min-w-[164px] items-center rounded-[6px] border-[1.4px] border-[#E9EBF880] px-3 ${!disabled && "cursor-pointer"} ${isActive ? "bg-pink-400 text-white" : ` ${!disabled ? "bg-white hover:bg-pink-400 hover:text-white" : "bg-gray-50 text-gray-300"}`}`}
    >
      <p className="m-0 text-[15px]">{text}</p>
    </span>
  );
};

export default ReceiveAnswerChip;
