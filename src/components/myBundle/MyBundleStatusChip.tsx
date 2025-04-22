import IndicatorIcon from "/public/icons/indicator.svg";

import { Icon } from "../common/Icon";

const MyBundleStatusChip = ({
  status,
  type,
  isRead = true,
  size,
}: {
  status: string;
  type: "message" | "label";
  isRead?: boolean;
  size: string;
}) => {
  let bgColor = "bg-[#f3f4f8]";
  let text = "임시 저장";

  if (status === "COMPLETED") {
    bgColor = "bg-[#f1faff]";

    if (type === "label") text = "답변 완료";
    if (type === "message") text = "상대방의 답변이 완료되었어요";
  } else if (status === "PUBLISHED") {
    bgColor = "bg-[#fffae6]";

    if (type === "label") text = "답변 대기 중";
    if (type === "message") text = "아직 상대방의 답변이 오지 않았어요";
  } else if (status === "DRAFT") {
    bgColor = "bg-[#f3f4f8]";

    if (type === "label") text = "임시 저장";
    if (type === "message") text = "임시 저장 중";
  }

  const paddingClass =
    size === "sm" ? "px-[8px] py-[3px]" : "px-[10px] py-[6px]";

  const textSizeClass = size === "sm" ? "text-[10px]" : "text-[12px]";

  return (
    <span
      className={`rounded-[6px] ${bgColor} inline-flex gap-1 ${paddingClass}`}
    >
      <p className={`${textSizeClass} font-medium`}>{text}</p>
      {!isRead && status === "COMPLETED" && (
        <Icon src={IndicatorIcon} alt="IndicatorIcon" />
      )}
    </span>
  );
};

export default MyBundleStatusChip;
