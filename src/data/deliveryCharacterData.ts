export const CHARACTER_MAP: Record<string, string> = {
  CHARACTER_1: "포리",
  CHARACTER_2: "치치",
  CHARACTER_3: "맥스",
  CHARACTER_4: "하티",
};

export const CHARACTER_EN_MAP: Record<string, string> = {
  포리: "pori",
  치치: "chichi",
  맥스: "max",
  하티: "hearty",
};

export const deliveryCharacterData: Record<
  string,
  {
    jobTitle: string;
    description: string;
    imageSrc: string;
    bubbleText: string;
  }
> = {
  포리: {
    jobTitle: "긍정 배달부",
    description:
      "밝고 긍정적인 에너지를 가득 담아 선물을 전해요.\n포리의 재빠른 발걸음으로 기쁨이 두 배!",
    imageSrc: "/img/delivery_1.svg",
    bubbleText: "와우! 선물 배달 출발~ 신나게 달려볼게요!",
  },
  하티: {
    jobTitle: "사랑꾼 배달부",
    description: "사랑이 가득 담긴 선물,\n하티가 확실하게 전해드릴게요!",
    imageSrc: "/img/delivery_4.svg",
    bubbleText: "사랑이 필요할 땐, 하티가 도와줄게요!",
  },
  맥스: {
    jobTitle: "츤데레 배달부",
    description:
      "무뚝뚝하지만 속은 따뜻한 맥스,\n배달 하나는 누구보다 완벽하답니다!",
    imageSrc: "/img/delivery_3.svg",
    bubbleText: "어... 오다가 주웠어. 그냥 한 번 봐봐.",
  },
  치치: {
    jobTitle: "수줍은 배달부",
    description:
      "선물 고르시느라 정말 고생 많으셨어요!\n치치가 작은 마음까지 소중하게 전달할게요.",
    imageSrc: "/img/delivery_2.svg",
    bubbleText: "소중하게 골라주신 선물, 안전하게 배달할게요!",
  },
};

export const ANSWER_MESSAGE_MAP: Record<
  string,
  { title: string; description: string }
> = {
  포리: {
    title: "와우~ 답변 저장 완료!",
    description:
      "우리 둘만 아는 비밀이 생긴 것 같아서\n너무 설레는데요? 오늘 기분 최고!",
  },
  치치: {
    title: "답변을 남겨주셔서 감사해요!",
    description: "우리 둘만의 비밀 꼭 소중하게\n간직할게요! 다음에 또 봐요!",
  },
  맥스: {
    title: "답변 남겨주느라 고생 많았어!",
    description:
      "우리 둘만의 비밀로 간직할게.\n우리만 아는 비밀이라니 꽤 특별할지도?",
  },
  하티: {
    title: "소중한 답변, 남겨줘서 고마워요!",
    description:
      "우리 둘만의 비밀로 간직할게요!\n마음이 몽글몽글~ 왠지 설레네요!",
  },
};

export const DELIVERY_RECEIVE_TEXT_MAP: Record<string, string> = {
  포리: "똑똑 서프라이즈~\n보따리가 도착했어요!",
  치치: "정성이 가득 담긴\n선물 보따리를 가져왔어요..",
  맥스: "어.. 오다 주웠다!\n궁금하면 한번 열어보던가!",
  하티: "두근두근!\n사랑이 담긴 보따리를 같이 열어볼까요?",
};
