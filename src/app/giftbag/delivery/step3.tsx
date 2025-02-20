"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { deliveryCharacterData } from "@/data/deliveryCharacterData";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

import KakaoShareButtonIcon from "/public/icons/kakao_share_button.svg";
import LinkCopyButtonIcon from "/public/icons/link_copy_button.svg";

const Step3 = () => {
  const searchParams = useSearchParams();
  const character = searchParams ? searchParams.get("character") : null;
  const link = searchParams ? searchParams.get("link") : null;

  const handleCopyLink = () => {
    if (link !== null) {
      navigator.clipboard
        .writeText(`http://localhost:3000/giftbag/${link}?step=1`) // 추후 수정 필요
        .then(() => {
          toast({
            description: "링크를 복사하였습니다.",
          });
        })
        .catch(() =>
          toast({
            variant: "destructive",
            description: "링크 복사에 실패하였습니다.",
            action: <ToastAction altText="Try again">다시 시도</ToastAction>,
          }),
        );
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-7">
      <h1 className="text-gray-900 text-lg font-bold font-nanum">
        이제 보따리를 배달할 차례에요!
      </h1>
      <section className="flex flex-col items-center gap-4">
        <Image
          src={deliveryCharacterData[character || "포리"].imageSrc}
          alt="delivery"
          width={200}
          height={200}
          style={{ width: "200px", height: "200px" }}
        />
        <p className="text-gray-700 text-sm text-center font-nanum">
          선물 받으실 분에게 링크를 전달해볼까요? <br />그 이후는 저에게
          맡겨주세요!
        </p>
      </section>

      {/* Button Section */}
      <section className="flex gap-3">
        <button className="flex flex-col items-center gap-1">
          <Image src={KakaoShareButtonIcon} alt="kakaoShare" />
          <p className="text-gray-300 text-xs">카카오톡</p>
        </button>
        <button
          className="flex flex-col items-center gap-1"
          onClick={handleCopyLink}
        >
          <Image src={LinkCopyButtonIcon} alt="linkCopy" />
          <p className="text-gray-300 text-xs">링크 복사</p>
        </button>
      </section>

      <Link href={"/"} className="text-gray-400 text-[15px]">
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default Step3;
