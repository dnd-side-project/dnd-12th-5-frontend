"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import GiftListDrawer from "@/components/bundle/add/GiftListDrawer";
import Chip from "@/components/bundle/Chip";
import GiftList from "@/components/bundle/add/GiftList";
import { Button } from "@/components/ui/button";
import { MIN_GIFTBOX_AMOUNT } from "@/constants/constants";
import { toast } from "@/hooks/use-toast";
import { useCreateBundleMutation } from "@/queries/useCreateBundleMutation";
import { useUpdateBundleMutation } from "@/queries/useUpdateBundleMutation";
import {
  useEditBoxStore,
  useGiftStore,
  useToastStore,
} from "@/stores/gift-upload/useStore";
import { Icon } from "@/components/common/Icon";

import RightArrowIcon from "/public/icons/arrow_right_small.svg";

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

  const [drawerOpen, setDrawerOpen] = useState(false);

  const createMutation = useCreateBundleMutation();

  const updateMutation = useUpdateBundleMutation();

  const handleClickButton = async () => {
    try {
      const bundleId = sessionStorage.getItem("bundleId");

      if (!bundleId) {
        await createMutation.mutateAsync();
      } else {
        await updateMutation.mutateAsync();
      }

      router.push("/bundle/delivery?step=1");
    } catch (error) {
      alert(`보따리 저장에 실패했습니다. ${error}`);
    }
  };

  return (
    <div className="h-full bg-pink-50 px-4">
      <div className="relative flex h-full flex-col items-center justify-center">
        <div className="flex w-[300px] flex-col items-center gap-7">
          <div className="absolute top-[10px]">
            <Chip
              text={`채워진 선물박스 ${filledGiftCount}개`}
              icon={filledGiftCount > 0 ? <Icon src={RightArrowIcon} /> : ""}
              width="126px"
              onClick={() => {
                if (filledGiftCount > 0) setDrawerOpen(true);
              }}
              isClickable={filledGiftCount > 0}
            />
          </div>
          <GiftList value={giftBoxes} />
        </div>
        <div className="absolute bottom-4 w-full px-4">
          <Button
            disabled={filledGiftCount < MIN_GIFTBOX_AMOUNT}
            size="lg"
            onClick={handleClickButton}
          >
            선물 배달하러 가기
          </Button>
        </div>
      </div>
      <GiftListDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Page;
