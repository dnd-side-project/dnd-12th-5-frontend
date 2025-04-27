import { GiftBox } from "../types";

export interface GiftListDrawerProps {
  open: boolean;
  onClose: () => void;
}

export interface DeleteBundleDrawerProps {
  box: GiftBox | null;
  handleDeleteButton: () => void;
  setClickedDeleteBoxButton: (arg: boolean) => void;
}
