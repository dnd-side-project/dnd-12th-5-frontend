import { useEffect, useState } from "react";
import { useSearchParams, useParams, usePathname } from "next/navigation";
import { useGiftBagStore, useGiftNameStore } from "@/stores/giftbag/useStore";

const useDynamicTitle = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { giftId } = useParams() as { giftId?: string };
  const { giftBagName } = useGiftBagStore();
  const { giftName } = useGiftNameStore();

  const [dynamicTitle, setDynamicTitle] = useState("");

  useEffect(() => {
    if (giftName && giftId) {
      setDynamicTitle(giftName);
    } else if (giftBagName && pathname === "/giftbag/add") {
      setDynamicTitle(giftBagName);
    } else {
      const title = searchParams?.get("title");
      if (title) {
        setDynamicTitle(title);
      } else {
        const pageTitles: { [key: string]: string } = {
          "/giftbag/detail": "내가 만든 보따리",
          "/giftbag/list": "내가 만든 보따리",
          "/giftbag/delivery": "선물 보따리 배달하기",
          "/giftbag": "선물 보따리 만들기",
          "/gift-upload": "선물 박스 채우기",
          "/setting/account": "연결된 계정",
          "/setting/notice": "공지사항",
          "/setting": "설정",
        };
        const matchedTitle = Object.keys(pageTitles).find((key) =>
          pathname?.includes(key),
        );
        setDynamicTitle(matchedTitle ? pageTitles[matchedTitle] : "PICKTORY");
      }
    }
  }, [pathname, giftId, giftName, giftBagName, searchParams]);

  return dynamicTitle;
};

export default useDynamicTitle;
