"use client";

import { useState } from "react";
import { CopyIcon } from "@/components/icons/copy";

type CopyContentProps = {
  content: string;
};

export const CopyContent = ({ content }: CopyContentProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  console.log("copied: ", copied);

  return (
    <div>
      {content}
      <CopyIcon onClick={handleCopy} />
    </div>
  );
};
