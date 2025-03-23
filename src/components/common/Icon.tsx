/**아이콘  컴포넌트 */
import Image from "next/image";

//추후 type 정리 시 정리 필요
type IconSize = "xsmall" | "small" | "medium" | "large";

interface IconProps {
  src: string;
  alt?: string;
  size?: IconSize;
  className?: string;
  loading?: "eager" | "lazy" | undefined;
}

const sizeMap: Record<IconSize, number> = {
  xsmall: 12,
  small: 14,
  medium: 18,
  large: 24,
};

export const Icon = ({
  src,
  alt = "",
  size,
  className,
  loading = undefined,
}: IconProps) => {
  const pixelSize = size ? sizeMap[size] : undefined;

  return (
    <Image
      src={`/icons/${src}`}
      alt={alt}
      width={pixelSize}
      height={pixelSize}
      className={className}
      loading={loading}
    />
  );
};
