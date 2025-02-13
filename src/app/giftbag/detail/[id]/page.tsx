"use client";

import Image from "next/image";

import giftBag_Red from "/public/img/giftBag_red.svg";
import giftBag_Green from "/public/img/giftBag_green.svg";
import giftBag_Blue from "/public/img/giftBag_blue.svg";
import giftBag_Yellow from "/public/img/giftBag_yellow.svg";
import giftBag_Pink from "/public/img/giftBag_pink.svg";

import { Button } from "@/components/ui/button";
import MyGiftBagNameChip from "@/components/myGiftbag/MyGiftBagNameChip";
import MyGiftBagList from "@/components/myGiftbag/MyCardList";
import CopyLinkButton from "@/components/myGiftbag/CopyLinkButton";

// 임시 선물 데이터
const ImagePaths = [
  "/img/gift_1.jpg",
  "/img/gift_2.jpg",
  "/img/gift_3_1.jpg",
  "/img/gift_4.jpg",
  "/img/gift_3_3.jpg",
];

const Page = () => {
  // const { id } = useParams();

  // const [name, setName] = useState("픽토리의 생일 선물 보따리");
  // const [design_type, setDesignType] = useState("PINK");
  // const [status, setStatus] = useState("PUBLISHED");
  // const [link, setLink] = useState("https://www.naver.com/");

  // 임시 데이터
  const name = "픽토리의 생일 선물 보따리";
  const design_type = "GREEN";
  const status = "DRAFT";
  const link = "https://www.naver.com/";

  // const getData = () => {
  // 1. 보따리 상세 조회 API
  // GET /api/v1/bundles/{id}
  // };

  const giftBagDesignURL =
    design_type === "GREEN"
      ? giftBag_Green
      : design_type === "RED"
        ? giftBag_Red
        : design_type === "BLUE"
          ? giftBag_Blue
          : design_type === "YELLOW"
            ? giftBag_Yellow
            : giftBag_Pink;

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
        <Image
          src={giftBagDesignURL}
          alt={`giftBag_design_${design_type}`}
          width={179}
          height={199}
        />
        <MyGiftBagNameChip name={name} />
      </div>

      <div className="flex flex-col gap-[14px] w-full">
        <p className="text-[15px] font-medium">내가 담았던 선물</p>
        <div
          className="overflow-x-auto overflow-y-hidden"
          style={{ scrollbarWidth: "none" }}
        >
          <MyGiftBagList data={ImagePaths} type="image" size="small" />
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
