"use client";

import CharacterCountInput from "@/components/common/CharacterCountInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BUNDLE_NAME_MAX_LENGTH } from "@/constants/constants";
import { useBundleStore } from "@/stores/bundle/useStore";

const BundleForm = () => {
  const { bundleName, setBundleName } = useBundleStore();

  return (
    <div className="flex w-full flex-col items-center gap-[57px]">
      <CharacterCountInput
        maxLength={BUNDLE_NAME_MAX_LENGTH}
        placeholder="픽토리의 생일 선물 보따리"
        value={bundleName}
        onChange={setBundleName}
      />
      <Link href="/bundle/add" className="absolute bottom-4 w-full px-4">
        <Button size="lg" disabled={bundleName.length === 0}>
          선물 채우러 가기
        </Button>
      </Link>
    </div>
  );
};

export default BundleForm;
