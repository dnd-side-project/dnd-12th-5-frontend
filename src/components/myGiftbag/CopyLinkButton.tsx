import Image from "next/image";

import CopyLinkIcon from "/public/icons/copy_link.svg";

const CopyLinkButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <span
      onClick={onClick}
      className="flex items-center gap-[5px] cursor-pointer bg-gray-100 rounded-[4px] py-[6px] px-[10px] hover:opacity-70"
    >
      <p className="text-[12px] font-medium">링크 복사하기</p>
      <Image src={CopyLinkIcon} alt="copy" width={18} height={18} />
    </span>
  );
};

export default CopyLinkButton;
