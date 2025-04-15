import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import CloseIcon from "/public/icons/close.svg";
import { Icon } from "@/components/common/Icon";
import { useBundleStore, useSelectedBagStore } from "@/stores/bundle/useStore";
import { useTempSaveBundle } from "@/hooks/useTempSaveBundle";
import { useRouter } from "next/navigation";
import { GoToHomeDrawerProps } from "@/types/bundle/types";

const GoToHomeDrawer = ({ open, onClose, onConfirm }: GoToHomeDrawerProps) => {
  const { bundleName } = useBundleStore();
  const { selectedBagIndex } = useSelectedBagStore();

  const { handleTempSave } = useTempSaveBundle();

  const router = useRouter();

  const handleTempSaveButton = async () => {
    const success = await handleTempSave({ bundleName, selectedBagIndex });
    if (success) {
      router.push("/home");
    }
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="px-2 pb-4">
        <DrawerHeader className="flex flex-col items-center gap-8">
          <DrawerTitle className="mt-3 flex">
            <p className="text-base font-medium">
              잠깐! 보따리를 채우는 중이에요
            </p>
            <DrawerClose className="absolute right-4">
              <Icon src={CloseIcon} alt="close" size="large" />
            </DrawerClose>
          </DrawerTitle>
          <p className="text-center text-sm text-gray-500">
            지금까지 채운 내용이 모두 사라져요. <br /> 그래도 홈으로 이동할까요?
          </p>
        </DrawerHeader>
        <DrawerFooter className="mt-2 flex flex-row gap-2">
          <Button variant="secondary" className="h-[52px]" onClick={onConfirm}>
            홈으로 이동하기
          </Button>
          <Button className="h-[52px]" onClick={handleTempSaveButton}>
            저장하고 이동하기
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default GoToHomeDrawer;
