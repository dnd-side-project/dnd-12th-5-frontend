import { BundleChipProps } from "@/types/components/types";

const Chip = ({ text, width, icon, isClickable, onClick }: BundleChipProps) => {
  const cursorStyle = isClickable ? "cursor-pointer" : "";
  const rowPaddingStyle = text.includes("채워진 선물박스")
    ? "pl-[14px] pr-[12px]"
    : "px-[14px]";

  return (
    <div
      className={`rounded-[48px] bg-white py-[7px] ${rowPaddingStyle} text-xs w-[${width}] flex h-8 items-center justify-center gap-1 font-medium ${cursorStyle}`}
      onClick={onClick}
    >
      <p>{text}</p>
      {icon && <span>{icon}</span>}
    </div>
  );
};

export default Chip;
