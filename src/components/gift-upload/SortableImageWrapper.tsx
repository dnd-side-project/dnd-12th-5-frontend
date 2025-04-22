"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { SortableImageWrapperProps } from "@/types/components/types";

const SortableImageWrapper = ({ id, children }: SortableImageWrapperProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "inline-block",
  };

  const dragHandleProps = { ...attributes, ...listeners };

  return (
    <div ref={setNodeRef} style={style}>
      {typeof children === "function"
        ? children({ dragHandleProps })
        : children}
    </div>
  );
};

export default SortableImageWrapper;
