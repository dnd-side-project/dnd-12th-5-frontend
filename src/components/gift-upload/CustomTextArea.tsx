import { Textarea } from "../ui/textarea";

interface CustomTextAreaProps {
  placeholder: string;
  maxLength: number;
  text: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CustomTextArea = ({
  placeholder,
  maxLength,
  text,
  onTextChange,
}: CustomTextAreaProps) => {
  return (
    <div className="relative">
      <Textarea
        placeholder={placeholder}
        className="min-h-[135px] h-[135px] resize-none bg-white placeholder:text-gray-300"
        value={text}
        maxLength={maxLength}
        onChange={(e) => onTextChange(e)}
      />
      <span className="absolute bottom-2 right-2 text-gray-400 text-[10px]">
        {text.length} / {maxLength}
      </span>
    </div>
  );
};

export default CustomTextArea;
