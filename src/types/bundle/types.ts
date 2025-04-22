import { CharacterKey } from "../constants/types";
import { CarouselApi } from "@/components/ui/carousel";

export interface GiftBox {
  name: string;
  reason: string;
  purchase_url?: string;
  tag?: string;
  tagIndex: number;
  filled: boolean;
  imgUrls: string[];
  id?: number | null;
}

export interface ReceiveBundle {
  id: number;
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

/** 내가 만든 보따리 */

export interface MyBundle {
  id: number;
  name: string;
  designType: string;
  isRead: boolean;
  status: "PUBLISHED" | "COMPLETED" | "DRAFT";
  updatedAt: Date;
}

// 보따리 메인 목록
export type MyBundlePreview = Pick<
  MyBundle,
  "id" | "name" | "designType" | "updatedAt"
>;

// 보따리 상세
export type MyBundleDetail = Pick<MyBundle, "id" | "name" | "designType"> & {
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

// 보따리 결과 선물 박스 타입
export interface ResultGiftBox {
  id: number;
  name: string;
  link: string;
  purchaseUrl: string;
  thumbnail: string;
  responseTag: string;
}

/** 보따리 풀어보기 */

/** [id] props */
export interface Step1Props {
  delivery: string;
  color: string;
  isCompleted: boolean;
}

export interface Step2Props {
  gifts: ReceiveGiftBox[];
  giftResultData?: ResultGiftBox[];
  isCompleted?: boolean;
}

export interface GoToHomeDrawerProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface GiftData {
  id: number;
  name: string;
  link: string;
  thumbnail: string;
  purchaseUrl: string;
  responseTag: string;
}

/** 배달부 설정 */
export interface PutCharacterPayload {
  bundleId: number;
  deliveryCharacterType: CharacterKey;
}

export interface PutCharacterResponse {
  link: string;
}

export interface ReceiveAnswerChipListProps {
  mappedAnswers: Record<number, number>;
  giftIndex: number;
  carouselApi: CarouselApi;
  giftListLength: number;
}
