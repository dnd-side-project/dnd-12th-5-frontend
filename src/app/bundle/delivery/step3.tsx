"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import ShareSection from "@/components/common/ShareSection";
import { CHARACTERS, BUNDLE_COLORS } from "@/constants/constants";
import { useSelectedBagStore } from "@/stores/bundle/useStore";

const Step3 = () => {
  const searchParams = useSearchParams();
  const characterKo = searchParams?.get("character") ?? "포리";
  const link = searchParams && searchParams.get("link");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const characterEntry = Object.values(CHARACTERS).find(
    (char) => char.ko === characterKo,
  );
  const characterEn = characterEntry?.en ?? "pori";

  const { selectedBagIndex } = useSelectedBagStore();
  const color = BUNDLE_COLORS[selectedBagIndex].toLowerCase().trim();

  return (
    <div className="h-full bg-[url('/img/background_union.svg')] bg-cover bg-center">
      {isLoading ? (
        <>
          <section className="flex h-full w-full flex-col items-center justify-center gap-8">
            <div className="flex flex-col gap-[10px]">
              <h1 className="text-md text-center font-nanum font-bold tracking-[-0.03em] text-gray-800">
                픽토리의 선물 보따리 <br />
                배달 준비 중...
              </h1>
            </div>
            <Image
              src={`/img/bundle_${color}.svg`}
              alt="bundle"
              width={160}
              height={160}
              style={{ width: "160px", height: "160px" }}
              className="mb-[180px] animate-bounceY"
            />
          </section>
        </>
      ) : (
        <>
          <section className="flex h-full flex-col items-center justify-center gap-[34px]">
            <Image
              src={`/img/${characterEn}_${color}.svg`}
              alt="delivery"
              width={200}
              height={200}
              style={{ width: "200px", height: "200px" }}
            />
            <div className="flex flex-col gap-[10px]">
              <h1 className="font-nanum text-lg font-bold tracking-[-0.03em] text-gray-900">
                이제 보따리를 배달할 차례에요!
              </h1>
              <p className="text-center font-nanum text-sm tracking-[-0.03em] text-gray-700">
                선물 받으실 분에게 링크를 전달해볼까요? <br />그 이후는 저에게
                맡겨주세요!
              </p>
            </div>
            {link && (
              <div className="w-full px-4">
                <ShareSection link={link} />
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Step3;
