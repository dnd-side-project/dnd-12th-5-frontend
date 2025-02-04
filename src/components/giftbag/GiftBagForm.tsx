"use client";

import { useState } from "react";
import CharacterCountInput from "@/components/common/CharacterCountInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const GiftBagForm = () => {
  const [giftBagName, setGiftBagName] = useState("");

  return (
    <div className="flex flex-col items-center gap-[57px]">
      <CharacterCountInput
        maxLength={20}
        placeholder="빅토리의 생일 선물 보따리"
        onChange={setGiftBagName}
      />
      <Link href="/giftbag/add">
        <Button size="lg" disabled={giftBagName.length === 0}>
          선물 채우러 가기
        </Button>
      </Link>
    </div>
  );
};

export default GiftBagForm;
