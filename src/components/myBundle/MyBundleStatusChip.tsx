import IndicatorIcon from "/public/icons/indicator.svg";

import { Icon } from "../common/Icon";

const MyBundleStatusChip = ({
  status,
  isRead = true,
}: {
  status: string;
  isRead: boolean;
}) => {
  let bgColor = "bg-[#f3f4f8]";
  let text = "임시 저장";

  if (status === "COMPLETED") {
    bgColor = "bg-[#f1faff]";
    text = "답변 완료";
  } else if (status === "PUBLISHED") {
    bgColor = "bg-[#fffae6]";
    text = "답변 대기 중";
  } else if (status === "DRAFT") {
    bgColor = "bg-[#f3f4f8]";
    text = "임시 저장";
  }

  return (
    <span
      className={`rounded-[6px] ${bgColor} inline-flex gap-1 px-[8px] py-[3px]`}
    >
      <p className="text-[10px] font-medium">{text}</p>
      {!isRead && status === "COMPLETED" && (
        <Icon src={IndicatorIcon} alt="IndicatorIcon" />
      )}
    </span>
  );
};

export default MyBundleStatusChip;
