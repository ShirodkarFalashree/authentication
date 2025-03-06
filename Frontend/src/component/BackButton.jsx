import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BackButton = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => navigate("/")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute top-6 left-6 z-50 flex items-center rounded-lg transition-all duration-300 overflow-hidden"
      style={{
        backgroundColor: isHovered ? "white" : "transparent",
        color: isHovered ? "black" : "white",
        width: isHovered ? "160px" : "50px",
        padding: "10px",
        border: "1px solid white",
      }}
    >
      <IoMdArrowBack size={24} className="transition-all duration-300" />
      <span
        className="ml-2 transition-all duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          width: isHovered ? "auto" : "0px",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        Back to Home
      </span>
    </button>
  );
};

export default BackButton;
