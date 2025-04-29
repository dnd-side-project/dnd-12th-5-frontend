"use client";

import { useRouter } from "next/navigation";

import RightArrowIcon from "/public/icons/arrow_right_small.svg";
import TrashIcon from "/public/icons/trash_icon.svg";

import Card from "@/components/common/Card";
import { Icon } from "@/components/common/Icon";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { useDeleteGiftBox } from "@/hooks/bundle/add/useDeleteGiftBox";
import { useEditBoxStore, useGiftStore } from "@/stores/gift-upload/useStore";

import DeleteBundleDrawer from "./DeleteBundleDrawer";

const GiftThumbnailList = () => {
  const { giftBoxes } = useGiftStore();
  const filledGiftBoxes = giftBoxes.filter((giftBox) => giftBox.filled);

  const router = useRouter();
  const { setIsBoxEditing } = useEditBoxStore();

  const handleGiftClick = (index: number) => {
    setIsBoxEditing(true);
    router.push(`/gift-upload?index=${index}`);
  };

  const {
    deleteDrawerOpen,
    selectedBox,
    openDeleteDrawer,
    setDeleteDrawerOpen,
    emptyGiftBox,
  } = useDeleteGiftBox();

  return (
    <>
      <div className="mb-5 mt-[26px] px-5">
        {filledGiftBoxes.map((giftBox, index) => (
          <div
            className={`flex items-center justify-between ${
              index !== filledGiftBoxes.length - 1
                ? "border-b-[1px] border-gray-100"
                : "pb-0"
            } pb-3 pt-3`}
            key={index}
          >
            <div className="flex items-center gap-2">
              <Card
                img={giftBox.imgUrls[0]}
                size="small"
                type="gift"
                noHoverStyle
                noActiveStyle
                noCursorPointerStyle
              />
              <div className="flex items-center gap-1">
                <Button variant="ghost" onClick={() => handleGiftClick(index)}>
                  <p>{giftBox.name}</p>
                  <Icon src={RightArrowIcon} alt="rightArrowIcon" />
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-5"
              onClick={() =>
                openDeleteDrawer(giftBox, giftBoxes.indexOf(giftBox))
              }
            >
              <Icon src={TrashIcon} alt="trashButton" />
            </Button>
          </div>
        ))}
      </div>

      <Drawer open={deleteDrawerOpen} onOpenChange={setDeleteDrawerOpen}>
        {deleteDrawerOpen && selectedBox && (
          <DeleteBundleDrawer
            box={selectedBox}
            handleDeleteButton={emptyGiftBox}
            setClickedDeleteBoxButton={setDeleteDrawerOpen}
          />
        )}
      </Drawer>
    </>
  );
};

export default GiftThumbnailList;
