import { useEffect } from "react";

import {
  useSelectedBagStore,
  useBundleStore,
  useIsClickedUpdateFilledButton,
} from "@/stores/bundle/useStore";
import { resetGiftBoxes } from "@/utils/utils";

const useResetStore = () => {
  const { setSelectedBagIndex } = useSelectedBagStore();
  const { setBundleName } = useBundleStore();
  const { setIsClickedUpdateFilledButton } = useIsClickedUpdateFilledButton();

  useEffect(() => {
    resetGiftBoxes();
    setSelectedBagIndex(0);
    setBundleName("");
    sessionStorage.removeItem("bundleId");
    setIsClickedUpdateFilledButton(false);
  }, [setSelectedBagIndex, setBundleName, setIsClickedUpdateFilledButton]);
};

export default useResetStore;
