import { Button } from "../ui/button";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "../ui/drawer";
import CloseIcon from "/public/icons/close.svg";
import { Icon } from "../common/Icon";

const DeleteBundleDrawer = ({
  handleDeleteButton,
  setClickedDeleteBoxButton,
}: {
  handleDeleteButton: () => void;
  setClickedDeleteBoxButton: (arg: boolean) => void;
}) => {
  return (
    <DrawerContent>
      <DrawerHeader>
        <>
          <DrawerTitle className="relative text-base font-medium text-center mt-3">
            <p className="text-center text-base font-medium">
              박스를 정말 삭제하시겠습니까?
            </p>
            <DrawerClose className="absolute top-0 right-4">
              <Icon src={CloseIcon} alt="close" size="large" />
            </DrawerClose>
          </DrawerTitle>
        </>
      </DrawerHeader>
      <div className="flex flex-col gap-[22px] px-[18px] pb-5 items-center justify-center">
        <p className="text-center text-sm text-gray-500 mb-5 mt-2">
          삭제된 박스는 되돌릴 수 없어요.
        </p>
        <div className="flex gap-2 w-full">
          <Button
            className="h-[52px]"
            variant="secondary"
            onClick={() => setClickedDeleteBoxButton(false)}
          >
            돌아가기
          </Button>
          <Button className="h-[52px]" onClick={handleDeleteButton}>
            박스 비우기
          </Button>
        </div>
      </div>
    </DrawerContent>
  );
};

export default DeleteBundleDrawer;
