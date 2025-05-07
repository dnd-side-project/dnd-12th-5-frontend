import { useRouter } from "next/navigation";

import { useCreatingBundleStore } from "@/stores/bundle/useStore";

export const useHandleCreateBundleClick = () => {
  const router = useRouter();
  const { setIsCreatingBundle } = useCreatingBundleStore();

  return () => {
    setIsCreatingBundle(true); // 최초 생성 상태
    router.push("/bundle?step=1");
  };
};
