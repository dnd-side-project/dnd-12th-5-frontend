import React, { useMemo } from "react";
import Image from "next/image";

import DeleteIcon from "/public/icons/btn_erase.svg";

import MyBundleStatusChip from "./MyBundleStatusChip";
import { DrawerTrigger } from "../ui/drawer";
import { DESIGN_TYPE_MAP } from "@/constants/constants";
import { Icon } from "../common/Icon";
import { MyBundleCardProps } from "@/types/components/types";

const MyBundleCard = ({
  isEdit,
  design_type,
  is_read,
  status,
  name,
  updatedAt,
  onDelete,
}: MyBundleCardProps) => {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 14. 보따리 삭제 API 호출
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  const imageSrc = DESIGN_TYPE_MAP[design_type];

  const memoizedImage = useMemo(
    () => (
      <Image
        src={imageSrc}
        alt="Bundle"
        width={89}
        height={94}
        className="mt-[8px] mb-[14px]"
      />
    ),
    [imageSrc],
  );

  return (
    <div
      className={`bg-white border-[1px] box-border border-gray-200 px-2 pb-[22px] pt-[8px] rounded-[12px] cursor-pointer flex flex-col justify-center items-center relative ${
        !isEdit && "hover:bg-gray-100"
      }`}
    >
      <div className="w-full flex flex-start">
        <MyBundleStatusChip status={status} isRead={is_read} />
      </div>
      {isEdit && (
        <DrawerTrigger asChild>
          <button
            onClick={handleDelete}
            className="absolute right-[6px] top-[6px]"
          >
            <Icon src={DeleteIcon} alt="delete-btn" />
          </button>
        </DrawerTrigger>
      )}
      {memoizedImage}
      <div>
        <p className="text-[15px] font-medium text-center">{name}</p>
        <p className="text-gray-400 text-xs font-medium text-center">
          {new Date(updatedAt).toISOString().split("T")[0]}
        </p>
      </div>
    </div>
  );
};

export default React.memo(MyBundleCard);
