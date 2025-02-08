import Image from "next/image";

import IndicatorIcon from "/public/icons/indicator.svg";

const MyGiftBagStatusChip = ({
  status,
  isRead,
}: {
  status: string;
  isRead: boolean;
}) => {
  let bgColor = "bg-[#f3f4f8]";

  if (status === "답변 완료") {
    bgColor = "bg-[#f1faff]";
  } else if (status === "답변 대기 중") {
    bgColor = "bg-[#fffae6]";
  } else if (status === "임시 저장") {
    bgColor = "bg-[#f3f4f8]";
  }

  return (
    <div className={`rounded-[6px] ${bgColor} py-[3px] px-[8px] flex gap-1`}>
      <p className="text-[10px] font-medium">{status}</p>
      {!isRead && <Image src={IndicatorIcon} alt="IndicatorIcon" />}
    </div>
  );
};

export default MyGiftBagStatusChip;
