"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { CharacterCountInputProps } from "@/types/components/types";

const CharacterCountInput = ({
  placeholder,
  maxLength,
  value = "",
  onChange,
}: CharacterCountInputProps) => {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setText(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-end text-xs text-gray-400">
        {text.length} / {maxLength}
      </div>
      <Input
        value={text}
        onChange={handleChange}
        maxLength={maxLength}
        placeholder={placeholder}
        className="border-[#F3F4F8]"
      />
    </div>
  );
};

export default CharacterCountInput;
