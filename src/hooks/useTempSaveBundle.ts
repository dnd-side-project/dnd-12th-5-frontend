import { useGiftStore } from "@/stores/gift-upload/useStore";
import { toast } from "@/hooks/use-toast";
import { createBundle, updateBundle } from "@/api/bundle/api";
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
        }
      } else {
        const res = await updateBundle(giftBoxes);
        if (res?.result?.gifts) {
          res.result.gifts.forEach((gift: GiftBox, index: number) => {
            updateGiftBox(index, { id: gift.id });
          });
        }
      }

      toast({
        title: "임시저장 성공",
        description: "보따리가 임시저장되었습니다.",
      });
    } catch (error) {
      toast({
        title: "임시저장 실패",
        description: `보따리 임시저장에 실패했습니다. ${error}`,
      });
    }
  };

  return { handleTempSave };
};
