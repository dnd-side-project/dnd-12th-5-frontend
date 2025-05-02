import Link from "next/link";

import SelectedBundle from "@/components/bundle/SelectedBundle";
import MyCardList from "@/components/myBundle/MyCardList";
import { Button } from "@/components/ui/button";
import { BUNDLE_IMAGE_PATHS } from "@/constants/constants";

const Step1 = () => {
  return (
    <div className="flex h-[calc(100%-68px)] flex-col items-center justify-center gap-[39px] px-4">
      <div className="flex flex-col items-center gap-[42px]">
        <SelectedBundle />
        <p className="font-nanum text-base font-bold">
          보따리의 색상을 골라주세요
        </p>
      </div>
      <div
        className="w-full overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="min-w-max">
          <MyCardList
            type="bundle"
            size="small"
            data={BUNDLE_IMAGE_PATHS}
            isSelectable={true}
          />
        </div>
      </div>
      <Link href="/bundle?step=2" className="absolute bottom-4 w-full px-4">
        <Button size="lg">선택 완료</Button>
      </Link>
    </div>
  );
};

export default Step1;
