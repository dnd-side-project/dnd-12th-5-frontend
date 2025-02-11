interface LoadingProps {
  width?: number | string;
  height?: number | string;
}

const Loading = ({ width, height }: LoadingProps) => {
  const widthClass = typeof width === "number" ? `w-${width}` : `w-[${width}]`;
  const heightClass =
    typeof height === "number" ? `h-${height}` : `h-[${height}]`;

  return (
    <div
      className={`${widthClass} ${heightClass} flex items-center justify-center`}
    >
      <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
