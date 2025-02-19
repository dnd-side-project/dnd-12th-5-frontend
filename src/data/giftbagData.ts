// 임시 데이터

import {
  MyGiftBag,
  FilledGiftDetail,
  MyGiftBagPreview,
  MyGiftBagDetail,
} from "@/types/giftbag/types";

// 내가 만든 보따리 데이터
export const giftBagData: MyGiftBag[] = [
  {
    id: 0,
    name: "보따리 1",
    designType: "/img/giftBag_green.svg",
    isRead: true,
    status: "PUBLISHED",
    updatedAt: new Date("2025-02-07"),
  },
  {
    id: 1,
    name: "보따리 2",
    designType: "/img/giftBag_yellow.svg",
    isRead: true,
    status: "COMPLETED",
    updatedAt: new Date("2025-02-03"),
  },
  {
    id: 2,
    name: "보따리 3",
    designType: "/img/giftBag_red.svg",
    isRead: true,
    status: "DRAFT",
    updatedAt: new Date("2025-01-11"),
  },
  {
    id: 3,
    name: "보따리 4",
    designType: "/img/giftBag_blue.svg",
    isRead: false,
    status: "COMPLETED",
    updatedAt: new Date("2025-01-05"),
  },
  {
    id: 4,
    name: "보따리 5",
    designType: "/img/giftBag_pink.svg",
    isRead: true,
    status: "PUBLISHED",
    updatedAt: new Date("2025-02-07"),
  },
  {
    id: 5,
    name: "보따리 6",
    designType: "/img/giftBag_red.svg",
    isRead: true,
    status: "COMPLETED",
    updatedAt: new Date("2025-02-03"),
  },
  {
    id: 6,
    name: "보따리 7",
    designType: "/img/giftBag_green.svg",
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

export const giftBagPreviewData: MyGiftBagPreview[] = [
  {
    id: 1,
    name: "생일 선물 보따리",
    designType: "GREEN",
    updatedAt: new Date("2024-02-01T10:00:00Z"),
  },
  {
    id: 2,
    name: "연말 정산 보따리",
    designType: "YELLOW",
    updatedAt: new Date("2024-02-02T12:30:00Z"),
  },
  {
    id: 3,
    name: "친구 선물 모음",
    designType: "RED",
    updatedAt: new Date("2024-02-03T15:45:00Z"),
  },
  {
    id: 4,
    name: "여행 기념 보따리",
    designType: "BLUE",
    updatedAt: new Date("2024-02-04T09:20:00Z"),
  },
  {
    id: 5,
    name: "감사 선물 세트",
    designType: "PINK",
    updatedAt: new Date("2024-02-05T14:10:00Z"),
  },
  {
    id: 6,
    name: "특별한 날 보따리",
    designType: "RED",
    updatedAt: new Date("2024-02-06T18:00:00Z"),
  },
  {
    id: 7,
    name: "가족 선물 보따리",
    designType: "GREEN",
    updatedAt: new Date("2024-02-07T11:05:00Z"),
  },
  {
    id: 8,
    name: "회사 동료 선물",
    designType: "YELLOW",
    updatedAt: new Date("2024-02-08T16:25:00Z"),
  },
];

// 선물 데이터
export const filledGiftList: FilledGiftDetail[] = [
  {
    id: 0,
    name: "휴대폰 케이스",
    message: "",
    purchaseUrl: "",
    imageUrls: ["/img/gift_1.jpg"],
  },
  {
    id: 1,
    name: "텀블러",
    message:
      "너가 물을 많이 마시니까 매일 사용할 수 있어 실용적이고, 디자인도 마음에 들어할 것 같아서 선택했어. 환경을 생각하는 마음도 담겨있어서 너에게 딱 맞는 선물일 것 같아. 너가 좋",
    purchaseUrl: "",
    imageUrls: ["/img/gift_2.jpg"],
  },
  {
    id: 2,
    name: "신발",
    message: "",
    purchaseUrl: "https://www.naver.com/",
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

export const giftBagDetailData: MyGiftBagDetail[] = [
  {
    id: 0,
    name: "보따리 1",
    designType: "/img/giftBag_green.svg",
    status: "PUBLISHED",
    link: "www.naver.com",
    gifts: [
      { id: 0, thumbnail: "/img/gift_1.jpg" },
      { id: 1, thumbnail: "/img/gift_2.jpg" },
      { id: 2, thumbnail: "/img/gift_3_1.jpg" },
      { id: 3, thumbnail: "/img/gift_4.jpg" },
    ],
  },
  {
    id: 1,
    name: "보따리 2",
    designType: "/img/giftBag_yellow.svg",
    status: "COMPLETED",
    link: "www.naver.com",
    gifts: [
      { id: 0, thumbnail: "/img/gift_1.jpg" },
      { id: 1, thumbnail: "/img/gift_2.jpg" },
      { id: 2, thumbnail: "/img/gift_3_1.jpg" },
      { id: 3, thumbnail: "/img/gift_4.jpg" },
    ],
  },
  {
    id: 2,
    name: "보따리 3",
    designType: "/img/giftBag_red.svg",
    status: "DRAFT",
    link: "www.naver.com",
    gifts: [
      { id: 0, thumbnail: "/img/gift_1.jpg" },
      { id: 1, thumbnail: "/img/gift_2.jpg" },
      { id: 2, thumbnail: "/img/gift_3_1.jpg" },
      { id: 3, thumbnail: "/img/gift_4.jpg" },
    ],
  },
  {
    id: 3,
    name: "보따리 4",
    designType: "/img/giftBag_blue.svg",
    status: "COMPLETED",
    link: "www.naver.com",
    gifts: [
      { id: 0, thumbnail: "/img/gift_1.jpg" },
      { id: 1, thumbnail: "/img/gift_2.jpg" },
      { id: 2, thumbnail: "/img/gift_3_1.jpg" },
      { id: 3, thumbnail: "/img/gift_4.jpg" },
    ],
  },
  {
    id: 4,
    name: "보따리 5",
    designType: "/img/giftBag_pink.svg",
    status: "PUBLISHED",
    link: "www.naver.com",
    gifts: [
      { id: 0, thumbnail: "/img/gift_1.jpg" },
      { id: 1, thumbnail: "/img/gift_2.jpg" },
      { id: 2, thumbnail: "/img/gift_3_1.jpg" },
      { id: 3, thumbnail: "/img/gift_4.jpg" },
    ],
  },
  {
    id: 5,
    name: "보따리 6",
    designType: "/img/giftBag_red.svg",
    status: "COMPLETED",
    link: "www.naver.com",
    gifts: [
      { id: 0, thumbnail: "/img/gift_1.jpg" },
      { id: 1, thumbnail: "/img/gift_2.jpg" },
      { id: 2, thumbnail: "/img/gift_3_1.jpg" },
      { id: 3, thumbnail: "/img/gift_4.jpg" },
    ],
  },
  {
    id: 6,
    name: "보따리 7",
    designType: "/img/giftBag_green.svg",
    status: "DRAFT",
    link: "www.naver.com",
    gifts: [
      { id: 0, thumbnail: "/img/gift_1.jpg" },
      { id: 1, thumbnail: "/img/gift_2.jpg" },
      { id: 2, thumbnail: "/img/gift_3_1.jpg" },
      { id: 3, thumbnail: "/img/gift_4.jpg" },
    ],
  },
  {
    id: 7,
    name: "보따리 8",
    designType: "/img/giftBag_yellow.svg",
    status: "COMPLETED",
    link: "www.naver.com",
    gifts: [
      { id: 0, thumbnail: "/img/gift_1.jpg" },
      { id: 1, thumbnail: "/img/gift_2.jpg" },
      { id: 2, thumbnail: "/img/gift_3_1.jpg" },
      { id: 3, thumbnail: "/img/gift_4.jpg" },
    ],
  },
];
