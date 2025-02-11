import Image from "next/image";
import Delivery from "../../../../public/img/delivery_1.svg";

const Step3 = () => {
  return (
    <div>
      <div className="mt-[131px] mb-[133px] flex flex-col justify-center items-center gap-8 ">
        <p className="text-lg font-bold font-nanum">
          정성껏 답변을 남겨주셔서 감사해요!
        </p>
        <div className="w-[200px] h-[200px] flex justify-center items-center">
          <Image src={Delivery} alt="deliveryMan" />
        </div>
        <p className="text-center text-sm font-nanum text-gray-700 pt-[2px]">
          저는 답변을 전달하러 가볼게요! <br /> 바쁘다 바빠~
        </p>
      </div>
    </div>
  );
};

export default Step3;
