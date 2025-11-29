import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const FaqItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`p-4 lg:p-6 rounded-2xl border mb-5 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md ${
        isOpen
          ? "bg-white/10 border-primaryColor"
          : "bg-white/5 border-gray-700"
      }`}
      onClick={toggleAccordion}
    >
      <div className="flex items-center justify-between gap-5">
        <h4 className="text-[18px] lg:text-[22px] text-black font-semibold tracking-wide">
          {item.question}
        </h4>

        <div
          className={`w-8 h-8 lg:w-9 lg:h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-primaryColor text-white shadow-md"
              : "bg-transparent border border-gray-600 text-gray-200"
          }`}
        >
          {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "mt-4 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-[15px] lg:text-[17px] text-gray-900 leading-7">
          {item.content}
        </p>
      </div>
    </div>
  );
};

export default FaqItem;
