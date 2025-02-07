interface ChipProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

const Chip = ({ text, isActive, onClick }: ChipProps) => {
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center justify-center min-w-[55px] h-[28px] px-3 rounded-[6px] border-[1.4px] cursor-pointer 
        ${isActive ? "bg-pink-500 border-pink-500 text-white" : "bg-white hover:bg-pink-500 hover:border-pink-500 hover:text-white"}`}
    >
      <p className="m-0 text-xs">{text}</p>
    </span>
  );
};

export default Chip;
