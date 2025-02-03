"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface CharacterCountInputProps {
  placeholder: string;
  maxLength: number;
}

const CharacterCountInput = ({
  placeholder,
  maxLength,
}: CharacterCountInputProps) => {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setText(e.target.value);
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
