"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import Card from "@/components/common/Card";
import AnswerChip from "@/components/giftbag/AnswerChip";
import { Button } from "@/components/ui/button";

import ArrowIcon from "/public/icons/arrow_right_medium.svg";
import { fetchGiftResults, GiftData } from "@/api/giftbag/api";
import Loading from "@/components/common/Loading";
import { GIFT_ANSWER_MAP } from "@/constants/constants";

const Page = () => {
  const { giftBagId } = useParams() as { giftBagId: string };
  const router = useRouter();

  const {
    data: giftData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["giftResults", giftBagId],
    queryFn: () => fetchGiftResults(giftBagId as string),
    enabled: !!giftBagId,
  });

  if (isPending)
    return (
      <div className="relative w-full h-full">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loading />
        </div>
      </div>
    );
  if (isError || !giftData)
    return (
      <div className="h-full flex flex-col items-center justify-center ">
        <h1 className="text-4xl font-bold text-gray-800">ERROR</h1>
        <p className="text-lg text-gray-600 mt-2">
          보따리를 불러오는 중에 오류가 발생했어요!
        </p>
      </div>
    );

  const groupedGifts = giftData.reduce(
    (acc, gift) => {
      if (!acc[gift.responseTag]) acc[gift.responseTag] = [];
      acc[gift.responseTag].push(gift);
      return acc;
    },
    {} as Record<string, GiftData[]>,
  );

  return (
    <div className="h-full overflow-hidden">
      <div
        className="overflow-y-auto h-[calc(100%-26px)] px-4 pb-4 overflow-x-hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {Object.entries(groupedGifts).map(([responseTag, gifts], idx) => (
          <div key={responseTag} className="flex flex-col gap-4">
            <div className="mt-1">
              {idx !== 0 && (
                <hr className="border-gray-100 border-[1px] my-[26px]" />
              )}
              {idx === 0 && <div className="mt-[26px]" />}
              <AnswerChip text={GIFT_ANSWER_MAP[responseTag] || "기타"} />
            </div>
            <div className="flex flex-col gap-[14px]">
              {gifts.map((gift, index) => (
                <div
                  className="flex items-center h-[70px] justify-between relative"
                  key={index}
                >
                  <div className="flex gap-3 w-full">
                    <Card
                      img={gift.thumbnail}
                      size="small"
                      type="image"
                      noHoverStyle={true}
                      noActiveStyle={true}
                      noCursorPointerStyle={true}
                    />
                    <div className="flex justify-center flex-col items-start">
                      <div className="text-[15px] font-medium max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {gift.name}
                      </div>
                      {gift.link ? (
                        <Link
                          href={gift.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="link"
                            className="text-xs text-gray-600"
                          >
                            링크 바로가기
                          </Button>
                        </Link>
                      ) : (
                        <div>
                          <Button
                            variant="link"
                            disabled
                            className="text-xs text-gray-300"
                          >
                            링크 바로가기
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="absolute left-44 top-1/2 transform -translate-y-1/2 hover:opacity-70"
                    onClick={() =>
                      router.push(`/giftbag/list/${giftBagId}/${gift.id}`)
                    }
                  >
                    <Image src={ArrowIcon} alt="arrowIcon" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
