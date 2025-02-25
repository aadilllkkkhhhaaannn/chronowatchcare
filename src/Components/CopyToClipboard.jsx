// src/Components/CopyToClipboard.jsx

import { useState } from "react";

const CopyToClipboard = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <button
      className={`btn btn-sm ${copied ? "btn-success" : "btn-primary"} mx-2`}
      onClick={handleCopy}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

export default CopyToClipboard;
