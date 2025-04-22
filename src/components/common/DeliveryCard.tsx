import Image from "next/image";

import { DeliveryCardProps } from "@/types/components/types";

const DeliveryCard = ({
  onClick,
  imageSrc,
  characterTitle,
}: DeliveryCardProps) => {
  return (
    <div
      onClick={onClick}
      className="box-border flex h-[212px] w-[162px] cursor-pointer flex-col items-center justify-center gap-[12px] rounded-[17px] border-[1.4px] border-gray-100 bg-gray-50 px-[14px] pb-[10px] pt-[28px] hover:opacity-70"
    >
      <Image src={imageSrc} alt="delivery" width={120} height={120} />
      <div className="text-center text-gray-800">
        <p className="font-nanum font-bold">{characterTitle}</p>
      </div>
    </div>
  );
};

export default DeliveryCard;
