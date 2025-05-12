import Image from "next/image";

import CharacterImage from "/public/img/bundle_error_character.svg";

const BundleErrorPage = () => {
  return (
    <div className="flex flex-col gap-[15px]">
      <Image
        src={CharacterImage}
        width={143}
        height={143}
        alt="character"
        className="mix-blend-luminosity"
      />
      <p className="text-center text-[15px] font-medium text-gray-500">
        앗! 보따리를 불러오는 중에 <br /> 오류가 발생했어요!
      </p>
    </div>
  );
};

export default BundleErrorPage;
