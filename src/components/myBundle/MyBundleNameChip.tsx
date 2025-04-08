import React from "react";

const MyBundleNameChip = ({ name }: { name: string }) => {
  return (
    <span className="rounded-[49px] border-[1.4px] border-gray-600 px-[20px] py-[7px] text-center font-nanum text-[12px] font-bold tracking-[-0.01em]">
      {name}
    </span>
  );
};

export default React.memo(MyBundleNameChip);
