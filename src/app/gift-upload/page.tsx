import CharacterCountInput from "@/components/common/CharacterCountInput";
import InputLink from "@/components/gift-upload/InputLink";
import InputReason from "@/components/gift-upload/InputReason";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="flex flex-col p-4 gap-[50px]">
      <div className="flex flex-col gap-6 bg-pink-300">
        <div className="h-[88px] bg-pink-100">임시</div>
        <CharacterCountInput maxLength={20} placeholder="선물명을 적어주세요" />
      </div>
      <InputReason />
      <InputLink />
      <Button size="lg">채우기 완료</Button>
    </div>
  );
};

export default page;
