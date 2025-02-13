import React from "react";
import Image from "next/image";

import RemoveBtn from "/public/icons/btn_erase.svg";

import MyGiftBagStatusChip from "./MyGiftBagStatusChip";

interface MyGiftBagCardProps {
  isEdit: boolean;
  design_type: string;
  is_read: boolean;
  status: string;
  name: string;
  created_at: string;
}

const MyGiftBagCard = ({
  isEdit,
  design_type,
  is_read,
  status,
  name,
  created_at,
}: MyGiftBagCardProps) => {
  const handleDelete = () => {
    // 14. 보따리 삭제 API 호출
  };

  return (
    <div className="border-[1px] box-border border-gray-200 px-2 pb-[22px] pt-[8px] rounded-[12px] cursor-pointer flex flex-col justify-center items-center relative">
      <div className="w-full flex flex-start">
        <MyGiftBagStatusChip status={status} isRead={is_read} />
      </div>
      {isEdit && (
        <button
          onClick={handleDelete}
          className="absolute right-[6px] top-[6px]"
        >
          <Image src={RemoveBtn} alt="RemoveBtn" />
        </button>
      )}
      <Image
        src={design_type}
        alt="GiftBag"
        width={89}
        height={94}
        className="mt-[8px] mb-[14px]"
      />
      <div>
        <p className="text-[15px] font-medium text-center">{name}</p>
        <p className="text-gray-400 text-xs font-medium text-center">
          {created_at}
        </p>
      </div>
    </div>
  );
};

export default React.memo(MyGiftBagCard);
