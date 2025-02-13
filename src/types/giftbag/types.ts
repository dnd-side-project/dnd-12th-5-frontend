export interface GiftBox {
  name: string;
  reason: string;
  purchase_url?: string;
  tag?: string;
  tagIndex: number;
  filled: boolean;
}

{
  /* 퍼블리싱을 위한 임시 타입 지정 (추후 api 연결 시 수정 요함) */
}
export interface ReciveGiftBox {
  name: string;
  message: string;
  imageUrls: string[];
}
