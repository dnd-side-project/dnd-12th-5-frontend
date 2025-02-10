import { ReciveGiftBox } from "@/types/giftbag/types";
import Image from "next/image";

interface ReciveGiftListProps {
  giftList: ReciveGiftBox[];
}

const ReciveGiftList = ({ giftList }: ReciveGiftListProps) => {
  return (
    <div
      className={`grid grid-cols-2 grid-rows-[repeat(${giftList.length},_1fr)] max-h-[390px]`}
    >
      {giftList.map((gift, index) => {
        const isMessageEmpty = gift.message === "";
        const shape = index % 2 === 0 ? "square" : "round";
        const letterType = isMessageEmpty ? "no_letter" : "letter";

        return (
          <div
            key={index}
            className="flex justify-center items-center w-[130px] h-[130px] hover:opacity-[75%] cursor-pointer"
          >
            <Image
              src={`/img/gift_${letterType}_${shape}.svg`}
              alt={`${gift.name} gift`}
              width={110}
              height={110}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ReciveGiftList;
