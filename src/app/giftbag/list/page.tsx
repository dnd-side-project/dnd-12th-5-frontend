"use client";

import { useCallback, useState } from "react";
import Link from "next/link";

import MyGiftBagCard from "@/components/myGiftbag/MyGiftBagCard";

import CheckIcon from "/public/icons/check.svg";
import CloseIcon from "/public/icons/close.svg";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Loading from "@/components/common/Loading";

import { useGiftBags } from "@/hooks/api/useMyGiftBags";
import { useDeleteGiftBag } from "@/hooks/api/useDeleteMyGiftBag";

import { MyGiftBag } from "@/types/giftbag/types";
import { Icon } from "@/components/common/Icon";

const Page = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedGiftBagInfo, setSelectedGiftBagInfo] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const { data, isLoading } = useGiftBags();
  const hasGiftBag = data?.result?.length;

  const filteredBottariData =
    data?.result?.filter(
      (giftBag: { status: string }) => !isChecked || giftBag.status === "DRAFT",
    ) || [];

  const { mutate: deleteGiftBag } = useDeleteGiftBag();

  const handleDelete = useCallback(
    (id: number) => {
      deleteGiftBag(id);
      setIsDrawerOpen(false);
    },
    [deleteGiftBag],
  );

  if (isLoading) {
    return (
      <>
        {isLoading && (
          <div className="w-full h-full flex justify-center items-center">
            <Loading />
          </div>
        )}
      </>
    );
  }

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      {hasGiftBag ? (
        <main className="h-full flex flex-col items-center px-4">
          <div className="w-full flex items-center gap-2 mt-[10px] mb-6 cursor-pointer">
            <div
              onClick={() => setIsChecked(!isChecked)}
              className="w-5 h-5 flex items-center justify-center rounded-[4px] bg-slate-100"
            >
              {isChecked && (
                <div className="w-full h-full bg-pink-500 rounded-sm flex items-center justify-center">
                  <Icon src={CheckIcon} alt="CheckIcon" />
                </div>
              )}
            </div>
            <p className="text-gray-500 text-sm font-medium">
              임시저장된 보따리만 보기
            </p>
          </div>
          <button
            onClick={() => setIsEdit(!isEdit)}
            className="absolute right-6 top-4 text-gray-500 text-[15px] font-medium z-50"
          >
            {isEdit ? "완료" : "편집"}
          </button>

          <section
            className="w-full grid grid-cols-2 auto-rows gap-[13px] overflow-y-auto pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {filteredBottariData.map((giftBag: MyGiftBag) =>
              isEdit ? (
                <MyGiftBagCard
                  key={giftBag.id}
                  isEdit={isEdit}
                  design_type={giftBag.designType}
                  is_read={giftBag.isRead}
                  status={giftBag.status}
                  name={giftBag.name}
                  updatedAt={giftBag.updatedAt}
                  onDelete={() => {
                    setSelectedGiftBagInfo({
                      id: giftBag.id,
                      name: giftBag.name,
                    });
                    setIsDrawerOpen(true);
                  }}
                />
              ) : (
                <>
                  {giftBag.id && (
                    <Link key={giftBag.id} href={`/giftbag/list/${giftBag.id}`}>
                      <MyGiftBagCard
                        isEdit={isEdit}
                        design_type={giftBag.designType}
                        is_read={giftBag.isRead}
                        status={giftBag.status}
                        name={giftBag.name}
                        updatedAt={giftBag.updatedAt}
                      />
                    </Link>
                  )}
                </>
              ),
            )}
          </section>

          {isDrawerOpen && (
            <DrawerContent>
              <DrawerHeader className="relative flex justify-center py-3 mt-3">
                <DrawerTitle>
                  {selectedGiftBagInfo ? selectedGiftBagInfo.name : ""}
                </DrawerTitle>
                <DrawerClose className="absolute top-2 right-[14px]">
                  <Icon src={CloseIcon} alt="close" size="large" />
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

                  <Button
                    size="lg"
                    onClick={() =>
                      selectedGiftBagInfo &&
                      handleDelete(selectedGiftBagInfo.id)
                    }
                  >
                    삭제하기
                  </Button>
                </div>
              </div>
            </DrawerContent>
          )}
        </main>
      ) : (
        <>
          <div className="h-full flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-4">
              <p>아직 만들어진 보따리가 없어요</p>
              <Link href={"/giftbag/select"}>
                <Button className="py-[11px] px-[21px] rounded-[500px] text-[12px] font-medium w-[130px]">
                  보따리 만들러 가기
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </Drawer>
  );
};

export default Page;
