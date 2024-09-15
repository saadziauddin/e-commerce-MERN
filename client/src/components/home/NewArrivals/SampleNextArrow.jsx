import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="w-10 h-10 rounded-full text-white bg-[#7b246d] bg-opacity-50 hover:bg-opacity-80 duration-300 cursor-pointer flex justify-center items-center z-10 absolute top-[35%] right-2"
      onClick={onClick}
    >
      <span className="text-lg">
        <FaLongArrowAltRight />
      </span>
    </div>
  );
};

export default SampleNextArrow;
