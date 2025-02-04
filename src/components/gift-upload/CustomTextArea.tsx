import { useState } from "react";
import { Textarea } from "../ui/textarea";

interface CustomTextAreaProps {
  placeholder: string;
  maxLength: number;
}

const CustomTextArea = ({ placeholder, maxLength }: CustomTextAreaProps) => {
  const [text, setText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="relative">
      <Textarea
        placeholder={placeholder}
        className="min-h-[135px] h-[135px] resize-none bg-white placeholder:text-gray-300"
        value={text}
        onChange={handleChange}
        maxLength={maxLength}
      />
      <span className="absolute bottom-2 right-2 text-gray-400 text-[10px]">
        {text.length} / {maxLength}
      </span>
    </div>
  );
};

export default CustomTextArea;
