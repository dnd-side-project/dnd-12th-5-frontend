import SelectedGiftBag from "@/components/giftbag/SelectedGiftBag";
import GiftBagForm from "@/components/giftbag/GiftBagForm";

const page = () => {
  return (
    <div className="flex flex-col items-center gap-[45px] p-4">
      <div className="flex flex-col items-center gap-5">
        <SelectedGiftBag />
        <p className="text-base font-nanum font-bold">
          선물 보따리의 이름을 적어주세요
        </p>
      </div>
      <GiftBagForm />
    </div>
  );
};

export default page;
