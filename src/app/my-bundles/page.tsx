"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

import { Icon } from "@/components/common/Icon";
import Loading from "@/components/common/Loading";
import MyBundleCard from "@/components/myBundle/MyBundleCard";

import CheckIcon from "/public/icons/check.svg";
import CloseIcon from "/public/icons/close.svg";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { useDeleteMyBundleMutation } from "@/queries/useDeleteMyBundleMutation";
import { useMyBundlesQuery } from "@/queries/useMyBundlesQuery";
import { MyBundle } from "@/types/bundle/types";

const Page = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedBundleInfo, setSelectedBundleInfo] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const { data, isLoading } = useMyBundlesQuery();
  const hasBundle = data?.result?.length;

  const filteredBottariData =
    data?.result?.filter(
      (bundle: { status: string }) => !isChecked || bundle.status === "DRAFT",
    ) || [];

  const { mutate: deleteBundle } = useDeleteMyBundleMutation();

  const handleDelete = useCallback(
    (id: number) => {
      deleteBundle(id);
      setIsDrawerOpen(false);
    },
    [deleteBundle],
  );

  if (isLoading) {
    return (
      <>
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <Loading />
          </div>
        )}
      </>
    );
  }

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      {hasBundle ? (
        <main className="flex h-full flex-col items-center px-4">
          <div className="mb-6 mt-[10px] flex w-full cursor-pointer items-center gap-2">
            <div
              onClick={() => setIsChecked(!isChecked)}
              className="flex h-5 w-5 items-center justify-center rounded-[4px] bg-slate-100"
            >
              {isChecked && (
                <div className="flex h-full w-full items-center justify-center rounded-sm bg-pink-500">
                  <Icon src={CheckIcon} alt="CheckIcon" />
                </div>
              )}
            </div>
            <p className="text-sm font-medium text-gray-500">
              임시저장된 보따리만 보기
            </p>
          </div>
          <button
            onClick={() => setIsEdit(!isEdit)}
            className="absolute right-6 top-4 z-50 text-[15px] font-medium text-gray-500"
          >
            {isEdit ? "완료" : "편집"}
          </button>

          <section
            className="auto-rows grid w-full grid-cols-2 gap-[13px] overflow-y-auto pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {filteredBottariData.map((bundle: MyBundle) =>
              isEdit ? (
                <MyBundleCard
                  key={bundle.id}
                  isEdit={isEdit}
                  design_type={bundle.designType}
                  is_read={bundle.isRead}
                  status={bundle.status}
                  name={bundle.name}
                  updatedAt={bundle.updatedAt}
                  onDelete={() => {
                    setSelectedBundleInfo({
                      id: bundle.id,
                      name: bundle.name,
                    });
                    setIsDrawerOpen(true);
                  }}
                />
              ) : (
                <>
                  {bundle.id && (
                    <Link key={bundle.id} href={`/my-bundles/${bundle.id}`}>
                      <MyBundleCard
                        isEdit={isEdit}
                        design_type={bundle.designType}
                        is_read={bundle.isRead}
                        status={bundle.status}
                        name={bundle.name}
                        updatedAt={bundle.updatedAt}
                      />
                    </Link>
                  )}
                </>
              ),
            )}
          </section>

          {isDrawerOpen && (
            <DrawerContent>
              <DrawerHeader className="relative mt-3 flex justify-center py-3">
                <DrawerTitle>
                  {selectedBundleInfo ? selectedBundleInfo.name : ""}
                </DrawerTitle>
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

                  <Button
                    size="lg"
                    onClick={() =>
                      selectedBundleInfo && handleDelete(selectedBundleInfo.id)
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
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <p>아직 만들어진 보따리가 없어요</p>
              <Link href={"/bundle/select"}>
                <Button className="w-[130px] rounded-[500px] px-[21px] py-[11px] text-[12px] font-medium">
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
