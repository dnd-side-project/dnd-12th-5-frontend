import { IconSize } from "@/types/components/types";
import { CharacterInfo, CharacterKey } from "@/types/constants/types";

export const BUNDLE_NAME_MAX_LENGTH = 15;
export const GIFT_NAME_MAX_LENGTH = 20;
export const GIFT_IMAGE_MAX_AMOUNT = 5;

export const GIFT_SELECT_REASON_MAX_LENGTH = 100;

export const REASON_CHIP_TEXTES = [
  "직접 입력",
  "취향 저격",
  "실용적",
  "특별한 의미",
  "트렌드",
];

export const REASON_CHIP_MESSAGES = [
  "",
  "당신의 취향을 저격할 수 있는 선물일 것 같아요!",
  "매일 쓰면서 저를 떠올려 주세요!",
  "특별한 순간, 특별한 마음을 담아 준비했어요.",
  "지금 가장 핫한 아이템으로 마음을 전합니다.",
];

export const GIFT_ANSWER_CHIP_TEXTES = [
  "갖고 싶던 선물이에요",
  "정말 최고예요",
  "마음에 들어요",
  "이미 가지고 있어요",
  "잘 모르겠어요",
  "제 취향이 아니에요",
];

export const BUNDLE_COLORS = ["RED", "PINK", "BLUE", "YELLOW", "GREEN"];

export const DESIGN_TYPE_MAP: Record<string, string> = {
  GREEN: "/img/bundle_green.svg",
  RED: "/img/bundle_red.svg",
  BLUE: "/img/bundle_blue.svg",
  PINK: "/img/bundle_pink.svg",
  YELLOW: "/img/bundle_yellow.svg",
};

export const BUNDLE_IMAGE_PATHS = [
  "/img/bundle_red.svg",
  "/img/bundle_pink.svg",
  "/img/bundle_blue.svg",
  "/img/bundle_yellow.svg",
  "/img/bundle_green.svg",
];

export const RESPONSE_TAGS = [
  "GREAT",
  "GOOD",
  "LIKE",
  "ALREADY_HAVE",
  "NOT_SURE",
  "NOT_MY_STYLE",
];

export const GIFTBOX_DEFAULT_IMAGES = [
  "/img/gift_blank_square.svg",
  "/img/gift_blank_round.svg",
];

export const GIFTBOX_FILLED_IMAGES = {
  noLetter: ["/img/gift_no_letter_square.svg", "/img/gift_no_letter_round.svg"],
  withLetter: ["/img/gift_letter_square.svg", "/img/gift_letter_round.svg"],
};

export const GIFTBOX_SHAPE_SEQUENCE = [
  "square",
  "round",
  "round",
  "square",
  "square",
  "round",
];

export const GIFT_ANSWER_MAP: Record<string, string> = {
  GREAT: "갖고 싶던 선물이에요",
  GOOD: "정말 최고예요",
  LIKE: "마음에 들어요",
  ALREADY_HAVE: "이미 가지고 있어요",
  NOT_SURE: "잘 모르겠어요",
  NOT_MY_STYLE: "제 취향이 아니에요",
};

export const CHARACTERS: Record<CharacterKey, CharacterInfo> = {
  CHARACTER_1: { ko: "포리", en: "pori" },
  CHARACTER_2: { ko: "치치", en: "chichi" },
  CHARACTER_3: { ko: "맥스", en: "max" },
  CHARACTER_4: { ko: "하티", en: "hearty" },
};

export const DELIVERY_CHARACTER_MAP: Record<
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

export const ICON_SIZE_MAP: Record<IconSize, number> = {
  xsmall: 12,
  small: 14,
  medium: 18,
  large: 24,
};

export const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "heic", "heif"];

export const MIN_GIFTBOX_AMOUNT = 1;
export const IMAGE_MAX_SIZE_MB = 10;
