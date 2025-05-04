import { useRouter } from "next/navigation";
import { useBundleCreateStore } from "@/stores/bundle/useStore";

export const useHandleCreateBundleClick = () => {
  const router = useRouter();
  const { setIsCreating } = useBundleCreateStore();

  return () => {
    setIsCreating(true); // 최초 생성 상태
    router.push("/bundle?step=1");
  };
};
