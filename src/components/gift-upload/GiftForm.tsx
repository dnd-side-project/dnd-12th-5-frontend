"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CharacterCountInput from "../common/CharacterCountInput";
import { Button } from "../ui/button";
import InputLink from "./InputLink";
import InputReason from "./InputReason";
import UploadImageList from "./UploadImageList";
import ErrorMessage from "../common/ErrorMessage";
import { GIFT_NAME_MAX_LENGTH } from "@/app/constants/constants";
import {
  useTagIndexStore,
  useGiftStore,
  useEditBoxStore,
} from "@/stores/gift-upload/useStore";

const GiftForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const index = Number(searchParams?.get("index"));

  const { giftBoxes, updateGiftBox } = useGiftStore();
  const { selectedTagIndex } = useTagIndexStore();
  const { isBoxEditing, setIsBoxEditing } = useEditBoxStore();

  const existingGift = giftBoxes[index] || {
    name: "",
    message: "",
    purchase_url: "",
    tag: "",
  };

  {
    /* 이미지쪽 추후 수정 필요 (api 달고) */
  }
  const [imageCount, setImageCount] = useState(existingGift.filled ? 1 : 0);
  const [giftName, setGiftName] = useState(existingGift.name);
  const [giftReason, setGiftReason] = useState(existingGift.reason || "");
  const [giftLink, setGiftLink] = useState(existingGift.purchase_url || "");
  const [giftTag, setGiftTag] = useState(existingGift.tag || "");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isBoxEditing) {
      setGiftName(existingGift.name);
      setGiftReason(existingGift.reason || "");
      setGiftLink(existingGift.purchase_url || "");
      setGiftTag(existingGift.tag || "");
    }
  }, [isBoxEditing, existingGift]);

  const handleSubmit = () => {
    if (imageCount === 0 || giftName.length === 0) {
      setIsSubmitted(true);
      return;
    }

    updateGiftBox(index, {
      name: giftName,
      reason: giftReason,
      purchase_url: giftLink,
      tag: giftTag,
      tagIndex: selectedTagIndex,
    });

    router.push("/giftbag/add");
    setIsBoxEditing(false);
  };

  return (
    <div className="flex flex-col p-4 gap-[50px]">
      <UploadImageList onImagesChange={setImageCount} />
      {isSubmitted && imageCount === 0 && (
        <ErrorMessage message="필수 입력 정보입니다." />
      )}
      <CharacterCountInput
        maxLength={GIFT_NAME_MAX_LENGTH}
        value={giftName}
        placeholder="선물명을 적어주세요"
        onChange={setGiftName}
      />
      {isSubmitted && giftName.length === 0 && (
        <ErrorMessage message="필수 입력 정보입니다." />
      )}
      <InputReason
        value={giftReason}
        onReasonChange={setGiftReason}
        onTagChange={setGiftTag}
        giftBoxIndex={index}
      />
      <InputLink value={giftLink} onChange={setGiftLink} />
      <Button size="lg" onClick={handleSubmit}>
        {isBoxEditing ? "수정완료" : "채우기 완료"}
      </Button>
    </div>
  );
};

export default GiftForm;
