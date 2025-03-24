import { DeliveryCardProps } from "@/types/components/types";
import Image from "next/image";

const DeliveryCard = ({
  onClick,
  imageSrc,
  characterTitle,
}: DeliveryCardProps) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-[12px] px-[14px] pb-[10px] pt-[28px] box-border bg-gray-50 rounded-[17px] cursor-pointer border-[1.4px] border-gray-100 hover:opacity-70 w-[162px] h-[212px]"
    >
      <Image src={imageSrc} alt="delivery" width={120} height={120} />
      <div className="text-center text-gray-800">
        <p className="font-bold font-nanum">{characterTitle}</p>
      </div>
    </div>
  );
};

export default DeliveryCard;
