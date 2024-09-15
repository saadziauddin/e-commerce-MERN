import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="w-10 h-10 rounded-full text-white bg-[#7b246d] bg-opacity-50 hover:bg-opacity-80 duration-300 cursor-pointer flex justify-center items-center absolute z-10 top-[35%] left-2"
      onClick={onClick}
    >
      <span>
        <FaLongArrowAltLeft />
      </span>
    </div>
  );
};

export default SamplePrevArrow;
