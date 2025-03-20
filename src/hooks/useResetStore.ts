import { useEffect } from "react";
import {
  useSelectedBagStore,
  useGiftBagStore,
  useIsClickedUpdateFilledButton,
} from "@/stores/giftbag/useStore";
import { resetGiftBoxes } from "@/utils/utils";

const useResetStore = () => {
  const { setSelectedBagIndex } = useSelectedBagStore();
  const { setGiftBagName } = useGiftBagStore();
  const { setIsClickedUpdateFilledButton } = useIsClickedUpdateFilledButton();

  useEffect(() => {
    resetGiftBoxes();
    setSelectedBagIndex(0);
    setGiftBagName("");
    sessionStorage.removeItem("giftBagId");
    setIsClickedUpdateFilledButton(false);
  }, [setSelectedBagIndex, setGiftBagName, setIsClickedUpdateFilledButton]);
};

export default useResetStore;
