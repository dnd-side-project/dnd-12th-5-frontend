interface ChipProps {
  text: string;
  width: string;
}

const Chip = ({ text, width }: ChipProps) => {
  return (
    <div
      className={`rounded-[48px] bg-white px-[10px] py-[14px] text-xs w-[${width}] h-8 flex items-center justify-center`}
    >
      <p>{text}</p>
    </div>
  );
};

export default Chip;
