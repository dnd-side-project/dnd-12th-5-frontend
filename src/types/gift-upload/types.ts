export interface ImageItem {
  type: "existing" | "new";
  url: string;
  file?: File;
}
