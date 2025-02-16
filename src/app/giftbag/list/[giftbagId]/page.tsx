"use client";

import { useParams } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import MyGiftBagNameChip from "@/components/myGiftbag/MyGiftBagNameChip";
import MyCardList from "@/components/myGiftbag/MyCardList";
import CopyLinkButton from "@/components/myGiftbag/CopyLinkButton";

import { giftBagData } from "@/data/giftbagData";

// 임시 내가 담았던 선물 데이터
const ImagePaths = [
  "/img/gift_1.jpg",
  "/img/gift_2.jpg",
  "/img/gift_3_1.jpg",
  "/img/gift_4.jpg",
  "/img/gift_3_3.jpg",
];

const Page = () => {
  const { giftbagId } = useParams() as { giftbagId: string };
  console.log(giftbagId);

  const name = giftbagId ? giftBagData[Number(giftbagId)]?.name : null;
  const design_type = giftbagId
    ? giftBagData[Number(giftbagId)]?.designType
    : null;
  const status = giftbagId ? giftBagData[Number(giftbagId)]?.status : null;

  const link = "https://www.naver.com/"; // 상대방에게 전달할 링크

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert("링크가 복사되었습니다.");
      })
      .catch((err) => alert("복사에 실패하였습니다. " + err));
  };

  return (
    <div className="h-[calc(100%-52px)] px-4 flex flex-col justify-center items-center">
      {status === "DRAFT" ? (
        <span className="py-[6px] px-[10px] rounded-[4px] bg-gray-100 text-[12px] font-medium">
          임시 저장 중
        </span>
      ) : status === "PUBLISHED" ? (
        <CopyLinkButton onClick={handleCopyLink} />
      ) : null}

      <div className="flex flex-col justify-center items-center gap-[20px] mt-[26px] mb-[40px]">
        {giftbagId && (
          <Image
            src={giftBagData[Number(giftbagId)]?.designType}
            alt={`giftBag_design_${design_type}`}
            width={179}
            height={199}
          />
        )}
        {name && <MyGiftBagNameChip name={name} />}
      </div>

      <div className="flex flex-col gap-[14px] w-full">
        <p className="text-[15px] font-medium">내가 담았던 선물</p>
        <div
          className="overflow-x-auto overflow-y-hidden"
          style={{ scrollbarWidth: "none" }}
        >
          <MyCardList
            data={ImagePaths}
            type="image"
            size="small"
            giftbagIndex={giftbagId}
          />
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="absolute bottom-4 w-full px-4">
        {status === "DRAFT" ? (
          <div className="flex gap-[5px]">
            <Button size="lg" variant={"secondary"}>
              삭제하기
            </Button>
            <Button size="lg">마저 채우기</Button>
          </div>
        ) : status === "PUBLISHED" ? (
          <Button size="lg" disabled={true}>
            아직 상대방의 답변이 오지 않았어요
          </Button>
        ) : (
          <Button size="lg">답변 확인하기</Button>
        )}
      </div>
    </div>
  );
};

export default Page;
