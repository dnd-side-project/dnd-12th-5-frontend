"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

import CharacterCountInput from "../common/CharacterCountInput";
import { Button } from "../ui/button";
import { GIFT_NAME_MAX_LENGTH } from "@/constants/constants";
import { useUploadImageMutation } from "@/queries/useUploadImageMutation";
import {
  useTagIndexStore,
  useGiftStore,
  useEditBoxStore,
  useToastStore,
} from "@/stores/gift-upload/useStore";
import { ImageItem } from "@/types/gift-upload/types";

import InputLink from "./InputLink";
import InputReason from "./InputReason";
import UploadImageList from "./UploadImageList";

const GiftForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const index = Number(searchParams?.get("index"));

  const { giftBoxes, updateGiftBox } = useGiftStore();
  const { selectedTagIndex } = useTagIndexStore();
  const { isBoxEditing } = useEditBoxStore();

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

  const uploadImage = useUploadImageMutation();

  const handleSubmit = () => {
    const existingItems = combinedImages
      .filter((item) => item.type === "existing")
      .map((item) => item.url);
    const newItems = combinedImages.filter((item) => item.type === "new");

    if (newItems.length > 0) {
      const formData = new FormData();
      newItems.forEach((item) => {
        if (item.file) {
          formData.append("files", item.file);
        }
      });
      uploadImage.mutate(formData, {
        onSuccess: (uploadedUrls) => {
          const finalImgUrls = isBoxEditing
            ? [...existingItems, ...uploadedUrls]
            : uploadedUrls;

          const updatedGiftBox = {
            name: giftName,
            reason: giftReason,
            purchase_url: giftLink,
            tag: giftTag,
            tagIndex: selectedTagIndex,
            filled: true,
            imgUrls: finalImgUrls,
          };

          updateGiftBox(index, updatedGiftBox);

          if (isBoxEditing) {
            useToastStore.getState().setShowEditToast(true);
          }
          router.push("/bundle/add");
        },
      });
    } else {
      const updatedGiftBox = {
        name: giftName,
        reason: giftReason,
        purchase_url: giftLink,
        tag: giftTag,
        tagIndex: selectedTagIndex,
        filled: true,
        imgUrls: existingItems,
      };

      updateGiftBox(index, updatedGiftBox);

      if (isBoxEditing) {
        useToastStore.getState().setShowEditToast(true);
      }
      router.push("/bundle/add");
    }
  };

  const imageTextColor =
    combinedImages.length <= 0 ? "text-symantic-negative" : "text-gray-300";

  return (
    <div className="flex h-fit w-full flex-col px-4 py-5">
      <div className="flex flex-1 flex-col gap-[22px]">
        <div className="flex flex-col gap-2">
          <UploadImageList
            combinedImages={combinedImages}
            setCombinedImages={setCombinedImages}
          />
          <p className={`text-xs font-medium ${imageTextColor}`}>
            최소 1장의 사진이 필요해요 (사진 용량 제한 10MB)
          </p>
        </div>
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
      </div>
      <div className="mt-10">
        <Button size="lg" onClick={handleSubmit} disabled={!isFormValid}>
          {isBoxEditing ? "수정 완료" : "채우기 완료"}
        </Button>
      </div>
    </div>
  );
};

export default GiftForm;
