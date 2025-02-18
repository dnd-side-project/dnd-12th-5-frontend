"use client";

import CharacterCountInput from "@/components/common/CharacterCountInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GIFTBAG_NAME_MAX_LENGTH } from "@/constants/constants";
import { useGiftBagStore } from "@/stores/giftbag/useStore";

const GiftBagForm = () => {
  const { giftBagName, setGiftBagName } = useGiftBagStore();

  return (
    <div className="w-full flex flex-col items-center gap-[57px]">
      <CharacterCountInput
        maxLength={GIFTBAG_NAME_MAX_LENGTH}
        placeholder="픽토리의 생일 선물 보따리"
        value={giftBagName}
        onChange={setGiftBagName}
      />
      <Link href="/giftbag/add" className="w-full px-4 absolute bottom-4">
        <Button size="lg" disabled={giftBagName.length === 0}>
          선물 채우러 가기
        </Button>
      </Link>
    </div>
  );
};

export default GiftBagForm;
