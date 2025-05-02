import BundleForm from "@/components/bundle/BundleForm";
import SelectedBundle from "@/components/bundle/SelectedBundle";

const Step2 = () => {
  return (
    <div className="flex h-[calc(100%-68px)] flex-col items-center justify-center gap-[39px] px-4">
      <div className="flex flex-col items-center gap-[42px]">
        <SelectedBundle />
        <p className="font-nanum text-base font-bold">
          선물 보따리의 이름을 적어주세요
        </p>
      </div>
      <BundleForm />
    </div>
  );
};

export default Step2;
