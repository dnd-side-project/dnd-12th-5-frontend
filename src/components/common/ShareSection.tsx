import React from "react";
import { usePathname } from "next/navigation";

import { Icon } from "@/components/common/Icon";
import { toast } from "@/hooks/use-toast";

import KakaoShareIcon from "/public/icons/kakao_circle_logo.svg";
import LinkCopyIcon from "/public/icons/link_2.svg";

const ShareSection = ({ link }: { link: string }) => {
  const pathname = usePathname();
  const isMyBundleDetail = /^\/my-bundles\/\d+$/.test(pathname);

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
          description: "선물 보따리가 도착했어요! 🎁",
          imageUrl: "https://i.imgur.com/4dHZTvt.png",
          link: {
            mobileWebUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/bundle/${link}?step=1`,
            webUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/bundle/${link}?step=1`,
          },
        },
        buttons: [
          {
            title: "보따리 풀어보기",
            link: {
              mobileWebUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/bundle/${link}?step=1`,
              webUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/bundle/${link}?step=1`,
            },
          },
        ],
      });
    } catch {
      toast({
        title: "카카오톡 공유에 실패했어요.",
      });
    }
  };

  return (
    <div
      className={`justify-center", flex flex-col items-center ${isMyBundleDetail ? "gap-[15px]" : "gap-[26px]"} `}
    >
      <div className="flex w-full items-center justify-center gap-2 py-[1px]">
        <hr className="w-full border-[0.5px] border-gray-200" />
        <p className="whitespace-nowrap text-center text-xs font-medium text-gray-400">
          공유하기
        </p>
        <hr className="w-full border-[0.5px] border-gray-200" />
      </div>
      {/* Button Section */}
      <section className="flex gap-3">
        <button
          className="flex flex-col items-center gap-[6px]"
          onClick={shareKakao}
        >
          <Icon src={KakaoShareIcon} alt="KakaoShareIcon" />
          <p className="text-xs text-gray-600">카카오톡</p>
        </button>
        <button
          className="flex flex-col items-center gap-[6px]"
          onClick={handleCopyLink}
        >
          <Icon src={LinkCopyIcon} alt="LinkCopyIcon" />
          <p className="text-xs text-gray-600">링크 복사</p>
        </button>
      </section>
    </div>
  );
};

export default ShareSection;
