export const GIFTBAG_NAME_MAX_LENGTH = 20;
export const GIFT_NAME_MAX_LENGTH = 20;

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
  "갖고 싶던 선물이에요!",
  "마음에 들어요!",
  "이미 가지고 있어요",
  "잘 모르겠어요",
  "제 취향이 아니에요",
];

export const GIFTBAG_COLORS = ["RED", "PINK", "BLUE", "YELLOW", "GREEN"];

export const DESIGN_TYPE_MAP: Record<string, string> = {
  GREEN: "/img/giftBag_green.svg",
  RED: "/img/giftBag_red.svg",
  BLUE: "/img/giftBag_blue.svg",
  PINK: "/img/giftBag_pink.svg",
  YELLOW: "/img/giftBag_yellow.svg",
};

export const RESPONSE_TAGS = [
  "GREAT",
  "GOOD",
  "ALREADY_HAVE",
  "NOT_SURE",
  "NOT_MY_STYLE",
];

export const GIFT_ANSWER_MAP: Record<string, string> = {
  GREAT: "갖고 싶던 선물이에요!",
  GOOD: "마음에 들어요!",
  ALREADY_HAVE: "이미 가지고 있어요",
  NOT_SURE: "잘 모르겠어요",
  NOT_MY_STYLE: "제 취향이 아니에요",
};
