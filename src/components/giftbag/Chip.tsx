interface ChipProps {
  text: string;
}

const Chip = ({ text }: ChipProps) => {
  return (
    <div className="rounded-[48px] bg-white px-[10px] py-[14px] text-xs w-[126px] h-8 flex items-center justify-center">
      <p>{text}</p>
    </div>
  );
};

export default Chip;
