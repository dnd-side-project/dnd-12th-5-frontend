import { GiftBox } from "../types";

export interface GiftListDrawerProps {
  open: boolean;
  onClose: () => void;
  giftBoxes: GiftBox[];
}
