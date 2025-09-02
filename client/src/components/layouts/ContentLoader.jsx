import React from "react";
import { Loader } from "lucide-react";

const ContentLoader = ({ message }) => {
  return (
    <div className="flex-1 mt-52 w-full h-full relative">
      <div className="flex justify-center items-center gap-2">
        <Loader className="size-7 animate-spin" />
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
};

export default ContentLoader;
