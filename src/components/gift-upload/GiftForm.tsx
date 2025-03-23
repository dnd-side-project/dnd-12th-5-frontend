"use client";

import { useEffect, useState, useMemo, useRef } from "react";
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
import { motion } from "framer-motion";
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

  const [isGiftNameFilled, setIsGiftNameFilled] = useState(!!giftName);
  const [isReasonFilled, setIsReasonFilled] = useState(!!giftReason);
  const [isFormValid, setIsFormValid] = useState(false);

  const reasonRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);

  const animatedSectionProps = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  useEffect(() => {
    if (isBoxEditing) {
      setGiftName(existingGift.name);
      setGiftReason(existingGift.reason || "");
      setGiftLink(existingGift.purchase_url || "");
      setGiftTag(existingGift.tag || "");
      setIsGiftNameFilled(!!existingGift.name);
      setIsReasonFilled(!!existingGift.reason);
      setCombinedImages(
        existingGift.imgUrls.map((url) => ({ type: "existing", url })),
      );
    }
  }, [isBoxEditing, existingGift]);

  useEffect(() => {
    if (!isGiftNameFilled && giftName.length > 0 && !isBoxEditing) {
      setIsGiftNameFilled(true);
      setTimeout(() => {
        reasonRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [giftName, isBoxEditing, isGiftNameFilled]);

  useEffect(() => {
    if (!isReasonFilled && giftReason.length > 0 && !isBoxEditing) {
      setIsReasonFilled(true);
      setTimeout(() => {
        linkRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [giftReason, isBoxEditing, isReasonFilled]);

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

    router.push("/giftbag/add");
    setIsBoxEditing(false);
  };

  return (
    <div className="px-4 flex flex-col h-full overflow-y-auto">
      <div className="flex flex-col flex-grow gap-[50px] mt-[18px] pb-[70px]">
        <div className="flex flex-col gap-[22px]">
          <div
            className="w-full overflow-x-auto min-w-full flex flex-col gap-2"
            style={{ scrollbarWidth: "none" }}
          >
            <UploadImageList
              combinedImages={combinedImages}
              setCombinedImages={setCombinedImages}
              maxImages={5}
            />
          </div>
          <div className="flex flex-col gap-2">
            <CharacterCountInput
              maxLength={GIFT_NAME_MAX_LENGTH}
              value={giftName}
              placeholder="선물명을 적어주세요"
              onChange={(text) => setGiftName(text)}
            />
          </div>
        </div>
        {isGiftNameFilled && (
          <motion.div ref={reasonRef} {...animatedSectionProps}>
            <InputReason
              value={giftReason}
              onReasonChange={setGiftReason}
              onTagChange={setGiftTag}
              giftBoxIndex={index}
            />
          </motion.div>
        )}
        {(isReasonFilled || isBoxEditing) && (
          <motion.div ref={linkRef} {...animatedSectionProps}>
            <InputLink value={giftLink} onChange={setGiftLink} />
          </motion.div>
        )}
      </div>
      <div className="sticky bottom-4 w-full left-0">
        <Button size="lg" onClick={handleSubmit} disabled={!isFormValid}>
          {isBoxEditing ? "수정 완료" : "채우기 완료"}
        </Button>
      </div>
    </div>
  );
};

export default GiftForm;
