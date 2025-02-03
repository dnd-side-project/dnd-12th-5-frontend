import Image from "next/image";

const GiftList = () => {
  const images = ["/img/gift_blank_square.svg", "/img/gift_blank_round.svg"];

  return (
    <div className="grid grid-cols-2 h-[396px] grid-rows-[repeat(6,_1fr)]">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="w-[130px] h-[130px] p-[10px] flex justify-center items-center"
        >
          <Image
            src={images[index % 2]}
            alt={`gift-item-${index}`}
            className="w-full h-full object-contain cursor-pointer hover:opacity-[75%]"
            width="110"
            height="110"
          />
        </div>
      ))}
    </div>
  );
};

export default GiftList;
