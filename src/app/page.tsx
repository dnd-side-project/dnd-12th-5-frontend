"use client"; // 클라이언트 컴포넌트로 선언

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

import MyCardList from "@/components/myGiftbag/MyCardList";
import Loading from "@/components/common/Loading";

import MainGraphic from "/public/img/main_graphic.svg";
import ArrowRightIcon from "/public/icons/arrow_right_small.svg";

import { giftBagData } from "@/data/giftbagData";

export default function Home() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 체크
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/auth/login");
    } else {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loading />
      </div>
    );

  if (!isLoggedIn) return null;

  const isHave = false;

  return (
    <div>
      <main className="flex flex-col gap-10 items-center justify-center pt-3 px-4">
        <Link href="/giftbag/select" className="mx-[2px]">
          <Image
            src={MainGraphic}
            alt="MainGraphic"
            width={394}
            height={346}
            loading="eager"
            className="hover:opacity-70"
          />
        </Link>
        <section className="flex flex-col gap-[14px] w-full">
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-900">내가 만든 보따리</p>
            <Link
              href="/giftbag/list"
              className="flex justify-center items-center"
            >
              <p className="text-gray-600 text-sm">더보기</p>
              <Image
                src={ArrowRightIcon}
                alt="more"
                width={14}
                height={14}
                loading="eager"
              />
            </Link>
          </div>
          <div
            className="overflow-x-auto overflow-y-hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {isHave ? (
              <MyCardList data={giftBagData} type="design" size="medium" />
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
