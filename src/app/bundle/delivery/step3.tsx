"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useSelectedBagStore } from "@/stores/bundle/useStore";
import { CHARACTERS, BUNDLE_COLORS } from "@/constants/constants";

import KakaoShareButtonIcon from "/public/icons/kakao_share_button.svg";
import LinkCopyButtonIcon from "/public/icons/link_copy_button.svg";
import { Icon } from "@/components/common/Icon";

const Step3 = () => {
  const searchParams = useSearchParams();
  const characterKo = searchParams?.get("character") ?? "포리";
  const link = searchParams ? searchParams.get("link") : null;

  const characterEntry = Object.values(CHARACTERS).find(
    (char) => char.ko === characterKo,
  );
  const characterEn = characterEntry?.en ?? "pori";

  const handleCopyLink = () => {
    if (link !== null) {
      navigator.clipboard
        .writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/bundle/${link}?step=1`)
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
        variant: "destructive",
        description: "카카오톡 공유에 실패하였습니다.",
        action: <ToastAction altText="Try again">다시 시도</ToastAction>,
      });
    }
  };

  const { selectedBagIndex } = useSelectedBagStore();
  const color = BUNDLE_COLORS[selectedBagIndex].toLowerCase().trim();

  return (
    <div className="h-full bg-[url('/img/background_union.svg')] bg-cover bg-center flex flex-col items-center justify-center gap-7">
      <section className="flex flex-col items-center gap-[34px]">
        <Image
          src={`/img/${characterEn}_${color}.svg`}
          alt="delivery"
          width={200}
          height={200}
          style={{ width: "200px", height: "200px" }}
        />
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-gray-900 text-lg font-bold font-nanum tracking-[-0.03em]">
            이제 보따리를 배달할 차례에요!
          </h1>
          <p className="text-gray-700 text-sm text-center font-nanum tracking-[-0.03em]">
            선물 받으실 분에게 링크를 전달해볼까요? <br />그 이후는 저에게
            맡겨주세요!
          </p>
        </div>
      </section>

      <div className="relative w-full mt-[53px] mb-[26px] px-4">
        <hr className="w-full border-[0.5px] border-gray-200" />
        <p className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[60px] bg-pink-50 text-gray-400 text-xs font-medium text-center">
          공유하기
        </p>
      </div>

      {/* Button Section */}
      <section className="flex gap-3">
        <button
          className="flex flex-col items-center gap-1"
          onClick={shareKakao}
        >
          <Icon src={KakaoShareButtonIcon} alt="kakaoShare" />
          <p className="text-gray-600 text-xs">카카오톡</p>
        </button>
        <button
          className="flex flex-col items-center gap-1"
          onClick={handleCopyLink}
        >
          <Icon src={LinkCopyButtonIcon} alt="linkCopy" />
          <p className="text-gray-600 text-xs">링크 복사</p>
        </button>
      </section>
    </div>
  );
};

export default Step3;
