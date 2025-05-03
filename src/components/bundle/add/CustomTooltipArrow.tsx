const CustomTooltipArrow = () => {
  return (
    <svg
      className="absolute -top-[10px] left-1/2 -translate-x-1/2"
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7 L7 1 L13 7"
        fill="white"
        stroke="#1f2937"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.6}
      />
    </svg>
  );
};

export default CustomTooltipArrow;
