"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface CharacterCountInputProps {
  placeholder: string;
  maxLength: number;
  value?: string;
  onChange?: (value: string) => void;
}

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
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-end text-xs text-gray-400">
        {text.length} / {maxLength}
      </div>
      <Input
        value={text}
        onChange={handleChange}
        maxLength={maxLength}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CharacterCountInput;
