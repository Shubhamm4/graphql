import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
const Modals = ({
  onCloseModal = () => {},
  contryName,
  currency,
  language,
  capital
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000090]">
      <div className="bg-white md:w-[30%] w-[90%]  p-8  rounded-xl bg-gradient-to-r from-[#fb923c] to-rgb(251 146 60 / 0) ">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold  text-gray-500">Country Details</h1>
          <AiFillCloseCircle
            onClick={onCloseModal}
            className="w-[25px] h-[25px] text-gray-500 cursor-pointer"
          />
        </div>
        <div className="w-full h-[2px] bg-black my-2"/>
        <div className="flex py-2 justify-between">
          <h1 className=" text-[20px] font-semibold  ">Country</h1>
          <h1 className=" text-[18px] font-normal">{contryName}</h1>
        </div>

        <div className="flex items-center py-2 justify-between">
          <h1 className=" text-[20px] font-semibold  ">Capital</h1>
          <h1 className=" text-[18px] font-normal">{capital}</h1>
        </div>

        <div className="flex items-center py-2 justify-between">
          <h1 className=" text-[20px] font-semibold  ">Currency</h1>
          <h1 className=" text-[18px] font-normal">{currency}</h1>
        </div>

        <div className="flex items-center py-2 justify-between ">
          <h1 className=" text-[20px] font-semibold  ">Language</h1>
          <div className="">
            {language?.map((item, index) => (
              <h1 className=" text-[18px] font-normal ">{index + 1}. {item?.name}</h1>
            ))}
          </div>
        </div>

        <div className="">
          <h1 className=" text-[20px] font-semibold  py-2">Description</h1>
          <h1 className=" text-[18px] font-normal">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Modals;
