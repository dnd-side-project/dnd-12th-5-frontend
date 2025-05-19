import { useState } from "react";

import { Icon } from "../common/Icon";
import { Button } from "../ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "../ui/drawer";

import CloseIcon from "/public/icons/close_black.svg";
import Good from "/public/icons/face-good.svg";
import OK from "/public/icons/face-ok.svg";
import Bad from "/public/icons/face-bad.svg";

import { toast } from "@/hooks/use-toast";
import { useSurveyAnswerMutation } from "@/queries/useSurveyAnswerMutation";

const feedbackOptions = [
  { id: "GOOD", label: "좋아요", icon: Good },
  { id: "SOSO", label: "보통이에요", icon: OK },
  { id: "BAD", label: "별로예요", icon: Bad },
];

const SurveyDrawer = ({ onClose }: { onClose: () => void }) => {
  const [selected, setSelected] = useState("");
  const { mutate } = useSurveyAnswerMutation();

  const handleSurveySubmit = () => {
    if (!selected) {
      toast({ title: "옵션을 선택해주세요." });
      return;
    }

    mutate(
      { surveySatisfaction: selected },
      {
        onSuccess: () => {
          toast({
            title: "소중한 의견 보내주셔서 감사해요!",
          });
          onClose();
        },
      },
    );
  };

  return (
    <DrawerContent>
      <DrawerHeader className="h-[48px]">
        <DrawerClose className="absolute right-4">
          <Icon src={CloseIcon} alt="CloseIcon" size="large" />
        </DrawerClose>
      </DrawerHeader>
      <p className="text-center text-base font-medium">
        픽토리 서비스 사용 경험은 어떠셨나요?
      </p>
      <ul className="my-[22px] flex justify-center gap-4">
        {feedbackOptions.map(({ id, label, icon }) => (
          <li
            key={id}
            onClick={() => setSelected(id)}
            className={`flex w-[84px] cursor-pointer flex-col items-center rounded-[12px] transition-colors ${selected === id ? "bg-gray-100" : "bg-gray-50"}`}
          >
            <Icon src={icon} alt={id} />
            <p className="whitespace-nowrap">{label}</p>
          </li>
        ))}
      </ul>
      <DrawerFooter>
        <Button size="lg" onClick={handleSurveySubmit}>
          답변 제출하기
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default SurveyDrawer;
