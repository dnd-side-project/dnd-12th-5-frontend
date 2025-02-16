"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import MyGiftBagCard from "@/components/myGiftbag/MyGiftBagCard";
import CheckIcon from "/public/icons/check.svg";

import { giftBagData } from "@/data/giftbagData";

const Page = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // 임시 저장된 보따리 필터링
  const filteredBottariData = giftBagData.filter(
    (giftBag) => !isChecked || giftBag.status === "DRAFT",
  );

  return (
    <main className="h-full flex flex-col items-center px-4">
      <div className="w-full flex items-center gap-2 mt-[10px] mb-6 cursor-pointer">
        <div
          onClick={() => setIsChecked(!isChecked)}
          className={`w-5 h-5 flex items-center justify-center rounded-[4px] bg-slate-100`}
        >
          {isChecked && (
            <div className="w-full h-full bg-pink-500 rounded-sm flex items-center justify-center">
              <Image src={CheckIcon} alt="CheckIcon" />
            </div>
          )}
        </div>
        <p className="text-gray-500 text-sm font-medium">
          임시저장된 보따리만 보기
        </p>
      </div>
      <button
        onClick={() => setIsEdit(!isEdit)}
        className="absolute right-6 top-4 text-gray-500 text-[15px] font-medium z-50"
      >
        {isEdit ? "완료" : "편집"}
      </button>
      <section
        className="w-full grid grid-cols-2 grid-rows-[repeat(6,_1fr)] gap-[13px] h-full overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {filteredBottariData.map((bottari) => (
          <Link key={bottari.id} href={`/giftbag/list/${bottari.id}`}>
            <MyGiftBagCard
              key={bottari.id}
              isEdit={isEdit}
              design_type={bottari.designType}
              is_read={bottari.isRead}
              status={bottari.status}
              name={bottari.name}
              updatedAt={bottari.updatedAt}
            />
          </Link>
        ))}
      </section>
    </main>
  );
};

export default Page;
