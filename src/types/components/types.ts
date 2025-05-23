import { HTMLAttributes, ReactNode } from "react";

import { GiftBox, ReceiveGiftBox } from "../bundle/types";
import { ImageItem } from "../gift-upload/types";
import { FilledGiftPreview, MyBundlePreview } from "../my-bundles/types";

/** common */
export interface CardProps {
  img: string;
  size: "small" | "medium";
  type: "gift" | "bundle";
  isRead?: boolean; // bundle에만 해당
  isActive?: boolean;
  onClick?: () => void;
  noHoverStyle?: boolean;
  noActiveStyle?: boolean;
  noCursorPointerStyle?: boolean;
}

export interface CharacterCountInputProps {
  placeholder: string;
  maxLength: number;
  value?: string;
  onChange?: (value: string) => void;
}

export interface ChipProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export interface DeliveryCardProps {
  onClick?: () => void;
  imageSrc: string;
  characterTitle: string;
}

export type IconSize = "xsmall" | "small" | "medium" | "large" | "extraLarge";

export interface IconProps {
  src: string;
  alt?: string;
  size?: IconSize;
  className?: string;
  loading?: "eager" | "lazy" | undefined;
}

/** gift-upload */
export interface ChipListProps {
  chipText: string[];
  selectedChipIndex: number;
  onChipClick: (index: number) => void;
}

export interface CustomTextAreaProps {
  placeholder: string;
  maxLength: number;
  text: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface BundleDrawerProps {
  setClickedDeleteBoxButton: (arg: boolean) => void;
  box: GiftBox | null;
  index: number | null;
}

export interface ImageCardProps {
  src: string;
  isPrimary?: boolean;
  onDelete: () => void;
  dragHandleProps?: React.HTMLAttributes<HTMLElement>;
}

type DragHandleProps = {
  dragHandleProps: HTMLAttributes<HTMLElement>;
};

export interface SortableImageWrapperProps {
  id: string;
  children: ReactNode | ((props: DragHandleProps) => ReactNode);
}

export interface InputLinkProps {
  value?: string;
  onChange?: (value: string) => void;
}

export interface InputReasonProps {
  value: string;
  onReasonChange: (text: string) => void;
  onTagChange: (tag: string) => void;
  giftBoxIndex: number;
}

export interface UploadImageListProps {
  combinedImages: ImageItem[];
  setCombinedImages: (items: ImageItem[]) => void;
}

/** bundle */
export interface BundleChipProps {
  text: string;
  width: string;
  icon?: ReactNode;
  isClickable?: boolean;
  onClick?: () => void;
}

export interface DetailGiftBoxProps {
  giftList: ReceiveGiftBox[];
  mappedAnswers: Record<number, number>;
}

export interface ReciveGiftListProps {
  giftList: ReceiveGiftBox[];
  onClick: () => void;
}

/** 선물 및 보따리 카드 목록 */
export interface MyCardListProps {
  size: "small" | "medium";
  type: "gift" | "bundle";
  data: MyBundlePreview[] | FilledGiftPreview[] | string[];
  isSelectable?: boolean;
}

export interface MyBundleCardProps {
  isEdit: boolean;
  designType: string;
  isRead: boolean;
  status: string;
  name: string;
  updatedAt: string;
  onDelete?: () => void;
}

/** 이미지 캐러셀 */
export interface ImageCarouselViewerProps {
  images: string[];
  onClose: () => void;
}

/** 캐러셀 네비게이터  */
export interface CarouselNavigatorProps<T> {
  items: T[];
  currentIndex: number;
  activeColorClass?: string;
}
