import GiftBagList from "../_components/GiftBagList";
import SelectedGiftBag from "../_components/SelectedGiftBag";
import { Button } from "@/components/ui/button";

const page = () => {
  const imagePaths = [
    "/img/giftBag_red.svg",
    "/img/giftBag_pink.svg",
    "/img/giftBag_blue.svg",
    "/img/giftBag_yellow.svg",
    "/img/giftBag_green.svg",
  ];

  return (
    <div className="flex flex-col items-center gap-[45px] overflow-x-hidden">
      <div className="flex flex-col items-center gap-5 p-4">
        <SelectedGiftBag />
        <p className="text-base font-nanum font-bold">
          어떤 보따리에 선물을 담아볼까요?
        </p>
      </div>
      <GiftBagList numberOfCards={5} size="small" imgPaths={imagePaths} />
      <Button size="lg" className="p-4">
        선택 완료
      </Button>
    </div>
  );
};

export default page;
