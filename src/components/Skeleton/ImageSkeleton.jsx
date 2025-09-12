import React from "react";

const ImageSkeleton = () => {
  return (
    <div className="w-fit h-fit bg-white/10 backdrop-blur-lg flex items-center justify-center">
      <p className="text-white text-small">Loading...</p>
    </div>
  );
};

export default ImageSkeleton;
