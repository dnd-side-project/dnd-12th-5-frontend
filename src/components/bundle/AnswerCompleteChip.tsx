"use client";

import { motion } from "framer-motion";

import { Icon } from "../common/Icon";

import CompleteIcon from "/public/icons/complete_blue.svg";

const AnswerCompleteChip = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="jusfity-center flex h-[34px] items-center gap-2 rounded-full bg-[rgba(40,42,58,0.8)] py-2 pl-2 pr-3 text-sm"
    >
      <Icon src={CompleteIcon} />
      <p className="text-white">답변 완료</p>
    </motion.div>
  );
};

export default AnswerCompleteChip;
