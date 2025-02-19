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

import { DESIGN_TYPE_MAP } from "@/constants/constants";

const Page = () => {
  const router = useRouter();
  const { giftbagId } = useParams() as { giftbagId: string };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data } = useMyGiftBagDetail(parseInt(giftbagId));
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
        .writeText(link)
        .then(() => {
          alert("링크가 복사되었습니다.");
        })
        .catch((err) => alert("복사에 실패하였습니다. " + err));
    }
  };

  {
  }

  const { mutate: deleteGiftBag } = useDeleteGiftBag();
  const handleDelete = () => {
    if (!giftbagId) return;

    deleteGiftBag(parseInt(giftbagId), {
      onSuccess: () => {
        router.push("/giftbag/list");
      },
      onError: (error) => {
        alert("삭제에 실패했습니다. 다시 시도해주세요.");
        console.error(error);
      },
    });
  };

  const memoizedImage = useMemo(() => {
    if (!giftbagId) return null;

    return (
      <Image
        src={DESIGN_TYPE_MAP[designType]}
        alt={`giftBag_design_${designType}`}
        width={187}
        height={187}
      />
    );
  }, [giftbagId, designType]);

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
          {giftbagId && memoizedImage}
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

              <Button size="lg">마저 채우기</Button>
            </div>
          ) : status === "PUBLISHED" ? (
            <Button size="lg" disabled={true}>
              아직 상대방의 답변이 오지 않았어요
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={() => router.push(`/giftbag/list/${giftbagId}/answer`)}
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
