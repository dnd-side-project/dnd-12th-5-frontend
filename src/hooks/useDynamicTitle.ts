import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useBundleNameStore, useGiftNameStore } from "@/stores/bundle/useStore";

const useDynamicTitle = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { bundleName } = useBundleNameStore();
  const { giftName } = useGiftNameStore();

  const [dynamicTitle, setDynamicTitle] = useState("");

  const singleDetailRegex = /^\/my-bundles\/\d+\/?$/;
  const nestedDetailRegex = /^\/my-bundles\/\d+\/\d+$/;
  const answerDetailRegex = /^\/my-bundles\/\d+\/answer$/;

  useEffect(() => {
    if (answerDetailRegex.test(pathname)) {
      setDynamicTitle("보따리 결과");
    } else if (bundleName && singleDetailRegex.test(pathname)) {
      setDynamicTitle(bundleName);
    } else if (giftName && nestedDetailRegex.test(pathname)) {
      setDynamicTitle(giftName);
    } else if (bundleName && pathname === "/bundle/add") {
      setDynamicTitle(bundleName);
    } else {
      const pageTitles: { [path: string]: string } = {
        "/my-bundles": "내가 만든 보따리",
        "/bundle/delivery": "선물 보따리 배달하기",
        "/bundle": "선물 보따리 만들기",
        "/gift-upload": "선물 박스 채우기",
        "/setting/account": "연결된 계정",
        "/setting/notice": "공지사항",
        "/setting": "설정",
      };
      const matchedTitle = Object.keys(pageTitles).find((path) =>
        pathname?.includes(path),
      );
      setDynamicTitle(matchedTitle ? pageTitles[matchedTitle] : "PICKTORY");
    }
  }, [pathname, giftName, bundleName, searchParams]);

  return dynamicTitle;
};

export default useDynamicTitle;
