/**아이콘  컴포넌트 */
import { ICON_SIZE_MAP } from "@/constants/constants";
import { IconProps } from "@/types/components/types";
import Image from "next/image";

export const Icon = ({
  src,
  alt = "",
  size,
  className,
  loading = undefined,
}: IconProps) => {
  const pixelSize = size ? ICON_SIZE_MAP[size] : undefined;

  return (
    <Image
      src={src}
      alt={alt}
      width={pixelSize}
      height={pixelSize}
      className={className}
      loading={loading}
    />
  );
};
