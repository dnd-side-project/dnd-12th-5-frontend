import React from "react";

const MyGiftBagNameChip = ({ name }: { name: string }) => {
  return (
    <span className="rounded-[49px] border-[1.4px] border-gray-600 py-[7px] px-[20px] text-center text-[12px] font-bold font-nanum">
      {name}
    </span>
  );
};

export default React.memo(MyGiftBagNameChip);
