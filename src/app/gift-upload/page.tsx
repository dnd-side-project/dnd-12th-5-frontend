import CharacterCountInput from "@/components/common/CharacterCountInput";
import InputLink from "@/components/gift-upload/InputLink";
import InputReason from "@/components/gift-upload/InputReason";
import UploadImageList from "@/components/gift-upload/UploadImageList";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="flex flex-col p-4 gap-[50px]">
      <div className="flex flex-col gap-1">
        <div
          className="w-full overflow-x-auto h-[110px] flex items-center"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="min-w-max">
            <UploadImageList />
          </div>
        </div>
        <CharacterCountInput maxLength={20} placeholder="선물명을 적어주세요" />
      </div>
      <InputReason />
      <InputLink />
      <Button size="lg">채우기 완료</Button>
    </div>
  );
};

export default page;
