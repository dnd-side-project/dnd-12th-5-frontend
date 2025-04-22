import { createBundle, updateBundle } from "@/api/bundle/api";
import { toast } from "@/hooks/use-toast";
import { useGiftStore } from "@/stores/gift-upload/useStore";
import { GiftBox } from "@/types/bundle/types";

export const useTempSaveBundle = () => {
  const { giftBoxes, updateGiftBox } = useGiftStore();

  const handleTempSave = async ({
    bundleName,
    selectedBagIndex,
  }: {
    bundleName: string;
    selectedBagIndex: number;
  }) => {
    try {
      const bundleId = sessionStorage.getItem("bundleId");

      if (!bundleId) {
        const res = await createBundle({
          bundleName,
          selectedBagIndex,
          giftBoxes,
        });
        if (res?.id) {
          sessionStorage.setItem("bundleId", res.id);
        } else {
          throw new Error("id가 존재하지 않습니다.");
        }
      } else {
        const res = await updateBundle(giftBoxes);
        if (res?.result?.gifts) {
          res.result.gifts.forEach((gift: GiftBox, index: number) => {
            updateGiftBox(index, { id: gift.id });
          });
        } else {
          throw new Error("gifts가 존재하지 않습니다.");
        }
      }

      toast({
        title: "보따리 임시저장을 완료했어요!",
      });
      return true;
    } catch (error) {
      console.error(error);
      toast({
        title: "보따리 임시저장에 실패했어요",
      });
      return false;
    }
  };

  return { handleTempSave };
};
