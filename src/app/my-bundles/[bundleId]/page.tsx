"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Icon } from "@/components/common/Icon";
import ShareSection from "@/components/common/ShareSection";
import MyBundleStatusChip from "@/components/myBundle/MyBundleStatusChip";
import MyCardList from "@/components/myBundle/MyCardList";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DESIGN_TYPE_MAP } from "@/constants/constants";
import { toast } from "@/hooks/use-toast";
import { useDeleteMyBundleMutation } from "@/queries/useDeleteMyBundleMutation";
import { useDraftBundleGiftsQuery } from "@/queries/useDraftBundleGiftsQuery";
import { useMyBundleDetailQuery } from "@/queries/useMyBundleDetailQuery";
import {
  useBundleNameStore,
  useCreatingBundleStore,
} from "@/stores/bundle/useStore";
import { useGiftStore } from "@/stores/gift-upload/useStore";

import CloseIcon from "/public/icons/close.svg";

import { resetGiftBoxes } from "@/utils/giftBoxUtils";

const Page = () => {
  const router = useRouter();
  const { bundleId } = useParams() as { bundleId: string };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { setBundleName } = useBundleNameStore();
  const { updateGiftBox } = useGiftStore();
  const { setIsCreatingBundle } = useCreatingBundleStore();

  const { data } = useMyBundleDetailQuery(parseInt(bundleId));
  const { name, designType, link, status, gifts } = data?.result || {
    name: "",
    designType: "",
    link: "",
    status: "",
    gifts: [],
  };

  useEffect(() => {
    if (name) {
      setBundleName(name);
    }
  }, [name]);

  const { mutate: deleteBundle } = useDeleteMyBundleMutation();

  const handleDelete = () => {
    if (!bundleId) return;

    deleteBundle(parseInt(bundleId), {
      onSuccess: () => {
        router.push("/my-bundles");
      },
      onError: () => {
        toast({
          title: "보따리 삭제에 실패했어요.",
        });
      },
    });
  };

  const memoizedImage = useMemo(() => {
    const imageSrc = DESIGN_TYPE_MAP[designType];

    if (!imageSrc) return null;

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

  const { refetch: refetchDraftGiftData } = useDraftBundleGiftsQuery(
    parseInt(bundleId),
  );
  const fetchSavedGift = async () => {
    if (!bundleId) return;

    const { data } = await refetchDraftGiftData(); // 수동
    if (!data) return;

    const gifts = data.gifts;

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

  // 마저 채우기 버튼 클릭 시
  const handleFillBundle = async () => {
    resetStore(); // 기존 임시 저장 데이터 초기화
    if (bundleId) sessionStorage.setItem("bundleId", bundleId);
    setIsCreatingBundle(false); // 최초 생성 상태 false

    try {
      await fetchSavedGift();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <div className="flex h-[calc(100%-52px)] flex-col items-center justify-center gap-10 px-4">
        <div className="flex flex-col items-center justify-center gap-6">
          {bundleId && memoizedImage}
          <MyBundleStatusChip status={status} type="message" size="md" />
        </div>
        <div className="flex w-full flex-col gap-[14px]">
          <p className="text-[15px] font-medium">내가 담았던 선물</p>
          <div
            className="overflow-x-auto overflow-y-hidden"
            style={{ scrollbarWidth: "none" }}
          >
            <MyCardList data={gifts} type="gift" size="small" />
          </div>
        </div>

        {/** 답변 대기 중인 상태만 링크 공유 가능 */}
        {status === "PUBLISHED" && (
          <div className="absolute bottom-6 w-full px-4">
            <ShareSection link={link} />
          </div>
        )}

        {/* 하단 버튼 (임시 저장, 답변 완료) */}
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
                  <DrawerHeader className="relative flex justify-center py-3">
                    <DrawerTitle>보따리 삭제</DrawerTitle>
                    <DrawerClose className="absolute right-4 top-[14px]">
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
          ) : (
            status === "COMPLETED" && (
              <Button
                size="lg"
                onClick={() => router.push(`/my-bundles/${bundleId}/answer`)}
              >
                답변 확인하기
              </Button>
            )
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default Page;
