export const formatDateLabel = (isoDateString: string): string => {
  const KST_OFFSET = 9 * 60 * 60 * 1000;

  const inputDate = new Date(new Date(isoDateString).getTime() + KST_OFFSET);
  const today = new Date();

  // 오늘 기준으로 시간 차이 계산
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const inputMidnight = new Date(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate(),
  );

  const diffInMs = todayMidnight.getTime() - inputMidnight.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "오늘";
  if (diffInDays === 1) return "어제";
  if (diffInDays >= 2 && diffInDays <= 7) return `${diffInDays}일 전`;

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const date = String(inputDate.getDate()).padStart(2, "0");
  return `${year}.${month}.${date}`;
};
