import { useRouter } from "next/navigation";

import DeliveryCard from "@/components/common/DeliveryCard";
import { deliveryCharacterData } from "@/data/deliveryCharacterData";

const Step1 = () => {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col items-center justify-center gap-[22px]">
      <div>
        <p className="font-bold text-lg font-nanum text-center">
          선물 보따리를 다 채우셨군요!
        </p>
        <p className="text-gray-500 text-sm font-nanum text-center">
          당신의 마음을 전할 배달부를 골라주세요.
        </p>
      </div>
      <section className="grid grid-cols-2 grid-rows-2 gap-2">
        {Object.keys(deliveryCharacterData).map((key) => (
          <DeliveryCard
            key={key}
            imageSrc={deliveryCharacterData[key].imageSrc}
            characterTitle={key}
            onClick={() =>
              router.push(`/giftbag/delivery?step=2&character=${key}`)
            }
          />
        ))}
      </section>
    </div>
  );
};

export default Step1;
