import Chip from "@/components/giftbag/Chip";
import GiftList from "@/components/giftbag/GiftList";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="bg-[#FFF7F7] flex flex-col items-center p-4 gap-10">
      <div className="flex flex-col gap-7 w-[300px] items-center">
        <Chip text="채워진 선물박스 0개" />
        <GiftList />
      </div>
      <Button disabled={true} size="lg">
        선물 배달하러 가기
      </Button>
    </div>
  );
};

export default page;
