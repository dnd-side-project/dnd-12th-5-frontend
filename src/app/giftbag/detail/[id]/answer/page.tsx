"use client";

import Card from "@/components/common/Card";
import AnswerChip from "@/components/giftbag/AnswerChip";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ArrowIcon from "../../../../../../public/icons/arrow_right_medium.svg";
import Image from "next/image";

const Page = () => {
  {
    /* 백엔드 res에서 이렇게 준다고 가정 */
  }
  const mockGiftData = [
    {
      name: "휴대폰 케이스",
      link: "https://www.naver.com/",
      images: ["/img/gift_1.jpg"],
      message: "갖고 싶던 선물이에요!",
    },
    {
      name: "텀블러텀블러텀블러텀블러텀블러텀블러텀블",
      link: "https://www.naver.com/",
      images: ["/img/gift_2.jpg"],
      message: "갖고 싶던 선물이에요!",
    },
    {
      name: "신발",
      link: "",
      images: ["/img/gift_3_1.jpg", "/img/gift_3_2.jpg", "/img/gift_3_3.jpg"],
      message: "마음에 들어요!",
    },
    {
      name: "휴대폰 케이스",
      link: "https://www.naver.com/",
      images: ["/img/gift_1.jpg"],
      message: "제 취향이 아니에요",
    },
    {
      name: "신발",
      link: "",
      images: ["/img/gift_3_1.jpg", "/img/gift_3_2.jpg", "/img/gift_3_3.jpg"],
      message: "이미 가지고 있어요",
    },
    {
      name: "텀블러텀블러텀블러텀블러텀블러텀블러텀블",
      link: "https://www.naver.com/",
      images: ["/img/gift_2.jpg"],
      message: "잘 모르겠어요",
    },
  ];

  {
    /* message에 따라 분류 */
  }
  const groupedGifts = mockGiftData.reduce(
    (acc, gift) => {
      if (!acc[gift.message]) acc[gift.message] = [];
      acc[gift.message].push(gift);
      return acc;
    },
    {} as Record<string, typeof mockGiftData>,
  );

  return (
    <div className="h-full overflow-hidden">
      <div
        className="overflow-y-auto h-[calc(100%-26px)] px-4 pb-4 overflow-x-hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {Object.entries(groupedGifts).map(([message, gifts], idx) => (
          <div key={message} className="flex flex-col gap-6">
            <div className="mt-1">
              {idx !== 0 && (
                <hr className="my-4 border-gray-100 border-[1px] mb-[26px]" />
              )}
              {idx === 0 && <div className="mt-[26px]" />}
              <AnswerChip text={message} />
            </div>
            <div className="flex flex-col gap-[14px]">
              {gifts.map((gift, index) => (
                <div
                  className="flex items-center h-[70px] justify-between relative hover:opacity-70 cursor-pointer"
                  key={index}
                >
                  <div className="flex gap-4 w-full">
                    <Card
                      img={gift.images[0]}
                      size="small"
                      type="image"
                      noHoverStyle={true}
                      noActiveStyle={true}
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
                            className="text-xs text-gray-400"
                          >
                            링크 바로가기
                          </Button>
                        </Link>
                      ) : (
                        <div>
                          <Button
                            variant="link"
                            disabled
                            className="text-xs text-gray-200"
                          >
                            링크 바로가기
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="absolute left-44 top-1/2 transform -translate-y-1/2"
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
