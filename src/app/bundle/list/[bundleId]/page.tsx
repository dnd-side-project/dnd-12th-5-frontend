"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import MyBundleNameChip from "@/components/myBundle/MyBundleNameChip";
import MyCardList from "@/components/myBundle/MyCardList";
import CopyLinkButton from "@/components/myBundle/CopyLinkButton";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useMyBundleDetail } from "@/queries/useMyBundleDetail";
import { useDeleteBundle } from "@/queries/useDeleteMyBundle";
import { toast } from "@/hooks/use-toast";
import { useFillGift } from "@/queries/useFillGift";
import { ToastAction } from "@radix-ui/react-toast";
import { useGiftStore } from "@/stores/gift-upload/useStore";
import { useIsClickedUpdateFilledButton } from "@/stores/bundle/useStore";
import { DESIGN_TYPE_MAP } from "@/constants/constants";
import { resetGiftBoxes } from "@/utils/utils";
import { Icon } from "@/components/common/Icon";
import CloseIcon from "/public/icons/close.svg";

const Page = () => {
  const router = useRouter();
  const { bundleId } = useParams() as { bundleId: string };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { updateGiftBox } = useGiftStore();

  const { data } = useMyBundleDetail(parseInt(bundleId));
  const { name, designType, link, status, gifts } = data?.result || {
    name: "",
    designType: "",
    link: "",
    status: "",
    gifts: [],
  };

  const { setIsClickedUpdateFilledButton } = useIsClickedUpdateFilledButton();

  useEffect(() => {
    setIsClickedUpdateFilledButton(false);
  }, [setIsClickedUpdateFilledButton]);

  const handleCopyLink = () => {
    if (link !== null) {
      navigator.clipboard
        .writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/bundle/${link}?step=1`)
        .then(() => {
          toast({
            description: "링크를 복사하였습니다.",
          });
        })
        .catch(() =>
          toast({
            variant: "destructive",
            description: "링크 복사에 실패하였습니다.",
            action: <ToastAction altText="Try again">다시 시도</ToastAction>,
          }),
        );
    }
  };

  const { mutate: deleteBundle } = useDeleteBundle();
  const handleDelete = () => {
    if (!bundleId) return;

    deleteBundle(parseInt(bundleId), {
      onSuccess: () => {
        router.push("/bundle/list");
      },
      onError: () => {
        toast({
          variant: "destructive",
          description: "삭제에 실패하였습니다.",
          action: <ToastAction altText="Try again">다시 시도</ToastAction>,
        });
      },
    });
  };

  const memoizedImage = useMemo(() => {
    const imageSrc = DESIGN_TYPE_MAP[designType];

    return (
      <Image
        src={imageSrc}
        alt={`bundle_design_${designType}`}
        width={187}
        height={187}
      />
    );
  }, [designType]);

  const resetStore = () => {
    resetGiftBoxes();

    sessionStorage.removeItem("bundleId"); //세션스토리지에서 보따리 id 삭제
  };

  const getTagIndex = (message: string): number => {
    if (typeof message !== "string") return 0;

    if (message.includes("당신의 취향을 저격할 수 있는 선물일 것 같아요")) {
      return 1;
    } else if (message.includes("매일 쓰면서 저를 떠올려 주세요")) {
      return 2;
    } else if (message.includes("특별한 순간, 특별한 마음을 담아 준비했어요")) {
      return 3;
    } else if (message.includes("지금 가장 핫한 아이템으로 마음을 전합니다")) {
      return 4;
    }

    return 0; // 기본값 0
  };

  const { data: fillGiftData } = useFillGift(parseInt(bundleId));
  const fetchSavedGift = async () => {
    if (!bundleId) return;
    if (!fillGiftData) return;

    const gifts = fillGiftData.gifts;

    try {
      const updatePromises = gifts.map(
        async (
          gift: {
            name: string;
            message: string;
            purchaseUrl: string;
            imageUrls: string[];
          },
          index: number,
        ) => {
          const tagIndex = getTagIndex(gift.message);

          const updatedGiftBox = {
            name: gift.name,
            reason: gift.message,
            purchase_url: gift.purchaseUrl,
            tagIndex: tagIndex,
            filled: true,
            imgUrls: gift.imageUrls,
          };

          return updateGiftBox(index, updatedGiftBox);
        },
      );

      await Promise.all(updatePromises);

      router.push("/bundle/add");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFillBundle = async () => {
    resetStore(); // 기존 임시 저장 데이터 초기화
    if (bundleId) sessionStorage.setItem("bundleId", bundleId);
    setIsClickedUpdateFilledButton(true);

    try {
      await fetchSavedGift();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <div className="flex h-[calc(100%-52px)] flex-col items-center justify-center px-4">
        {status === "DRAFT" ? (
          <span className="rounded-[4px] bg-gray-100 px-[10px] py-[6px] text-[12px] font-medium">
            임시 저장 중
          </span>
        ) : status === "PUBLISHED" ? (
          <CopyLinkButton onClick={handleCopyLink} />
        ) : null}

        <div className="mb-[40px] mt-[26px] flex flex-col items-center justify-center gap-[20px]">
          {bundleId && memoizedImage}
          {name && <MyBundleNameChip name={name} />}
        </div>

        <div className="flex w-full flex-col gap-[14px]">
          <p className="text-[15px] font-medium">내가 담았던 선물</p>
          <div
            className="overflow-x-auto overflow-y-hidden"
            style={{ scrollbarWidth: "none" }}
          >
            <MyCardList data={gifts} type="image" size="small" />
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="absolute bottom-4 w-full px-4">
          {status === "DRAFT" ? (
            <div className="flex gap-[5px]">
              <DrawerTrigger asChild>
                <Button size="lg" variant={"secondary"}>
                  삭제하기
                </Button>
              </DrawerTrigger>

              {isDrawerOpen && (
                <DrawerContent>
                  <DrawerHeader className="relative mt-3 flex justify-center py-3">
                    <DrawerTitle>보따리 삭제</DrawerTitle>
                    <DrawerClose className="absolute right-[14px] top-2">
                      <Icon src={CloseIcon} alt="close" size="large" />
                    </DrawerClose>
                  </DrawerHeader>

                  <div className="mb-5 mt-[26px] flex w-full flex-col items-center justify-center gap-[22px]">
                    <div>
                      <p className="text-[15px] font-medium">
                        선물 보따리를 정말 삭제할까요?
                      </p>
                      <p className="text-sm text-gray-300">
                        삭제된 보따리는 되돌릴 수 없어요.
                      </p>
                    </div>
                    <div className="flex w-full gap-[5px] px-[18px]">
                      <DrawerClose asChild>
                        <Button size="lg" variant={"secondary"}>
                          돌아가기
                        </Button>
                      </DrawerClose>

                      <Button size="lg" onClick={handleDelete}>
                        삭제하기
                      </Button>
                    </div>
                  </div>
                </DrawerContent>
              )}

              <Button size="lg" onClick={handleFillBundle}>
                마저 채우기
              </Button>
            </div>
          ) : status === "PUBLISHED" ? (
            <Button size="lg" disabled={true}>
              아직 상대방의 답변이 오지 않았어요
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={() => router.push(`/bundle/list/${bundleId}/answer`)}
            >
              답변 확인하기
            </Button>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default Page;
