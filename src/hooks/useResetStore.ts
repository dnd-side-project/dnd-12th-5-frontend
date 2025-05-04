import { useEffect } from "react";

import {
  useSelectedBagStore,
  useBundleNameStore,
  useSnapshotGiftBoxesStore,
} from "@/stores/bundle/useStore";
import { resetGiftBoxes } from "@/utils/giftBoxUtils";

const useResetStore = () => {
  const { setSelectedBagIndex } = useSelectedBagStore();
  const { setBundleName } = useBundleNameStore();
  const { setSnapshotGiftBoxes } = useSnapshotGiftBoxesStore();

  useEffect(() => {
    resetGiftBoxes();
    setSelectedBagIndex(0);
    setBundleName("");
    sessionStorage.removeItem("bundleId");
    setSnapshotGiftBoxes(null);
  }, [setSelectedBagIndex, setBundleName]);
};

export default useResetStore;
