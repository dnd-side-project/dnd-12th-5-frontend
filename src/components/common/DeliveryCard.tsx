import Image from "next/image";

interface DeliveryCardProps {
  onClick?: () => void;
  imageSrc: string;
  characterTitle: string;
  characterDescription: string;
}

const DeliveryCard = ({
  onClick,
  imageSrc,
  characterTitle,
  characterDescription,
}: DeliveryCardProps) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center gap-[3px] pt-[14px] px-[11px] pb-[10px] box-border bg-gray-50 rounded-[17px] cursor-pointer border-[1.4px] border-gray-100 "
    >
      <Image src={imageSrc} alt="delivery" width={140} height={140} />
      <div className="text-center text-gray-800">
        <p className="text-[14px] font-nanum">{characterDescription}</p>
        <p className="font-bold font-nanum">{characterTitle}</p>
      </div>
    </div>
  );
};

export default DeliveryCard;
