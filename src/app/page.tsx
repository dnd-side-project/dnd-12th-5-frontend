"use client"; // 클라이언트 컴포넌트로 선언

import Image from "next/image";
import { useRouter } from "next/navigation";

import MyCardList from "@/components/myGiftbag/MyCardList";

import MainGraphic from "/public/img/main_graphic.svg";
import ArrowRightIcon from "/public/icons/arrow_right_small.svg";

// 임시 데이터
// 추후 서버에서 받아오기
const ImagePaths = [
  "/img/giftBag_red.svg",
  "/img/giftBag_pink.svg",
  "/img/giftBag_blue.svg",
  "/img/giftBag_yellow.svg",
  "/img/giftBag_green.svg",
];

export default function Home() {
  const router = useRouter();

  // 임시 상태
  const isHave = false;

  return (
    <div>
      <main className="flex flex-col gap-10 items-center justify-center pt-3 px-4">
        <button
          className="mx-[2px]"
          onClick={() => router.push(`/giftbag/select`)}
        >
          <Image src={MainGraphic} alt="MainGraphic" width={394} height={346} />
        </button>
        <section className="flex flex-col gap-[14px] w-full">
          <div
            className="flex justify-between items-center"
            onClick={() => router.push(`/giftbag/list`)}
          >
            <p className="font-medium text-gray-900">내가 만든 보따리</p>
            <button className="flex justify-center items-center">
              <p className="text-gray-600 text-sm">더보기</p>
              <Image src={ArrowRightIcon} alt="more" width={14} height={14} />
            </button>
          </div>
          <div
            className="overflow-x-auto overflow-y-hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {isHave ? (
              <MyCardList data={ImagePaths} type="design" size="medium" />
            ) : (
              <p className="h-[88px] flex justify-center items-center text-gray-200">
                아직 만들어진 보따리가 없습니다.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
