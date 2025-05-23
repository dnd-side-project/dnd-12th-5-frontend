"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import AnswerChip from "@/components/bundle/AnswerChip";
import BundleErrorPage from "@/components/common/BundleErrorPage";
import Card from "@/components/common/Card";
import { Icon } from "@/components/common/Icon";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";

import ArrowRightIcon from "/public/icons/arrow_right_medium.svg";

import { GIFT_ANSWER_MAP } from "@/constants/constants";
import { useBundleResultQuery } from "@/queries/useBundleResultQuery";
import { AnsweredGift } from "@/types/my-bundles/types";

const Page = () => {
  const { bundleId } = useParams() as { bundleId: string };
  const router = useRouter();

  const { data: giftData, isPending, isError } = useBundleResultQuery(bundleId);

  if (isPending)
    return (
      <div className="relative h-full w-full">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <Loading />
        </div>
      </div>
    );
  if (isError || !giftData)
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <BundleErrorPage />
      </div>
    );

  const giftsGroupedByResponseTag = giftData.reduce(
    (acc, gift) => {
      if (!acc[gift.responseTag]) acc[gift.responseTag] = [];
      acc[gift.responseTag].push(gift as AnsweredGift);
      return acc;
    },
    {} as Record<string, AnsweredGift[]>,
  );

  return (
    <div className="h-full overflow-hidden">
      <div
        className="h-[calc(100%-26px)] overflow-y-auto overflow-x-hidden px-4 pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {Object.entries(giftsGroupedByResponseTag).map(
          ([responseTag, gifts], idx) => (
            <div key={responseTag} className="flex flex-col gap-4">
              <div className="mt-1">
                {idx !== 0 && (
                  <hr className="my-[26px] border-[1px] border-gray-100" />
                )}
                {idx === 0 && <div className="mt-[26px]" />}
                <AnswerChip text={GIFT_ANSWER_MAP[responseTag] || "기타"} />
              </div>
              <div className="flex flex-col gap-[14px]">
                {gifts.map((gift, index) => (
                  <div
                    className="relative flex h-[70px] items-center justify-between"
                    key={index}
                  >
                    <div className="flex w-full gap-3">
                      <Card
                        img={gift.thumbnail}
                        size="small"
                        type="gift"
                        noHoverStyle={true}
                        noActiveStyle={true}
                        noCursorPointerStyle={true}
                      />
                      <div className="flex flex-col items-start justify-center">
                        <div className="max-w-[250px] overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-medium">
                          {gift.name}
                        </div>
                        {gift.purchaseUrl ? (
                          <Link
                            href={gift.purchaseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="link"
                              className="text-xs text-gray-600"
                            >
                              링크 바로가기
                            </Button>
                          </Link>
                        ) : (
                          <div>
                            <Button
                              variant="link"
                              disabled
                              className="text-xs text-gray-300"
                            >
                              링크 바로가기
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="absolute left-44 top-1/2 -translate-y-1/2 transform hover:opacity-70"
                      onClick={() =>
                        router.push(`/my-bundles/${bundleId}/${gift.id}`)
                      }
                    >
                      <Icon src={ArrowRightIcon} alt="ArrowRightIcon" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default Page;
