import React from "react";

const Loader = () => {
  return (
    <div className="flex-col gap-2 w-full flex items-center justify-center">
      <div className="size-12 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
        <div className="size-9 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
