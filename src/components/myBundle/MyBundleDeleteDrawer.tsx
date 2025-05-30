import React, { useCallback } from "react";

import {
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Icon } from "../common/Icon";
import { Button } from "../ui/button";

import { useDeleteMyBundleMutation } from "@/queries/useDeleteMyBundleMutation";

import CloseIcon from "/public/icons/close_black.svg";

interface DeleteProps {
  selectedBundleId: number;
  selectedBundleName: string;
  onClose: () => void;
}

const MyBundleDeleteDrawer = ({
  selectedBundleId,
  selectedBundleName,
  onClose,
}: DeleteProps) => {
  const { mutate: deleteBundle } = useDeleteMyBundleMutation();

  const handleDelete = useCallback(() => {
    deleteBundle(selectedBundleId);
    onClose();
  }, [deleteBundle]);

  return (
    <div>
      <DrawerContent>
        <DrawerHeader className="relative mt-3 flex justify-center py-3">
          <DrawerTitle>{selectedBundleName}</DrawerTitle>
          <DrawerClose className="absolute right-[14px] top-2">
            <Icon src={CloseIcon} alt="CloseIcon" size="large" />
          </DrawerClose>
        </DrawerHeader>

        <div className="mb-5 mt-[26px] flex w-full flex-col items-center justify-center gap-[22px]">
          <div>
            <p className="text-[15px] font-medium">
              선택한 선물 보따리를 정말 삭제할까요?
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
    </div>
  );
};

export default MyBundleDeleteDrawer;
