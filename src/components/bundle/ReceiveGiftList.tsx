import { GIFTBOX_SHAPE_SEQUENCE } from "@/constants/constants";
import {
  useGiftAnswerStore,
  useIsUploadAnswerStore,
  useSelectedGiftBoxStore,
} from "@/stores/bundle/useStore";
import { ReciveGiftListProps } from "@/types/components/types";
import Image from "next/image";

const ReceiveGiftList = ({ giftList, onClick }: ReciveGiftListProps) => {
  const answers = useGiftAnswerStore((state) => state.answers);
  const { setSelectedGiftIndex } = useSelectedGiftBoxStore();
  const { isUploadedAnswer } = useIsUploadAnswerStore();

  return (
    <div className="grid grid-cols-2 grid-rows-[repeat(auto-fill, minmax(130px, 1fr))] max-h-[390px] gap-[3px]">
      {giftList.map((gift, index) => {
        const isMessageEmpty = !gift.message;
        const shape =
          GIFTBOX_SHAPE_SEQUENCE[index % GIFTBOX_SHAPE_SEQUENCE.length];
        const letterType = isMessageEmpty ? "no_letter" : "letter";

        const isAnswered = answers[index] !== undefined;
        const backgroundImage = `/img/gift_background_${shape}.svg`;
        const defaultGiftImage = `/img/gift_${letterType}_${shape}.svg`;
        const giftImageUrl =
          isAnswered || isUploadedAnswer ? gift.imageUrls[0] : null;

        return (
          <div
            key={index}
            className="relative flex justify-center items-center hover:opacity-[75%] cursor-pointer w-[130px] h-[130px]"
            onClick={() => {
              onClick();
              setSelectedGiftIndex(index);
            }}
          >
            <Image
              src={
                isAnswered || isUploadedAnswer
                  ? backgroundImage
                  : defaultGiftImage
              }
              alt="backgroundGift"
              width={isAnswered || isUploadedAnswer ? 110 : 130}
              height={isAnswered || isUploadedAnswer ? 110 : 130}
              className="object-cover"
            />
            {(isAnswered || isUploadedAnswer) && giftImageUrl && (
              <div
                className={`absolute top-1/2 left-1/2 w-[90px] h-[90px] flex justify-center items-center overflow-hidden 
                transform -translate-x-1/2 -translate-y-1/2
                ${shape === "square" ? "rounded-2xl" : "rounded-full"}`}
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
