import { ReciveGiftBox } from "@/types/giftbag/types";
import Image from "next/image";

interface ReciveGiftListProps {
  giftList: ReciveGiftBox[];
  onClick: () => void;
}

const ReciveGiftList = ({ giftList, onClick }: ReciveGiftListProps) => {
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
            className="flex justify-center items-center hover:opacity-[75%] cursor-pointer"
            onClick={onClick}
          >
            <Image
              src={`/img/gift_${letterType}_${shape}.svg`}
              alt={`${gift.name} gift`}
              width={130}
              height={130}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ReciveGiftList;
