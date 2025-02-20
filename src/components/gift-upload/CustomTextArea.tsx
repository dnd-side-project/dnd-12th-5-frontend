import { Textarea } from "../ui/textarea";

interface CustomTextAreaProps {
  placeholder: string;
  maxLength: number;
  text: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disable: boolean;
}

const CustomTextArea = ({
  placeholder,
  maxLength,
  text,
  onTextChange,
  disable,
}: CustomTextAreaProps) => {
  return (
    <div className="relative">
      <Textarea
        placeholder={placeholder}
        className="min-h-[135px] h-[135px] resize-none bg-white placeholder:text-gray-300 text-sm"
        value={text}
        maxLength={maxLength}
        onChange={(e) => onTextChange(e)}
        disabled={disable}
      />
      <span className="absolute bottom-2 right-2 text-gray-400 text-[10px]">
        {text.length} / {maxLength}
      </span>
    </div>
  );
};

export default CustomTextArea;
