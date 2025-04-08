const AnswerChip = ({ text }: { text: string }) => {
  return (
    <span className="rounded-md bg-gray-100 px-3 py-2 text-[15px]">{text}</span>
  );
};

export default AnswerChip;
