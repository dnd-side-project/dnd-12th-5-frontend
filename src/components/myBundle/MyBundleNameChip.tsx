import React from "react";

const MyBundleNameChip = ({ name }: { name: string }) => {
  return (
    <span className="rounded-[49px] border-[1.4px] border-gray-600 py-[7px] px-[20px] text-center text-[12px] font-bold font-nanum tracking-[-0.01em]">
      {name}
    </span>
  );
};

export default React.memo(MyBundleNameChip);
