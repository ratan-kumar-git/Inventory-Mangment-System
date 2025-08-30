import React from "react";
import { Loader } from "lucide-react";

const ContentLoader = ({ message }) => {
  return (
    <div className="w-full h-full flex justify-center items-center gap-2 bg-gray-50">
      <Loader className="size-10 animate-spin" />
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default ContentLoader;
