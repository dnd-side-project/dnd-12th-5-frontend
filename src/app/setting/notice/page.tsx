"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Page = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="px-4">
      <div
        className="flex cursor-pointer items-center justify-between border-b border-[#f4f4f4] py-5 text-[15px] hover:opacity-70"
        onClick={() => setOpen(true)}
      >
        <p>Picktory가 출시되었어요!</p>
        <p className="text-gray-300">2025/02/22</p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[80%] rounded-xl p-7">
          <DialogHeader className="text-left">
            <DialogTitle className="text-lg font-semibold">
              Picktory가 출시되었어요!
            </DialogTitle>
            <p className="mt-2 text-sm text-gray-300">2025/02/22</p>
          </DialogHeader>
          <DialogDescription className="flex flex-col text-left text-gray-500">
            <p className="break-keep">
              안녕하세요! Picktory가 출시되었어요. 🎉
              <br />
              여러분이 더 쉽게 선물을 줄 수 있도록, 최적화된 플랫폼을 제공해요.
              <br />
              <br />
              앞으로도 많은 관심과 사랑 부탁드려요!
            </p>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
