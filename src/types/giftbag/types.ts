export interface GiftBox {
  name: string;
  reason: string;
  purchase_url?: string;
  tag?: string;
  tagIndex: number;
  filled: boolean;
  imgUrls: string[];
}

{
  /* 퍼블리싱을 위한 임시 타입 지정 (추후 api 연결 시 수정 요함) */
}
export interface ReceiveGiftBag {
  status: string;
  delivery_character_type: string;
  design_type: string;
  gifts: ReceiveGiftBox[];
  total_gifts: number;
}

export interface ReceiveGiftBox {
  name: string;
  id: number;
  message: null | string;
  imageUrls: string[];
  thumbnail: string;
}

/** 내가 만든 보따리 관련 임시 타입 */

export interface MyGiftBag {
  id: number;
  name: string;
  designType: string;
  isRead: boolean;
  status: "PUBLISHED" | "COMPLETED" | "DRAFT";
  updatedAt: Date;
}

// 보따리 메인 목록
export type MyGiftBagPreview = Pick<
  MyGiftBag,
  "id" | "name" | "designType" | "updatedAt"
>;

// 보따리 상세
export type MyGiftBagDetail = Pick<MyGiftBag, "id" | "name" | "designType"> & {
  status: string;
  link: string | null;
  gifts: FilledGiftListPreview[];
};

export interface FilledGift {
  id: number;
  name: string;
  message: string;
  thumbnail: string;
  purchaseUrl: string;
  responseTag: "GREAT" | "GOOD" | "ALREADY_HAVE" | "NOT_SURE" | "NOT_MY_STYLE";
  imageUrls: string[];
}

// 선물 리스트 프리뷰
export type FilledGiftListPreview = Pick<FilledGift, "id" | "thumbnail">;

// 개별 선물 상세
export type FilledGiftDetail = Omit<FilledGift, "thumbnail" | "responseTag">;

// 개별 선물 응답
export type GiftResponse = Omit<FilledGift, "message" | "imageUrls">;

// 보따리 응답 결과 조회
export interface GiftBagResponse {
  id: number;
  gifts: GiftResponse[];
}
