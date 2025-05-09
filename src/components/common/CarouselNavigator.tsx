import { CarouselNavigatorProps } from "@/types/components/types";

const CarouselNavigator = <T,>({
  items,
  currentIndex,
  activeColorClass = "bg-pink-500",
}: CarouselNavigatorProps<T>) => {
  return (
    <div className="flex h-4 flex-row items-center gap-2">
      {items.map((_, index) => {
        return (
          <p
            className={`h-[6px] w-[6px] rounded-full ${
              currentIndex === index + 1 ? activeColorClass : "bg-gray-300"
            }`}
            key={index}
          ></p>
        );
      })}
    </div>
  );
};

export default CarouselNavigator;
