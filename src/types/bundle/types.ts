import { CharacterKey } from "../constants/types";
import { FilledGiftWithResponse } from "../my-bundles/types";
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
  deliveryCharacterType: string;
  designType: string;
  gifts: ReceiveGiftBox[];
  totalGifts: number;
}

export interface ReceiveGiftBox {
  name: string;
  id: number;
  message: null | string;
  imageUrls: string[];
  thumbnail: string;
}

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
  giftResultData?: FilledGiftWithResponse[];
  isCompleted?: boolean;
}

export interface GoToHomeDrawerProps {
  open: boolean;
  onClose: () => void;
  bundleId: string;
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
