import CharacterCountInput from "@/components/common/CharacterCountInput";
import SelectedGiftBag from "@/components/giftbag/SelectedGiftBag";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col items-center gap-[45px] p-4">
      <div className="flex flex-col items-center gap-5">
        <SelectedGiftBag />
        <p className="text-base font-nanum font-bold">
          선물 보따리의 이름을 적어주세요
        </p>
      </div>
      <CharacterCountInput
        maxLength={20}
        placeholder="빅토리의 생일 선물 보따리"
      />
      <Link href="/giftbag/add">
        <Button size="lg">선물 채우러 가기</Button>
      </Link>
    </div>
  );
};

export default page;
