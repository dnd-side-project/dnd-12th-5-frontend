"use client";

import { useState } from "react";
import CharacterCountInput from "../common/CharacterCountInput";
import { Button } from "../ui/button";
import InputLink from "./InputLink";
import InputReason from "./InputReason";
import UploadImageList from "./UploadImageList";
import ErrorMessage from "../common/ErrorMessage";
import { GIFT_NAME_MAX_LENGTH } from "@/app/constants/constants";

const GiftForm = () => {
  const [imageCount, setImageCount] = useState(0);
  const [giftName, setGiftName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (imageCount === 0 || giftName.length === 0) {
      setIsSubmitted(true);
      return;
    }
  };

  return (
    <div className="flex flex-col p-4 gap-[50px]">
      <div className="flex flex-col gap-1">
        <div
          className="w-full overflow-x-auto h-[110px] flex items-center"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="min-w-max">
            <UploadImageList onImagesChange={setImageCount} />
          </div>
        </div>
        {isSubmitted && imageCount === 0 && (
          <ErrorMessage message="필수 입력 정보입니다." />
        )}
        <CharacterCountInput
          maxLength={GIFT_NAME_MAX_LENGTH}
          placeholder="선물명을 적어주세요"
          onChange={setGiftName}
        />
        {isSubmitted && giftName.length === 0 && (
          <ErrorMessage message="필수 입력 정보입니다." />
        )}
      </div>
      <InputReason />
      <InputLink />
      <Button size="lg" onClick={handleSubmit}>
        채우기 완료
      </Button>
    </div>
  );
};

export default GiftForm;
