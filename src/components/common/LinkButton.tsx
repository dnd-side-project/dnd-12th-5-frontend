import React from "react";
import { Button } from "../ui/button";
import CopyLinkIcon from "../../../public/icons/copy_link.svg";
import Image from "next/image";

interface LinkButtonProps {
  linkUrl: string;
}

const LinkButton = ({ linkUrl }: LinkButtonProps) => {
  const handleLinkButtonClick = () => {
    if (linkUrl) {
      window.open(linkUrl, "_blank");
    }
  };

  return (
    <Button
      onClick={handleLinkButtonClick}
      disabled={!linkUrl}
      className="w-[141px] h-[30px] text-xs"
      variant="secondary"
    >
      첨부한 링크 바로가기
      <Image src={CopyLinkIcon} width={12} height={12} alt="copyLink-btn" />
    </Button>
  );
};

export default LinkButton;
