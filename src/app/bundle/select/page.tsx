import Link from "next/link";

import BundleList from "@/components/bundle/BundleList";
import SelectedBundle from "@/components/bundle/SelectedBundle";
import { Button } from "@/components/ui/button";

const page = () => {
  const imagePaths = [
    "/img/bundle_red.svg",
    "/img/bundle_pink.svg",
    "/img/bundle_blue.svg",
    "/img/bundle_yellow.svg",
    "/img/bundle_green.svg",
  ];

  return (
    <div className="flex h-[calc(100%-52px)] flex-col items-center justify-center gap-[46px] px-4">
      <div className="flex flex-col items-center gap-[34px]">
        <SelectedBundle />
        <p className="font-nanum text-base font-bold">
          어떤 보따리에 선물을 담아볼까요?
        </p>
      </div>
      <div
        className="w-full overflow-x-auto px-4"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="min-w-max">
          <BundleList
            numberOfCards={imagePaths.length}
            size="small"
            imgPaths={imagePaths}
          />
        </div>
      </div>
      <Link href="/bundle/name" className="absolute bottom-4 w-full px-4">
        <Button size="lg">선택 완료</Button>
      </Link>
    </div>
  );
};

export default page;
