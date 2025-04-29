import { useState } from "react";

import { toast } from "@/hooks/use-toast";
import { useGiftStore } from "@/stores/gift-upload/useStore";
import { GiftBox } from "@/types/bundle/types";

export const useDeleteGiftBox = () => {
  const { updateGiftBox } = useGiftStore();

  const [deleteDrawerOpen, setDeleteDrawerOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState<GiftBox | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openDeleteDrawer = (box: GiftBox, index: number) => {
    setSelectedBox(box);
    setSelectedIndex(index);
    setDeleteDrawerOpen(true);
  };

  const closeDeleteDrawer = () => {
    setSelectedBox(null);
    setSelectedIndex(null);
    setDeleteDrawerOpen(false);
  };

  const emptyGiftBox = () => {
    if (selectedIndex !== null) {
      updateGiftBox(selectedIndex, {
        name: "",
        reason: "",
        purchase_url: "",
        tag: "",
        filled: false,
        imgUrls: [],
        id: null,
      });
    }
    closeDeleteDrawer();

    toast({
      title: "선물박스를 성공적으로 비웠어요!",
    });
  };

  return {
    deleteDrawerOpen,
    selectedBox,
    selectedIndex,
    openDeleteDrawer,
    closeDeleteDrawer,
    emptyGiftBox,
    setDeleteDrawerOpen,
  };
};
