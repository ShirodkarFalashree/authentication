import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa"; // Import arrow icon
import Threads from "../component/ui/Threads";

const HomePage = () => {
  const navigate = useNavigate(); // React Router navigation

  return (
    <div className="bg-black overflow-hidden relative w-screen h-screen flex flex-col items-center justify-center">
      {/* Threads in Background */}
      <div className="absolute inset-0 z-0">
        <Threads amplitude={1} distance={1} enableMouseInteraction={true} />
      </div>

      {/* Centered Text in Foreground */}
      <p className="text-white text-[72px] leading-[74px] font-bold mt-[-200px] font-[Figtree] text-center z-10">
        Ride the <br />
        wave of evolving security.
      </p>

      {/* Styled Button with Arrow */}
      <button
        onClick={() => navigate("/authoptions")} // Redirect to /options
        className="mt-10 px-10 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-black hover:text-white hover:cursor-pointer border border-white transition-all duration-300 flex items-center gap-3 z-10"
      >
        Get Started <FaArrowRight />
      </button>
    </div>
  );
};

export default HomePage;
