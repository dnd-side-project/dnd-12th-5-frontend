import { Textarea } from "../ui/textarea";
import { CustomTextAreaProps } from "@/types/components/types";

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
        className="h-[135px] min-h-[135px] resize-none bg-white text-sm placeholder:text-gray-300"
        value={text}
        maxLength={maxLength}
        onChange={(e) => onTextChange(e)}
        disabled={disable}
      />
      <span className="absolute bottom-2 right-3 text-[10px] text-gray-400">
        {text.length} / {maxLength}
      </span>
    </div>
  );
};

export default CustomTextArea;
