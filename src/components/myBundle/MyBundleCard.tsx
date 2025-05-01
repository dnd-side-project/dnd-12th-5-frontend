import Image from "next/image";
import React, { useMemo } from "react";

import DeleteIcon from "/public/icons/btn_erase.svg";

import { Icon } from "../common/Icon";
import { DrawerTrigger } from "../ui/drawer";
import { DESIGN_TYPE_MAP } from "@/constants/constants";
import { MyBundleCardProps } from "@/types/components/types";

import MyBundleStatusChip from "./MyBundleStatusChip";

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
        className="mb-[14px] mt-2"
      />
    ),
    [imageSrc],
  );

  return (
    <div
      className={`relative box-border flex min-w-[165px] max-w-[192px] cursor-pointer flex-col items-center justify-center rounded-[12px] border-[1px] border-gray-200 bg-white px-2 pb-[22px] pt-[8px] ${
        !isEdit && "hover:bg-gray-100"
      }`}
    >
      <div className="flex-start flex w-full">
        <MyBundleStatusChip
          status={status}
          isRead={is_read}
          type="label"
          size="sm"
        />
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
      <div className="w-full">
        <p
          className="mx-auto truncate text-center text-[15px] font-medium"
          style={{ maxWidth: "calc(100% - 20px)" }}
        >
          {name}
        </p>
        <p className="text-center text-xs font-medium text-gray-400">
          {new Date(updatedAt).toISOString().split("T")[0]}
        </p>
      </div>
    </div>
  );
};

export default React.memo(MyBundleCard);
