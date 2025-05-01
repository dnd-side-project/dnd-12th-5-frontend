import CopyLinkIcon from "/public/icons/copy_link.svg";

import { Icon } from "../common/Icon";

const CopyLinkButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <span
      onClick={onClick}
      className="flex cursor-pointer items-center gap-[5px] rounded-[4px] bg-gray-100 px-[10px] py-[6px] hover:opacity-70"
    >
      <p className="text-xs font-medium">링크 복사하기</p>
      <Icon src={CopyLinkIcon} alt="copy" size="medium" />
    </span>
  );
};

export default CopyLinkButton;
