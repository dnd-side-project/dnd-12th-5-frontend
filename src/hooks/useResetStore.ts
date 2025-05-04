import { useEffect } from "react";

import {
  useSelectedBagStore,
  useBundleNameStore,
  useBundleEditStore,
} from "@/stores/bundle/useStore";
import { resetGiftBoxes } from "@/utils/giftBoxUtils";

const useResetStore = () => {
  const { setSelectedBagIndex } = useSelectedBagStore();
  const { setBundleName } = useBundleNameStore();
  const { setIsEditing } = useBundleEditStore();

  useEffect(() => {
    resetGiftBoxes();
    setSelectedBagIndex(0);
    setBundleName("");
    sessionStorage.removeItem("bundleId");
    setIsEditing(false);
  }, [setSelectedBagIndex, setBundleName, setIsEditing]);
};

export default useResetStore;
