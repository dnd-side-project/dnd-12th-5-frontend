import GiftForm from "@/components/gift-upload/GiftForm";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <GiftForm />
    </Suspense>
  );
};

export default page;
