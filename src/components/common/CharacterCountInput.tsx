"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface CharacterCountInputProps {
  placeholder: string;
  maxLength: number;
  onChange?: (value: string) => void; // 입력값을 부모 컴포넌트로 전달
}

const CharacterCountInput = ({
  placeholder,
  maxLength,
  onChange,
}: CharacterCountInputProps) => {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength && onChange) {
      setText(value);
      onChange(value); // 입력값 변경 시 부모 컴포넌트에 전달
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
