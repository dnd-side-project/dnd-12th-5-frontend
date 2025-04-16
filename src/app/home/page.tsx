"use client";

import Link from "next/link";
import Image from "next/image";

import MyCardList from "@/components/myBundle/MyCardList";
import Loading from "@/components/common/Loading";
import { Icon } from "@/components/common/Icon";
import { Button } from "@/components/ui/button";
import { useBundlesPreviewQuery } from "@/queries/useBundlesPreviewQuery";
import useResetStore from "@/hooks/useResetStore";

import MainGraphic from "/public/img/main_graphic.svg";
import ArrowRightIcon from "/public/icons/arrow_right_small.svg";

const Page = () => {
  useResetStore();

  const { data, isLoading } = useBundlesPreviewQuery();
  const hasBundle = data?.result?.length;

  return (
    <main className="flex flex-col items-center justify-center gap-10 px-4 pt-3">
      <div className="relative">
        <Image
          src={MainGraphic}
          alt="MainGraphic"
          width={394}
          height={346}
          loading="eager"
        />
        <Link
          href="/bundle/select"
          className="absolute bottom-3 left-1/2 w-[calc(100%-24px)] max-w-[370px] -translate-x-1/2"
        >
          <Button size="lg">보따리 만들러 가기</Button>
        </Link>
      </div>
      <section className="flex w-full flex-col gap-[14px]">
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-900">내가 만든 보따리</p>
          <Link
            href="/bundle/list"
            className="flex items-center justify-center"
          >
            <p className="text-sm text-gray-600">더보기</p>
            <Icon
              src={ArrowRightIcon}
              alt="more"
              size="small"
              loading="eager"
            />
          </Link>
        </div>
        <div
          className="overflow-x-auto overflow-y-hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {isLoading ? (
            <div className="flex w-full items-center justify-center">
              <Loading />
            </div>
          ) : hasBundle ? (
            <MyCardList data={data.result} type="design" size="medium" />
          ) : (
            <p className="flex h-[88px] items-center justify-center text-gray-200">
              아직 만들어진 보따리가 없습니다.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Page;
