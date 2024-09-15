import React from "react";

const Badge = ({ text }) => {
  return (
    <div className="bg-[#7b246d] w-[50px] h-[35px] text-white flex justify-center items-center text-base font-bodyFont hover:bg-black duration-300 cursor-pointer rounded-lg">
      {text}
    </div>
  );
};

export default Badge;
