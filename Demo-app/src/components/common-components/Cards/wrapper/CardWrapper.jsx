import React from "react";

const CardWrapper = ({ children, className = "", borderClass = "border border-[#E9E9E9]" ,id}) => {
  return (
    <div id={id} className={`rounded-[8px] ${borderClass} gap-[12px] p-4 ${className}`}>
      {children}
    </div>
  );
};

export default CardWrapper;
``