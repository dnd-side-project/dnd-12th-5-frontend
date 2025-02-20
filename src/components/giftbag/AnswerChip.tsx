interface AnswerChipProps {
  text: string;
}

const AnswerChip = ({ text }: AnswerChipProps) => {
  return (
    <span className="rounded-md bg-gray-100 py-2 px-3 h-[39px] w-auto text-xs">
      {text}
    </span>
  );
};

export default AnswerChip;
