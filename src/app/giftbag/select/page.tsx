import GiftBagList from "@/components/giftbag/GiftBagList";
import SelectedGiftBag from "@/components/giftbag/SelectedGiftBag";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  const imagePaths = [
    "/img/giftBag_red.svg",
    "/img/giftBag_pink.svg",
    "/img/giftBag_blue.svg",
    "/img/giftBag_yellow.svg",
    "/img/giftBag_green.svg",
  ];

  return (
    <div className="h-[calc(100%-52px)] flex flex-col items-center justify-center gap-[46px] px-4">
      <div className="flex flex-col items-center gap-[34px]">
        <SelectedGiftBag />
        <p className="text-base font-nanum font-bold">
          어떤 보따리에 선물을 담아볼까요?
        </p>
      </div>
      <div
        className="w-full overflow-x-auto px-4"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="min-w-max">
          <GiftBagList
            numberOfCards={imagePaths.length}
            size="small"
            imgPaths={imagePaths}
          />
        </div>
      </div>
      <Link href="/giftbag/name" className="w-full px-4 absolute bottom-4">
        <Button size="lg">선택 완료</Button>
      </Link>
    </div>
  );
};

export default page;
