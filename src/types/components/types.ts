import { HTMLAttributes, ReactNode } from "react";
import { ImageItem } from "../gift-upload/types";
import {
  FilledGiftListPreview,
  GiftBox,
  MyGiftBagPreview,
  ReceiveGiftBox,
} from "../giftbag/types";

/** common */
export interface CardProps {
  img: string;
  size: "small" | "medium";
  type?: "design" | "image";
  isRead?: boolean;
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

export type IconSize = "xsmall" | "small" | "medium" | "large";

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
  disable: boolean;
}

export interface GiftBoxDrawerProps {
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
  maxImages?: number;
}

/** giftbag */
export interface GiftBagChipProps {
  text: string;
  width: string;
}

export interface DetailGiftBoxProps {
  giftList: ReceiveGiftBox[];
  mappedAnswers: Record<number, number>;
}

export interface GiftBagListProps {
  numberOfCards: number;
  size: "small" | "medium";
  imgPaths: string[];
}

export interface ReciveGiftListProps {
  giftList: ReceiveGiftBox[];
  onClick: () => void;
}

/** myGiftBag */
export interface MyCardListProps {
  type?: "design" | "image";
  data: MyGiftBagPreview[] | FilledGiftListPreview[];
  size: "small" | "medium";
}

export interface MyGiftBagCardProps {
  isEdit: boolean;
  design_type: string;
  is_read: boolean;
  status: string;
  name: string;
  updatedAt: Date;
  onDelete?: () => void;
}
