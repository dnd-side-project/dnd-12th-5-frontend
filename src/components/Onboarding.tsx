import { Button } from "./ui/button";

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  return (
    <>
      <div className="w-full h-[calc(100%-68px)] flex flex-col justify-center items-center gap-4">
        <p className="text-center">
          상대방이 어떤 선물을 좋아할지 몰라서 <br /> 고민하고 계신가요?
        </p>
        <section className="h-[294px] w-[262px] bg-gray-100">그래픽</section>
        <p className="text-center">
          고민중인 선물을 선물 보따리에 담아주세요 <br />
          저희가 후다닥 물어보고 올게요!
        </p>
      </div>
      <div className="w-full bottom-4 absolute px-4">
        <Button size="lg" onClick={onComplete}>
          선물 보따리 준비하러 가기
        </Button>
      </div>
    </>
  );
};

export default Onboarding;
