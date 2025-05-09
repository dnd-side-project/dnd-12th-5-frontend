import { Icon } from "./Icon";

import ImageIcon from "/public/icons/image_carousel.svg";

const ImageCarouselButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow"
    >
      <Icon src={ImageIcon} />
    </button>
  );
};

export default ImageCarouselButton;
