import React from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import Navbar from "../component/Navbar";

const ContactCard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black px-4">
    <Navbar />
      <div className="bg-[#1a2235] text-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        {/* Title */}
        <h2 className="text-2xl font-semibold">
          PLEASE <span className="text-blue-400">FEEL FREE</span> TO CONTACT US
        </h2>

        {/* Contact Methods */}
        <div className="mt-6 space-y-4">
          {/* Gmail */}
          <a
            href="mailto:support@secureotp.com?subject=Support%20Request&body=Hello,%20I%20need%20assistance%20with..."
            className="flex items-center justify-center gap-3 bg-gray-800 px-4 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            <FaEnvelope className="text-white text-lg" />
            <span>Contact via Gmail</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/9867757150?text=Hello,%20I%20need%20assistance%20with..."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-gray-800 px-4 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            <FaWhatsapp className="text-green-400 text-lg" />
            <span>Contact via WhatsApp</span>
          </a>
        </div>

        {/* Footer Message */}
        <p className="text-gray-400 italic mt-6">
          If you have any queries, feel free to ask!
        </p>
      </div>
    </div>
  );
};

export default ContactCard;
