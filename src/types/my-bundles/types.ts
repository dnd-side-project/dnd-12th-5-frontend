/** 내가 만든 보따리 */
export interface MyBundle {
  id: number;
  name: string;
  designType: string;
  isRead: boolean;
  status: "PUBLISHED" | "COMPLETED" | "DRAFT";
  updatedAt: string;
}

/** 내가 만든 보따리 프리뷰 (홈) */
export type MyBundlePreview = Pick<
  MyBundle,
  "id" | "name" | "designType" | "isRead" | "updatedAt"
>;

/** 내가 만든 보따리 상세 */
export type MyBundleDetail = Pick<
  MyBundle,
  "id" | "name" | "designType" | "status"
> & {
  link: string | null;
  gifts: FilledGiftPreview[];
};

/** 채워진 선물 */
export interface FilledGift {
  id: number;
  name: string;
  message: string;
  thumbnail: string;
  purchaseUrl: string;
  imageUrls: string[];
}

/** 채워진 선물 프리뷰 */
export type FilledGiftPreview = Pick<FilledGift, "id" | "thumbnail">;

export type FilledGiftWithResponse = FilledGift & {
  responseTag: "GREAT" | "GOOD" | "ALREADY_HAVE" | "NOT_SURE" | "NOT_MY_STYLE";
};

/** 답변된 선물 */
export type AnsweredGift = Pick<
  FilledGift,
  "id" | "name" | "thumbnail" | "purchaseUrl"
> & {
  responseTag: "GREAT" | "GOOD" | "ALREADY_HAVE" | "NOT_SURE" | "NOT_MY_STYLE";
};

/** 보따리 이름 수정 요청에 필요한 파라미터 타입 */
export interface EditBundleNameParams {
  name: string;
  bundleId: string;
}
