export const CHARACTER_MAP: Record<string, string> = {
  CHARACTER_1: "포리",
  CHARACTER_2: "치치",
  CHARACTER_3: "맥스",
  CHARACTER_4: "하티",
};

export const API_CHARACTER_MAP: Record<string, string> = {
  포리: "CHARACTER_1",
  치치: "CHARACTER_2",
  맥스: "CHARACTER_3",
  하티: "CHARACTER_4",
};

export const CHARACTER_EN_MAP: Record<string, string> = {
  포리: "pori",
  치치: "chichi",
  맥스: "max",
  하티: "hearty",
};

export const deliveryCharacterData: Record<
  string,
  { title: string; description: string; imageSrc: string }
> = {
  포리: {
    title: "똑똑 서프라이즈~! \n 보따리가 도착했어요!",
    description:
      "밝고 긍정적인 에너지를 가득 담아 선물을 전해요.\n포리의 재빠른 발걸음으로 기쁨이 두 배!",
    imageSrc: "/img/delivery_1.svg",
  },
  하티: {
    title: "두근두근!\n사랑이 담긴 보따리를 열어볼까요?",
    description:
      "사랑이 넘치는 배달, 하티가 책임질게요!\n보따리에 설렘을 한 스푼 더해 전달해요.",
    imageSrc: "/img/delivery_4.svg",
  },
  맥스: {
    title: "어.. 오다 주웠다!\n궁금하면 한번 열어보던가!",
    description:
      "츤츤거리는 매력이 특징인 맥스!\n무심하지만 때로는 다정하게 선물을 전달해요.",
    imageSrc: "/img/delivery_3.svg",
  },
  치치: {
    title: "정성이 가득 담긴\n선물 보따리를 가져왔어요..",
    description:
      "선물을 준비하던 정성 가득한 순간,\n누구보다 세심한 치치가 소중하게 전달할거에요!",
    imageSrc: "/img/delivery_2.svg",
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
