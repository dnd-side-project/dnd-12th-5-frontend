import { BundleChipProps } from "@/types/components/types";

const Chip = ({ text, width }: BundleChipProps) => {
  return (
    <div
      className={`rounded-[48px] bg-white px-[14px] py-[7px] text-xs w-[${width}] flex h-8 items-center justify-center font-medium`}
    >
      <p>{text}</p>
    </div>
  );
};

export default Chip;
