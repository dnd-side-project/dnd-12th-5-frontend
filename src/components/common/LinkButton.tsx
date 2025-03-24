import React from "react";
import { Button } from "../ui/button";
import CopyLinkIcon from "../../../public/icons/copy_link.svg";
import { Icon } from "./Icon";

const LinkButton = ({ linkUrl }: { linkUrl: string }) => {
  const handleLinkButtonClick = () => {
    if (linkUrl) {
      window.open(linkUrl, "_blank");
    }
  };

  return (
    <Button
      onClick={handleLinkButtonClick}
      disabled={!linkUrl}
      className="w-[141px] h-[30px] text-xs hover:opacity-70"
      variant="secondary"
    >
      첨부한 링크 바로가기
      <Icon src={CopyLinkIcon} size="xsmall" alt="copyLink-btn" />
    </Button>
  );
};

export default React.memo(LinkButton);
