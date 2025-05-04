import { useEffect } from "react";

import {
  useSelectedBagStore,
  useBundleNameStore,
} from "@/stores/bundle/useStore";
import { resetGiftBoxes } from "@/utils/giftBoxUtils";

const useResetStore = () => {
  const { setSelectedBagIndex } = useSelectedBagStore();
  const { setBundleName } = useBundleNameStore();

  useEffect(() => {
    resetGiftBoxes();
    setSelectedBagIndex(0);
    setBundleName("");
    sessionStorage.removeItem("bundleId");
  }, [setSelectedBagIndex, setBundleName]);
};

export default useResetStore;
