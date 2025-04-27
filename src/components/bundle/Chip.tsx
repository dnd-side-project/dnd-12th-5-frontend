import { BundleChipProps } from "@/types/components/types";

const Chip = ({ text, width, icon }: BundleChipProps) => {
  return (
    <div
      className={`rounded-[48px] bg-white px-[14px] py-[7px] text-xs w-[${width}] flex h-8 items-center justify-center gap-1 font-medium`}
    >
      <p>{text}</p>
      {icon && <span>{icon}</span>}
    </div>
  );
};

export default Chip;
