"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import CharacterCountInput from "../common/CharacterCountInput";
import { Button } from "../ui/button";
import InputLink from "./InputLink";
import InputReason from "./InputReason";
import UploadImageList from "./UploadImageList";
import { GIFT_NAME_MAX_LENGTH } from "@/constants/constants";
import {
  useTagIndexStore,
  useGiftStore,
  useEditBoxStore,
} from "@/stores/gift-upload/useStore";

import { uploadGiftImages } from "@/api/gift-upload/api";
import { ImageItem } from "@/types/gift-upload/types";

const GiftForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const index = Number(searchParams?.get("index"));

  const { giftBoxes, updateGiftBox } = useGiftStore();
  const { selectedTagIndex } = useTagIndexStore();
  const { isBoxEditing, setIsBoxEditing } = useEditBoxStore();

  const existingGift = useMemo(
    () =>
      giftBoxes[index] || {
        name: "",
        reason: "",
        purchase_url: "",
        tag: "",
        imgUrls: [],
      },
    [giftBoxes, index],
  );

  const [combinedImages, setCombinedImages] = useState<ImageItem[]>(() =>
    existingGift.imgUrls.map((url) => ({ type: "existing", url })),
  );

  const [giftName, setGiftName] = useState(existingGift.name);
  const [giftReason, setGiftReason] = useState(existingGift.reason || "");
  const [giftLink, setGiftLink] = useState(existingGift.purchase_url || "");
  const [giftTag, setGiftTag] = useState(existingGift.tag || "");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (isBoxEditing) {
      setGiftName(existingGift.name);
      setGiftReason(existingGift.reason || "");
      setGiftLink(existingGift.purchase_url || "");
      setGiftTag(existingGift.tag || "");
      setCombinedImages(
        existingGift.imgUrls.map((url) => ({ type: "existing", url })),
      );
    }
  }, [isBoxEditing, existingGift]);

  useEffect(() => {
    setIsFormValid(giftName.trim().length > 0 && combinedImages.length > 0);
  }, [giftName, combinedImages]);

  const uploadMutation = useMutation<string[], Error, FormData>({
    mutationFn: uploadGiftImages,
    onSuccess: (uploadedUrls: string[]) => {
      const existingUrls = combinedImages
        .filter((item) => item.type === "existing")
        .map((item) => item.url);
      const merged = [...existingUrls, ...uploadedUrls];
      updateGiftBox(index, { ...existingGift, imgUrls: merged });
    },
  });

  const handleSubmit = () => {
    const existingItems = combinedImages
      .filter((item) => item.type === "existing")
      .map((item) => item.url);
    const newItems = combinedImages.filter((item) => item.type === "new");

    const updatedGiftBox = {
      name: giftName,
      reason: giftReason,
      purchase_url: giftLink,
      tag: giftTag,
      tagIndex: selectedTagIndex,
      filled: true,
      imgUrls: isBoxEditing ? existingItems : [],
    };

    updateGiftBox(index, updatedGiftBox);

    if (newItems.length > 0) {
      const formData = new FormData();
      newItems.forEach((item) => {
        if (item.file) {
          formData.append("files", item.file);
        }
      });
      uploadMutation.mutate(formData, {
        onSuccess: (uploadedUrls: string[]) => {
          const mergedImages = isBoxEditing
            ? [...existingItems, ...uploadedUrls]
            : uploadedUrls;
          updateGiftBox(index, { ...updatedGiftBox, imgUrls: mergedImages });
        },
      });
    }

    router.push("/bundle/add");
    setIsBoxEditing(false);
  };

  return (
    <div className="h-[calc(100%-52px)] relative w-full px-4 flex flex-col gap-[22px] pt-[18px]">
      <UploadImageList
        combinedImages={combinedImages}
        setCombinedImages={setCombinedImages}
        maxImages={5}
      />
      {combinedImages.length <= 0 ? (
        <p className="text-xs text-coral-400 font-medium">
          * 사진은 1장 이상 첨부해 주세요.
        </p>
      ) : (
        <div className="h-4" />
      )}
      <div className="flex flex-col gap-[50px]">
        <CharacterCountInput
          maxLength={GIFT_NAME_MAX_LENGTH}
          value={giftName}
          placeholder="선물명을 적어주세요"
          onChange={(text) => setGiftName(text)}
        />
        <InputReason
          value={giftReason}
          onReasonChange={setGiftReason}
          onTagChange={setGiftTag}
          giftBoxIndex={index}
        />
        <InputLink value={giftLink} onChange={setGiftLink} />
      </div>
      <Button
        size="lg"
        onClick={handleSubmit}
        disabled={!isFormValid}
        className="mb-4 mt-[30px]"
      >
        {isBoxEditing ? "수정 완료" : "채우기 완료"}
      </Button>
    </div>
  );
};

export default GiftForm;
