"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import MyGiftBagCard from "@/components/myGiftbag/MyGiftBagCard";
import CheckIcon from "/public/icons/check.svg";

// 임시 데이터
// 추후 API 연동
const bottariData = [
  {
    id: 1,
    name: "보따리 1",
    design_type: "/img/giftBag_red.svg",
    isRead: true,
    status: "PUBLISHED",
    created_at: "2025-02-07",
  },
  {
    id: 2,
    name: "보따리 2",
    design_type: "/img/giftBag_pink.svg",
    isRead: true,
    status: "COMPLETED",
    created_at: "2025-02-03",
  },
  {
    id: 3,
    name: "보따리 3",
    design_type: "/img/giftBag_blue.svg",
    isRead: true,
    status: "DRAFT",
    created_at: "2025-01-11",
  },
  {
    id: 4,
    name: "보따리 4",
    design_type: "/img/giftBag_yellow.svg",
    isRead: false,
    status: "COMPLETED",
    created_at: "2025-01-05",
  },
  {
    id: 5,
    name: "보따리 5",
    design_type: "/img/giftBag_red.svg",
    isRead: true,
    status: "PUBLISHED",
    created_at: "2025-02-07",
  },
  {
    id: 6,
    name: "보따리 6",
    design_type: "/img/giftBag_pink.svg",
    isRead: true,
    status: "COMPLETED",
    created_at: "2025-02-03",
  },
  {
    id: 7,
    name: "보따리 7",
    design_type: "/img/giftBag_blue.svg",
    isRead: true,
    status: "DRAFT",
    created_at: "2025-01-11",
  },
  {
    id: 8,
    name: "보따리 8",
    design_type: "/img/giftBag_yellow.svg",
    isRead: false,
    status: "COMPLETED",
    created_at: "2025-01-05",
  },
];

const Page = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // 임시 저장된 보따리 필터링
  const filteredBottariData = bottariData.filter(
    (bottari) => !isChecked || bottari.status === "DRAFT",
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
          <Link key={bottari.id} href={`/giftbag/detail/${bottari.id}`}>
            <MyGiftBagCard
              key={bottari.id}
              isEdit={isEdit}
              design_type={bottari.design_type}
              is_read={bottari.isRead}
              status={bottari.status}
              name={bottari.name}
              created_at={bottari.created_at}
            />
          </Link>
        ))}
      </section>
    </main>
  );
};

export default Page;
