import React from "react";
import { useNavigate } from "react-router-dom";
import { RecipieLargeCardProps } from "../types/types";

const LargeCards: React.FC<RecipieLargeCardProps> = ({
  image,
  titile,
  instriuctions,
  recpieId,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/recite/${recpieId}`);
  };
  return (
    <>
      <div
        className="bg-primary lg:max-w-[1187px] lg:flex justify-center lg:h-[322px] shadow my-3 md:mx-auto border-2 rounded-3xl overflow-hidden"
        onClick={handleClick}
      >
        <div className="lg:h-auto lg:w-[403px] h-[322px] sm:w-full md:w-[full] md:h-[250px] sm:h-[370px] flex-none overflow-hidden">
          <img
            src={image}
            alt="Woman holding a mug"
            className="w-full h-full"
          />
        </div>
        <div className="lg:px-6 sm:w-full  border-gray-400 lg:border-l-0   bg-gray-100 rounded lg:py-4 flex flex-col leading-normal">
          <h4
            className="text-gray-900 font-bold text-xl pt-10 text-start my-2"
            // style={{ margin: "10px" }}
          >
            {titile}
          </h4>
          <p
            className="text-gray-700  text-base text-start my-2"
            // style={{ margin: "10px" }}
          >
            {" "}
            {instriuctions} ....
          </p>
          <button
            className="md:mt-3  mb-4 bg-yellow rounded-3xl px-4 py-2 hover:bg-darkYellow focus:outline-none focus:ring focus:border-yellow-300 ms-0 max-w-[150px] my-2"
            onClick={handleClick}
            // style={{ margin: "10px" }}
          >
            Read More
          </button>
        </div>
      </div>
    </>
  );
};

export default LargeCards;
