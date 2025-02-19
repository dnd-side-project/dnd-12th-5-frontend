"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import CharacterCountInput from "../common/CharacterCountInput";
import { Button } from "../ui/button";
import InputLink from "./InputLink";
import InputReason from "./InputReason";
import UploadImageList from "./UploadImageList";
import ErrorMessage from "../common/ErrorMessage";
import { GIFT_NAME_MAX_LENGTH } from "@/constants/constants";
import {
  useTagIndexStore,
  useGiftStore,
  useEditBoxStore,
} from "@/stores/gift-upload/useStore";
import { motion } from "framer-motion";
import { uploadGiftImages } from "@/api/gift-upload/api";

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

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [giftName, setGiftName] = useState(existingGift.name);
  const [giftReason, setGiftReason] = useState(existingGift.reason || "");
  const [giftLink, setGiftLink] = useState(existingGift.purchase_url || "");
  const [giftTag, setGiftTag] = useState(existingGift.tag || "");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isGiftNameFilled, setIsGiftNameFilled] = useState(!!giftName);
  const [isReasonFilled, setIsReasonFilled] = useState(!!giftReason);

  const reasonRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isBoxEditing) {
      setGiftName(existingGift.name);
      setGiftReason(existingGift.reason || "");
      setGiftLink(existingGift.purchase_url || "");
      setGiftTag(existingGift.tag || "");

      setIsGiftNameFilled(!!existingGift.name);
      setIsReasonFilled(!!existingGift.reason);
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
  }, [giftName]);

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
  }, [giftReason]);

  const uploadMutation = useMutation<string[], Error, FormData>({
    mutationFn: uploadGiftImages,
    onSuccess: (uploadedUrls: string[]) => {
      if (isBoxEditing) {
        updateGiftBox(index, {
          imgUrls: [
            ...existingGift.imgUrls.filter(
              (url) => !removedImages.includes(url),
            ),
            ...uploadedUrls,
          ],
        });
      } else {
        updateGiftBox(index, {
          imgUrls: uploadedUrls,
        });
      }
    },
  });

  const handleSubmit = () => {
    const remainingImages = isBoxEditing
      ? (existingGift.imgUrls ?? []).filter(
          (url) => !removedImages.includes(url),
        ).length + imageFiles.length
      : imageFiles.length;

    if (remainingImages === 0) {
      setIsSubmitted(true);
      return;
    }

    const updatedGiftBox = {
      name: giftName,
      reason: giftReason,
      purchase_url: giftLink,
      tag: giftTag,
      tagIndex: selectedTagIndex,
      filled: true,
      imgUrls: isBoxEditing
        ? [
            ...(existingGift.imgUrls ?? []).filter(
              (url) => !removedImages.includes(url),
            ),
          ]
        : [],
    };

    updateGiftBox(index, updatedGiftBox);

    if (imageFiles.length > 0) {
      const formData = new FormData();
      imageFiles.forEach((file) => formData.append("files", file));

      uploadMutation.mutate(formData, {
        onSuccess: (uploadedUrls: string[]) => {
          updateGiftBox(index, {
            ...updatedGiftBox,
            imgUrls: isBoxEditing
              ? [...updatedGiftBox.imgUrls, ...uploadedUrls]
              : uploadedUrls,
          });
        },
      });
    }

    router.push("/giftbag/add");
    setIsBoxEditing(false);
  };

  return (
    <div className="px-4 flex flex-col h-full overflow-y-auto">
      <div className="flex flex-col flex-grow gap-[50px] mt-[18px] pb-[70px]">
        <div>
          <div
            className="w-full overflow-x-auto px-4 mb-[22px] min-w-full"
            style={{ scrollbarWidth: "none" }}
          >
            <UploadImageList
              onFilesChange={setImageFiles}
              existingImages={existingGift.imgUrls}
              onRemoveImage={(url) =>
                setRemovedImages((prev) => [...prev, url])
              }
            />
            {isSubmitted &&
              existingGift.imgUrls.filter((url) => !removedImages.includes(url))
                .length +
                imageFiles.length ===
                0 && <ErrorMessage message="필수 입력 정보입니다." />}
          </div>
          <div className="flex flex-col px-1">
            <CharacterCountInput
              maxLength={GIFT_NAME_MAX_LENGTH}
              value={giftName}
              placeholder="선물명을 적어주세요"
              onChange={(text) => setGiftName(text)}
            />
            {isSubmitted && giftName.length === 0 && (
              <ErrorMessage message="필수 입력 정보입니다." />
            )}
          </div>
        </div>
        {isGiftNameFilled && (
          <motion.div
            ref={reasonRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <InputReason
              value={giftReason}
              onReasonChange={setGiftReason}
              onTagChange={setGiftTag}
              giftBoxIndex={index}
            />
          </motion.div>
        )}
        {isReasonFilled && (
          <motion.div
            ref={linkRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <InputLink value={giftLink} onChange={setGiftLink} />
          </motion.div>
        )}
      </div>
      <div className="sticky bottom-4 w-full left-0">
        <Button size="lg" onClick={handleSubmit}>
          {isBoxEditing ? "수정 완료" : "채우기 완료"}
        </Button>
      </div>
    </div>
  );
};

export default GiftForm;
