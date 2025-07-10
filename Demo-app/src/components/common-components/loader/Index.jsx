import React from "react";
import Label from "../label/Label";

const Loader = () => {
  return (
    <div className="fixed flex-wrap top-0 row-gap-10 left-0 w-full h-full flex flex-col items-center justify-center z-[1000]  bg-[#3535357e] bg-opacity-60 bg-no-repeat">
      <div className="loader"></div>
      <Label color={"white"}>Loading...</Label>
    </div>
  );
};

export default Loader;
