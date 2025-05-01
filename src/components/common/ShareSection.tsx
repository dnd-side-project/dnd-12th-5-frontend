import React from "react";

import { Icon } from "@/components/common/Icon";
import { toast } from "@/hooks/use-toast";

import KakaoShareButtonIcon from "/public/icons/kakao_share_button.svg";
import LinkCopyButtonIcon from "/public/icons/link_copy_button.svg";

const ShareSection = ({ link }: { link: string }) => {
  const handleCopyLink = () => {
    if (link !== null) {
      navigator.clipboard
        .writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/bundle/${link}?step=1`)
        .then(() => {
          toast({
            title: "링크를 복사했어요!",
          });
        })
        .catch(() =>
          toast({
            title: "링크 복사에 실패했어요.",
          }),
        );
    }
  };

  const shareKakao = () => {
    const Kakao = window.Kakao;

    try {
      Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "Picktory",
          description: "선물 보따리가 도착했어요. 🎁",
          imageUrl: "https://i.imgur.com/4dHZTvt.png",
          link: {
            mobileWebUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/bundle/${link}?step=1`,
            webUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/bundle/${link}?step=1`,
          },
        },
        buttons: [
          {
            title: "서비스 이용하러 가기",
            link: {
              mobileWebUrl: process.env.NEXT_PUBLIC_BASE_URL,
            },
          },
        ],
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "카카오톡 공유에 실패했어요.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-[15px]">
      <div className="flex w-full items-center justify-center gap-2">
        <hr className="w-full border-[0.5px] border-gray-200" />
        <p className="whitespace-nowrap text-center text-xs font-medium text-gray-400">
          공유하기
        </p>
        <hr className="w-full border-[0.5px] border-gray-200" />
      </div>

      {/* Button Section */}
      <section className="flex gap-3">
        <button
          className="flex flex-col items-center gap-1"
          onClick={shareKakao}
        >
          <Icon src={KakaoShareButtonIcon} alt="kakaoShare" />
          <p className="text-xs text-gray-600">카카오톡</p>
        </button>
        <button
          className="flex flex-col items-center gap-1"
          onClick={handleCopyLink}
        >
          <Icon src={LinkCopyButtonIcon} alt="linkCopy" />
          <p className="text-xs text-gray-600">링크 복사</p>
        </button>
      </section>
    </div>
  );
};

export default ShareSection;
