import Image from "next/image";

import { GIFTBOX_SHAPE_SEQUENCE } from "@/constants/constants";
import {
  useBundleAnswerCompletedStore,
  useGiftAnswerStore,
  useSelectedGiftBoxStore,
} from "@/stores/bundle/useStore";
import { ReciveGiftListProps } from "@/types/components/types";

const ReceiveGiftList = ({ giftList, onClick }: ReciveGiftListProps) => {
  const answers = useGiftAnswerStore((state) => state.answers);
  const { setSelectedGiftIndex } = useSelectedGiftBoxStore();
  const { isBundleAnswerCompleted } = useBundleAnswerCompletedStore();

  return (
    <div
      className={`${
        giftList.length === 1
          ? "flex h-[130px] items-center justify-center"
          : "grid max-h-[390px] grid-cols-2 grid-rows-[repeat(auto-fill,_minmax(130px,_1fr))] gap-[3px]"
      }`}
    >
      {giftList.map((gift, index) => {
        const isMessageEmpty = !gift.message;
        const shape =
          GIFTBOX_SHAPE_SEQUENCE[index % GIFTBOX_SHAPE_SEQUENCE.length];
        const letterType = isMessageEmpty ? "no_letter" : "letter";

        const isAnswered = answers[index] !== undefined;
        const backgroundImage = `/img/gift_background_${shape}.svg`;
        const defaultGiftImage = `/img/gift_${letterType}_${shape}.svg`;
        const giftImageUrl =
          isAnswered || isBundleAnswerCompleted ? gift.imageUrls[0] : null;

        return (
          <div
            key={index}
            className="relative flex h-[130px] w-[130px] cursor-pointer items-center justify-center hover:opacity-[75%]"
            onClick={() => {
              onClick();
              setSelectedGiftIndex(index);
            }}
          >
            <Image
              src={
                isAnswered || isBundleAnswerCompleted
                  ? backgroundImage
                  : defaultGiftImage
              }
              alt="backgroundGift"
              width={isAnswered || isBundleAnswerCompleted ? 110 : 130}
              height={isAnswered || isBundleAnswerCompleted ? 110 : 130}
              className="object-cover"
            />
            {(isAnswered || isBundleAnswerCompleted) && giftImageUrl && (
              <div
                className={`absolute left-1/2 top-1/2 flex h-[90px] w-[90px] -translate-x-1/2 -translate-y-1/2 transform items-center justify-center overflow-hidden ${shape === "square" ? "rounded-2xl" : "rounded-full"}`}
              >
                <Image
                  src={giftImageUrl}
                  alt="previewGift"
                  width={90}
                  height={90}
                  className={`object-cover ${shape === "square" ? "rounded-lg" : "rounded-full"}`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReceiveGiftList;
