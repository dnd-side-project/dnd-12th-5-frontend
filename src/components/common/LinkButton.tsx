import React from "react";

import GoToLinkIcon from "../../../public/icons/link_1.svg";
import { Button } from "../ui/button";

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
      className="h-[30px] w-[141px] text-xs hover:opacity-70"
      variant="secondary"
    >
      첨부한 링크 바로가기
      <Icon src={GoToLinkIcon} size="xsmall" alt="GoToLinkIcon" />
    </Button>
  );
};

export default React.memo(LinkButton);
