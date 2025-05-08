"use client";

import cloneDeep from "lodash.clonedeep";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import GiftList from "@/components/bundle/add/GiftList";
import GiftListDrawer from "@/components/bundle/add/GiftListDrawer";
import Chip from "@/components/bundle/Chip";
import { Icon } from "@/components/common/Icon";
import { Button } from "@/components/ui/button";
import { MIN_GIFTBOX_AMOUNT } from "@/constants/constants";
import { toast } from "@/hooks/use-toast";
import { useTempSaveBundle } from "@/hooks/useTempSaveBundle";
import { useCreateBundleMutation } from "@/queries/useCreateBundleMutation";
import { useUpdateBundleMutation } from "@/queries/useUpdateBundleMutation";
import {
  useBundleNameStore,
  useSelectedBagStore,
  useSnapshotGiftBoxesStore,
} from "@/stores/bundle/useStore";
import {
  useEditBoxStore,
  useGiftStore,
  useToastStore,
} from "@/stores/gift-upload/useStore";

import RightArrowIcon from "/public/icons/arrow_right_large.svg";

const Page = () => {
  const { giftBoxes } = useGiftStore();
  const filledGiftCount = giftBoxes.filter(
    (gift) => gift && gift.filled === true,
  ).length;

  const router = useRouter();
  const { setIsBoxEditing } = useEditBoxStore();

  useEffect(() => {
    setIsBoxEditing(false);
  }, [setIsBoxEditing]);

  const { showEditToast, setShowEditToast } = useToastStore();

  useEffect(() => {
    if (showEditToast) {
      setTimeout(() => {
        toast({ title: "선물박스 수정이 완료되었어요!" });
        setShowEditToast(false);
      }, 200);
    }
  }, [setShowEditToast, showEditToast]);

  const [giftListDrawerOpen, setGiftListDrawerOpen] = useState(false);

  const { bundleName } = useBundleNameStore();
  const { selectedBagIndex } = useSelectedBagStore();
  const { setSnapshotGiftBoxes } = useSnapshotGiftBoxesStore();
  const { handleTempSave } = useTempSaveBundle();

  const createMutation = useCreateBundleMutation();
  const updateMutation = useUpdateBundleMutation();

  const handleGiftDelivery = async () => {
    try {
      const bundleId = sessionStorage.getItem("bundleId");

      if (!bundleId) {
        await createMutation.mutateAsync();
      } else {
        await updateMutation.mutateAsync();
      }

      router.push("/bundle/delivery?step=1");
    } catch {
      toast({
        title: "보따리 저장에 실패했습니다",
        description: "다시 시도해 주세요.",
      });
    }
  };

  return (
    <div className="relative flex h-full flex-col items-center justify-center bg-pink-50">
      <div className="mb-[26px] flex w-[300px] flex-col items-center gap-7">
        <div className="absolute top-[10px]">
          <Chip
            text={`채워진 선물박스 ${filledGiftCount}개`}
            icon={
              filledGiftCount > 0 ? (
                <Icon src={RightArrowIcon} size="xsmall" />
              ) : (
                ""
              )
            }
            width="126px"
            onClick={() => {
              if (filledGiftCount > 0) setGiftListDrawerOpen(true);
            }}
            isClickable={filledGiftCount > 0}
          />
        </div>
        <GiftList value={giftBoxes} />
      </div>
      <div className="absolute bottom-4 w-full px-4">
        <div className="grid grid-cols-[1.5fr_3fr] gap-3">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              handleTempSave({ bundleName, selectedBagIndex });
              setSnapshotGiftBoxes(cloneDeep(giftBoxes));
            }}
            disabled={filledGiftCount < MIN_GIFTBOX_AMOUNT}
          >
            임시 저장
          </Button>
          <Button
            disabled={filledGiftCount < MIN_GIFTBOX_AMOUNT}
            size="lg"
            onClick={handleGiftDelivery}
          >
            선물 배달하러 가기
          </Button>
        </div>
      </div>
      <GiftListDrawer
        open={giftListDrawerOpen}
        onClose={() => setGiftListDrawerOpen(false)}
      />
    </div>
  );
};

export default Page;
