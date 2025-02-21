"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import MyGiftBagNameChip from "@/components/myGiftbag/MyGiftBagNameChip";
import MyCardList from "@/components/myGiftbag/MyCardList";
import CopyLinkButton from "@/components/myGiftbag/CopyLinkButton";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useMyGiftBagDetail } from "@/hooks/api/useMyGiftBagDetail";
import { useDeleteGiftBag } from "@/hooks/api/useDeleteMyGiftBag";
import { toast } from "@/hooks/use-toast";
import { useFillGift } from "@/hooks/api/useFillGift";
import { ToastAction } from "@radix-ui/react-toast";
import { useGiftStore } from "@/stores/gift-upload/useStore";

import { DESIGN_TYPE_MAP } from "@/constants/constants";
const Page = () => {
  const router = useRouter();
  const { giftBagId } = useParams() as { giftBagId: string };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { updateGiftBox } = useGiftStore();

  const { data } = useMyGiftBagDetail(parseInt(giftBagId));
  const { name, designType, link, status, gifts } = data?.result || {
    name: "",
    designType: "",
    link: "",
    status: "",
    gifts: [],
  };

  const handleCopyLink = () => {
    if (link !== null) {
      navigator.clipboard
        .writeText(`http://localhost:3000/giftbag/${link}?step=1`)
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

  const { mutate: deleteGiftBag } = useDeleteGiftBag();
  const handleDelete = () => {
    if (!giftBagId) return;

    deleteGiftBag(parseInt(giftBagId), {
      onSuccess: () => {
        router.push("/giftbag/list");
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
        alt={`giftBag_design_${designType}`}
        width={187}
        height={187}
      />
    );
  }, [designType]);

  // 재사용 분리 필요
  const resetStore = () => {
    useGiftStore.setState({
      giftBoxes: Array(6).fill({
        name: "",
        filled: false,
        reason: "",
        tagIndex: 0,
        purchase_url: "",
        tag: "",
        imgUrls: [],
        id: null,
      }),
    });

    sessionStorage.removeItem("giftBagId"); //세션스토리지에서 보따리 id 삭제
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

  const { data: fillGiftData } = useFillGift(parseInt(giftBagId));
  const fetchSavedGift = async () => {
    if (!giftBagId) return;
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

      router.push("/giftbag/add");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFillGiftBag = async () => {
    resetStore(); // 기존 임시 저장 데이터 초기화
    if (giftBagId) sessionStorage.setItem("giftBagId", giftBagId);

    try {
      await fetchSavedGift();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <div className="h-[calc(100%-52px)] px-4 flex flex-col justify-center items-center">
        {status === "DRAFT" ? (
          <span className="py-[6px] px-[10px] rounded-[4px] bg-gray-100 text-[12px] font-medium">
            임시 저장 중
          </span>
        ) : status === "PUBLISHED" ? (
          <CopyLinkButton onClick={handleCopyLink} />
        ) : null}

        <div className="flex flex-col justify-center items-center gap-[20px] mt-[26px] mb-[40px]">
          {giftBagId && memoizedImage}
          {name && <MyGiftBagNameChip name={name} />}
        </div>

        <div className="flex flex-col gap-[14px] w-full">
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
                  <DrawerHeader className="relative flex justify-center py-3">
                    <DrawerTitle>보따리 삭제</DrawerTitle>
                    <DrawerClose className="absolute top-2 right-[14px]">
                      <Image
                        src="/icons/close.svg"
                        alt="close"
                        width={24}
                        height={24}
                      />
                    </DrawerClose>
                  </DrawerHeader>

                  <div className="w-full flex flex-col justify-center items-center gap-[22px] mb-5 mt-[26px]">
                    <div>
                      <p className="text-[15px] font-medium">
                        선물 보따리를 정말 삭제할까요?
                      </p>
                      <p className="text-sm text-gray-300">
                        삭제된 보따리는 되돌릴 수 없어요.
                      </p>
                    </div>
                    <div className="w-full flex gap-[5px] px-[18px]">
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

              <Button size="lg" onClick={handleFillGiftBag}>
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
              onClick={() => router.push(`/giftbag/list/${giftBagId}/answer`)}
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
