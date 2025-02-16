// 임시 데이터

import { MyGiftBag, FilledGiftDetail } from "@/types/giftbag/types";

// 내가 만든 보따리 데이터
export const giftBagData: MyGiftBag[] = [
  {
    id: 0,
    name: "보따리 1",
    designType: "/img/giftBag_red.svg",
    isRead: true,
    status: "PUBLISHED",
    updatedAt: new Date("2025-02-07"),
  },
  {
    id: 1,
    name: "보따리 2",
    designType: "/img/giftBag_pink.svg",
    isRead: true,
    status: "COMPLETED",
    updatedAt: new Date("2025-02-03"),
  },
  {
    id: 2,
    name: "보따리 3",
    designType: "/img/giftBag_blue.svg",
    isRead: true,
    status: "DRAFT",
    updatedAt: new Date("2025-01-11"),
  },
  {
    id: 3,
    name: "보따리 4",
    designType: "/img/giftBag_yellow.svg",
    isRead: false,
    status: "COMPLETED",
    updatedAt: new Date("2025-01-05"),
  },
  {
    id: 4,
    name: "보따리 5",
    designType: "/img/giftBag_red.svg",
    isRead: true,
    status: "PUBLISHED",
    updatedAt: new Date("2025-02-07"),
  },
  {
    id: 5,
    name: "보따리 6",
    designType: "/img/giftBag_pink.svg",
    isRead: true,
    status: "COMPLETED",
    updatedAt: new Date("2025-02-03"),
  },
  {
    id: 6,
    name: "보따리 7",
    designType: "/img/giftBag_blue.svg",
    isRead: true,
    status: "DRAFT",
    updatedAt: new Date("2025-01-11"),
  },
  {
    id: 7,
    name: "보따리 8",
    designType: "/img/giftBag_yellow.svg",
    isRead: false,
    status: "COMPLETED",
    updatedAt: new Date("2025-01-05"),
  },
];

// 선물 데이터
export const filledGiftList: FilledGiftDetail[] = [
  {
    id: 0,
    name: "휴대폰 케이스",
    message: "",
    purchaseUrl: "https://www.naver.com/",
    imageUrls: ["/img/gift_1.jpg"],
  },
  {
    id: 1,
    name: "텀블러",
    message:
      "글자수가최대일때테스트글자수가최대일때테스트글자수가최대일때테스트",
    purchaseUrl: "",
    imageUrls: ["/img/gift_2.jpg"],
  },
  {
    id: 2,
    name: "신발",
    message: "달콤한 하루 보내!",
    purchaseUrl: "",
    imageUrls: ["/img/gift_3_1.jpg", "/img/gift_3_2.jpg", "/img/gift_3_3.jpg"],
  },
  {
    id: 3,
    name: "맨투맨",
    message: "당신의 취향을 저격할 수 있는 선물일 것 같아요!",
    purchaseUrl: "https://www.naver.com/",
    imageUrls: ["/img/gift_4.jpg"],
  },
  {
    id: 4,
    name: "신발",
    message: "지금 가장 핫한 아이템으로 마음을 전합니다.",
    purchaseUrl: "",
    imageUrls: ["/img/gift_3_1.jpg", "/img/gift_3_2.jpg", "/img/gift_3_3.jpg"],
  },
];
