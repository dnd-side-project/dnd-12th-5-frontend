"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import MyGiftBagCard from "@/components/myGiftbag/MyGiftBagCard";

import CheckIcon from "/public/icons/check.svg";
import { giftBagData } from "@/data/giftbagData";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedGiftBagInfo, setSelectedGiftBagInfo] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const filteredBottariData = giftBagData.filter(
    (giftBag) => !isChecked || giftBag.status === "DRAFT",
  );

  const handleDelete = useCallback((id: number) => {
    // DELETE /api/v1/bundles/{id}
    alert(id);
    setIsDrawerOpen(false);
  }, []);

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <main className="h-full flex flex-col items-center px-4">
        <div className="w-full flex items-center gap-2 mt-[10px] mb-6 cursor-pointer">
          <div
            onClick={() => setIsChecked(!isChecked)}
            className="w-5 h-5 flex items-center justify-center rounded-[4px] bg-slate-100"
          >
            {isChecked && (
              <div className="w-full h-full bg-pink-500 rounded-sm flex items-center justify-center">
                <Image src={CheckIcon} alt="CheckIcon" />
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
          {filteredBottariData.map((bottari) =>
            isEdit ? (
              <MyGiftBagCard
                key={bottari.id}
                isEdit={isEdit}
                design_type={bottari.designType}
                is_read={bottari.isRead}
                status={bottari.status}
                name={bottari.name}
                updatedAt={bottari.updatedAt}
                onDelete={() => {
                  setSelectedGiftBagInfo({
                    id: bottari.id,
                    name: bottari.name,
                  });
                  setIsDrawerOpen(true);
                }}
              />
            ) : (
              <Link key={bottari.id} href={`/giftbag/list/${bottari.id}`}>
                <MyGiftBagCard
                  isEdit={isEdit}
                  design_type={bottari.designType}
                  is_read={bottari.isRead}
                  status={bottari.status}
                  name={bottari.name}
                  updatedAt={bottari.updatedAt}
                />
              </Link>
            ),
          )}
        </section>

        {isDrawerOpen && (
          <DrawerContent>
            <DrawerHeader className="relative flex justify-center py-3">
              <DrawerTitle>
                {selectedGiftBagInfo ? selectedGiftBagInfo.name : ""}
              </DrawerTitle>
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

                <Button
                  size="lg"
                  onClick={() =>
                    selectedGiftBagInfo && handleDelete(selectedGiftBagInfo.id)
                  }
                >
                  삭제하기
                </Button>
              </div>
            </div>
          </DrawerContent>
        )}
      </main>
    </Drawer>
  );
};

export default Page;
