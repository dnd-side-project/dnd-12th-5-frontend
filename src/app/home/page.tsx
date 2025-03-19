"use client";

import Link from "next/link";
import Image from "next/image";

import MyCardList from "@/components/myGiftbag/MyCardList";
import Loading from "@/components/common/Loading";

import MainGraphic from "/public/img/main_graphic.svg";
import ArrowRightIcon from "/public/icons/arrow_right_small.svg";

import { useGiftBagPreview } from "@/hooks/api/useMyGiftBagPreview";
import { useGiftStore } from "@/stores/gift-upload/useStore";
import {
  useSelectedBagStore,
  useGiftBagStore,
  useIsClickedUpdateFilledButton,
} from "@/stores/giftbag/useStore";
import { useEffect } from "react";

const Page = () => {
  const { data, isLoading } = useGiftBagPreview();
  const hasGiftBag = data?.result?.length;

  const { setSelectedBagIndex } = useSelectedBagStore();
  const { setGiftBagName } = useGiftBagStore();
  const { setIsClickedUpdateFilledButton } = useIsClickedUpdateFilledButton();

  const resetStore = () => {
    //추후 util로 빼야함
    useGiftStore.setState({
      giftBoxes: Array(6).fill({
        name: "",
        filled: false,
        reason: "",
        tagIndex: 0,
        purchase_url: "",
        tag: "",
        imgUrls: [],
        id: null,
      }),
    });

    setSelectedBagIndex(0);
    setGiftBagName("");
    sessionStorage.removeItem("giftBagId");
    setIsClickedUpdateFilledButton(false);
  };

  useEffect(() => {
    resetStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
          {isLoading ? (
            <div className="w-full flex justify-center items-center">
              <Loading />
            </div>
          ) : hasGiftBag ? (
            <MyCardList data={data.result} type="design" size="medium" />
          ) : (
            <p className="h-[88px] flex justify-center items-center text-gray-200">
              아직 만들어진 보따리가 없습니다.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;
